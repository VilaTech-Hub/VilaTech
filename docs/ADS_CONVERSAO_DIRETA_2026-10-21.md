# Conversão direta Google Ads — 21/10/2026

Conta: 192-557-7139. Propriedade GA4 VilaTech2026, 521531340, vinculada no Ads durante esta sessão. Importação de públicos desativada.

Criada no Ads a ação primária `VTH | Cotação confirmada`, categoria Solicitar cotação, contagem Uma, valor fixo USD 0, janela de clique padrão 90 dias, atribuição baseada em dados. Conversões otimizadas não habilitadas.

Identificação pública fornecida pelo snippet da própria conta: `AW-18486231681/uRSyCNn5gKUdEIGF9u5E`. Não é uma credencial.

O site configura esse destino na tag já existente e envia `conversion` somente após a resposta explícita de persistência aceita por `isQuoteConfirmation`. O evento GA4 `generate_lead` continua a receber `form_id=coworking_quote` e `service_type`. A fila de cada destino é deduplicada separadamente em memória e sessionStorage. Nenhum nome, telefone, e-mail, mensagem ou ID do CRM é enviado nos parâmetros desses eventos.

QA (`is_test=true`) produz apenas `lead_submission_test`, sem evento de conversão Ads. A personalização de anúncios está desativada na configuração desse destino. Não importar simultaneamente o mesmo lead do GA4 como outra ação primária, para evitar duplicação.

A interface administrativa do GA4 não carregou seus controles neste navegador, inclusive após uma atualização. A lista de importação no Ads mostrou apenas purchase, close_convert_lead e qualify_lead inativos, sem cotação. Isso não comprova ausência global de eventos. Por isso a implementação usa a tag direta Ads e não depende de derivar um novo evento no GA4.

Validação local: seis testes de analytics (dados pessoais, contrato, QA, deduplicação e destino bloqueado), lint do arquivo e build do app. Testar a versão publicada e a tag no Ads antes do lançamento. Não fabricar leads ou GCLIDs, nem declarar recebimento pelo Google sem evidência. Criar a ação não significa que já esteja verificada ou registrando conversões atribuídas.

Campanhas e orçamento: ainda não criados por este commit. Preparação comercial mantém a explicação institucional acessória conforme app/AGENTS.md. Locações não são automaticamente elegíveis ao Grants apenas pela destinação de receita.

