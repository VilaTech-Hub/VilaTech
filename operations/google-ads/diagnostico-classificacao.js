/**
 * VTH: diagnóstico avulso de perda por classificação — v1, 07/11/2026.
 * Google Ads Scripts nativo, conta 192-557-7139. Executar uma vez em Prévia.
 * SOMENTE LEITURA. Não substitui coletores, não agenda, não grava Sheets.
 * Saída: registros JSON, com collected_at, fuso, moeda, janela e status por bloco.
 * PREPARADO LOCALMENTE; execução/homologação no Google ainda não realizada.
 * Ausência de linha não significa zero; QS 0 não é índice de qualidade válido.
 */
function main() {
  const account = AdsApp.currentAccount();
  if (account.getCustomerId().replace(/\D/g, '') !== '1925577139' ||
      account.getTimeZone() !== 'America/Noronha') {
    throw new Error('Conta/fuso divergente; nenhuma consulta executada.');
  }
  const collectedAt = new Date().toISOString();
  const today = Utilities.formatDate(new Date(collectedAt), account.getTimeZone(), 'yyyy-MM-dd');
  const day = offset => {
    const d = new Date(today + 'T12:00:00Z');
    d.setUTCDate(d.getUTCDate() + offset);
    return d.toISOString().slice(0, 10);
  };
  const scope = "campaign.id IN (24384428522,24380070684) AND campaign.advertising_channel_type = 'SEARCH' AND campaign.name LIKE 'GRANT_SEARCH_%'";
  const dates = "segments.date BETWEEN '" + day(-7) + "' AND '" + day(-1) + "'";
  const inventory = scope + " AND ad_group_criterion.type = 'KEYWORD' AND ad_group_criterion.negative = FALSE AND ad_group_criterion.status != 'REMOVED'";
  const key = [['campaign.id', 'campaign_id'], ['ad_group.id', 'ad_group_id'], ['ad_group_criterion.criterion_id', 'criterion_id']];
  const blocks = [];
  const portfolioResources = [];
  Logger.log(JSON.stringify({ type: 'run', source: 'Google Ads Scripts', collected_at: collectedAt,
    account_id: account.getCustomerId(), timezone: account.getTimeZone(), currency: account.getCurrencyCode(),
    metrics_window: { start: day(-7), end: day(-1) }, configuration_window: 'snapshot at collected_at',
    mode: 'READ_ONLY', mutations: 0, installation_status: 'MANUAL_PREVIEW_ONLY' }));

  function query(name, resource, fields, where, isMetrics) {
    let count = 0;
    try {
      const rows = AdsApp.report('SELECT ' + fields.map(f => f[0]).join(', ') + ' FROM ' + resource + ' WHERE ' + where).rows();
      while (rows.hasNext()) {
        const row = rows.next();
        const output = {};
        fields.forEach(([field, alias]) => {
          const raw = row[field];
          output[alias] = raw === null || raw === undefined || raw === '' ? null : raw;
        });
        if (name === 'campaign_state' && output.portfolio_resource &&
            /^customers\/\d+\/biddingStrategies\/\d+$/.test(output.portfolio_resource) &&
            portfolioResources.indexOf(output.portfolio_resource) === -1) {
          portfolioResources.push(output.portfolio_resource);
        }
        if (Object.prototype.hasOwnProperty.call(output, 'quality_score_raw')) {
          const n = output.quality_score_raw === null ? NaN : Number(output.quality_score_raw);
          output.quality_score_valid = Number.isInteger(n) && n >= 1 && n <= 10 ? n : null;
        }
        Logger.log(JSON.stringify({ type: 'row', block: name, data: output }));
        count++;
      }
      blocks.push({ block: name, status: 'OK', rows: count, coverage: isMetrics ? 'last7_complete' : 'inventory_snapshot',
        empty_interpretation: count === 0 ? 'NO_ROW_NOT_ZERO' : null });
    } catch (error) {
      // Partial rows stay explicitly partial; never substitute zero or silently omit a failed field.
      blocks.push({ block: name, status: count ? 'PARTIAL' : 'FAILED', rows: count, error: String(error) });
    }
  }

  query('campaign_state', 'campaign', [
    ['campaign.id', 'campaign_id'], ['campaign.name', 'name'], ['campaign.status', 'status'],
    ['campaign.primary_status', 'primary_status'], ['campaign.primary_status_reasons', 'reasons'],
    ['campaign.bidding_strategy_type', 'bidding_type'], ['campaign.bidding_strategy', 'portfolio_resource']
  ], scope);
  if (portfolioResources.length) {
    query('portfolio_limits', 'bidding_strategy', [
      ['bidding_strategy.resource_name', 'portfolio_resource'], ['bidding_strategy.type', 'bidding_type'],
      ['bidding_strategy.maximize_conversions.target_cpa_micros', 'max_conversions_cpa_raw_micros'],
      ['bidding_strategy.target_cpa.target_cpa_micros', 'target_cpa_raw_micros'],
      ['bidding_strategy.target_cpa.cpc_bid_ceiling_micros', 'target_cpa_cpc_ceiling_raw_micros'],
      ['bidding_strategy.maximize_conversions.cpc_bid_ceiling_micros', 'max_conversions_cpc_ceiling_raw_micros']
    ], 'bidding_strategy.resource_name IN (' + portfolioResources.map(r => "'" + r + "'").join(',') + ')');
  } else {
    blocks.push({ block: 'portfolio_limits', status: blocks[0].status === 'OK' ? 'NOT_APPLICABLE_NO_PORTFOLIO_RETURNED' : 'SKIPPED_DEPENDENCY_FAILED', rows: null });
  }
  // Optional target fields isolated: unsupported API fields must not hide the base inventory.
  query('campaign_target_cpa', 'campaign', [
    ['campaign.id', 'campaign_id'], ['campaign.maximize_conversions.target_cpa_micros', 'max_conversions_cpa_raw_micros'],
    ['campaign.target_cpa.target_cpa_micros', 'target_cpa_raw_micros']
  ], scope);
  query('ad_group_targets', 'ad_group', [
    ['campaign.id', 'campaign_id'], ['ad_group.id', 'ad_group_id'], ['ad_group.name', 'name'],
    ['ad_group.status', 'status'], ['ad_group.target_cpa_micros', 'target_cpa_raw_micros'],
    ['ad_group.effective_target_cpa_micros', 'effective_cpa_raw_micros']
  ], scope + " AND ad_group.status != 'REMOVED'");
  query('keyword_inventory', 'ad_group_criterion', key.concat([
    ['ad_group_criterion.keyword.text', 'keyword_text'], ['ad_group_criterion.keyword.match_type', 'match_type'],
    ['ad_group_criterion.status', 'status'], ['ad_group_criterion.primary_status', 'primary_status'],
    ['ad_group_criterion.primary_status_reasons', 'reasons']
  ]), inventory);
  query('keyword_quality', 'ad_group_criterion', key.concat([
    ['ad_group_criterion.quality_info.quality_score', 'quality_score_raw'],
    ['ad_group_criterion.quality_info.search_predicted_ctr', 'expected_ctr'],
    ['ad_group_criterion.quality_info.creative_quality_score', 'ad_relevance'],
    ['ad_group_criterion.quality_info.post_click_quality_score', 'landing_experience']
  ]), inventory);
  query('keyword_metrics', 'keyword_view', key.concat([
    ['ad_group_criterion.keyword.text', 'keyword_text'], ['ad_group_criterion.keyword.match_type', 'match_type'],
    ['metrics.impressions', 'impressions'], ['metrics.clicks', 'clicks'],
    ['metrics.cost_micros', 'cost_raw_micros'], ['metrics.conversions', 'aggregate_conversions_not_commercially_reconciled']
  ]), scope + ' AND ' + dates, true);
  query('campaign_rank', 'campaign', [
    ['campaign.id', 'campaign_id'], ['metrics.search_rank_lost_impression_share', 'rank_lost_raw'],
    ['metrics.search_budget_lost_impression_share', 'budget_lost_raw'], ['metrics.search_impression_share', 'impression_share_raw']
  ], scope + ' AND ' + dates, true);

  Logger.log(JSON.stringify({ type: 'result', collected_at: collectedAt,
    status: blocks.every(b => b.status === 'OK' || b.status === 'NOT_APPLICABLE_NO_PORTFOLIO_RETURNED') ? 'OK' : 'PARTIAL', blocks,
    interpretation: [
      'Join quality/inventory/metrics by campaign_id, ad_group_id and criterion_id; confirm text and match_type before attribution.',
      'QS 0, UNKNOWN, UNSPECIFIED or absent component is unavailable, not poor quality.',
      'CPA raw 0/null is not a verified active cap of zero; check strategy and field presence in Google.',
      'Micros / 1000000 gives account currency; Grants credit is not cash expenditure.',
      '0.9001 rank lost means >90%; 0.0999 impression share means <10%.',
      'Quality components are diagnostics, not proof of the cause of a specific auction.',
      'No campaign changes, no bid changes, no schedule, no conversion or personal data upload.'
    ] }));
}
