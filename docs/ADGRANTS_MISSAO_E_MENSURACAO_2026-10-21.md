# Vila Tech: receita dos espaços, missão e Google Ad Grants
Verificação: 21/10/2026. Repositório-base: VilaTech-Hub/VilaTech, commit 37d34a8d7d575e35c183746ee8c1d6d8b8521479.
Ramo de trabalho local: codex/adgrants-mission-tracking-20261021.

## Decisão e limites
A captura apresentada pelo Instituto mostra Google Ad Grants com status aprovada e cliente 192-557-7139. A identidade/adesão inicial deixa de ser pendência. A captura não substitui a conferência do estado atual das campanhas, metas e entrega.

O usuário confirmou que as receitas do coworking, salas e auditório custeiam estrutura, pessoal e atividades educacionais do Instituto. Esse é o fundamento factual adotado para a proposta de comunicação. Os fluxos financeiros não foram auditados nesta etapa.

A recomendação é uma apresentação discreta no layout, explícita no conteúdo e apoiada por registros verificáveis. A política exige divulgar claramente a destinação dos recursos e manter a missão como foco principal do site; a política de campanhas também exige pertinência de cada anúncio e palavra-chave à missão e aos programas/serviços. Uma frase institucional não aprova automaticamente toda locação.

As políticas consultadas não definem percentual universal que transforme uma atividade em “limitada”. Não inventar limite de receita, proporção de páginas ou percentual de reinvestimento como garantia de conformidade.

## Apresentação recomendada
1. **Página de espaços:** benefício funcional claro, identificação do Instituto e um parágrafo de destinação da receita, visível no fluxo principal.
2. **Próximo da cotação:** uma frase curta reforça a destinação, mantendo o CTA de contratação.
3. **Página Instituto:** explicação mais completa de estrutura, equipe e educação; projetos vigentes apresentados com seu estágio real.
4. **Transparência:** publicar síntese financeira por período com receitas dos espaços, custos operacionais e recursos aplicados em educação, acompanhada do critério de rateio quando houver. É uma recomendação de sustentação da declaração; não é uma alegação de que Google exige um formato contábil específico.
5. **Anúncios:** comunicar o espaço realmente oferecido e acrescentar a contribuição à educação quando pertinente. Não chamar a contratação de doação, nem renomear uma locação comum como projeto social sem operação correspondente.

### Texto central preparado
**Seu trabalho movimenta mais do que negócios.**

Ao contratar uma estação, sala de reunião ou auditório, você contribui para a sustentabilidade do Instituto Cultural e Educacional Vila Tech. A receita desses espaços ajuda a manter sua estrutura, equipe e atividades educacionais.

**Conheça o Instituto e seus projetos.**

### Texto junto ao formulário
A receita dos espaços ajuda a manter a estrutura, a equipe e as atividades educacionais do Instituto Cultural e Educacional Vila Tech.

### Explicação institucional preparada
O coworking, as salas de reunião e o auditório do Vila Tech Hub são fontes de receita para o Instituto Cultural e Educacional Vila Tech. Esses recursos contribuem para custear a estrutura, a equipe e as atividades educacionais da associação, apoiando a continuidade de seus projetos. A contratação dos espaços é uma prestação de serviço remunerada.

Os textos não afirmam gratuidade, bolsas, benefício fiscal, 100% de reinvestimento, percentual por reserva ou financiamento de projeto específico ainda não comprovado.

## Avaliação por oferta
| Oferta | Defesa a demonstrar | Situação recomendada antes de veicular |
|---|---|---|
| Formação, oficinas e cursos efetivamente oferecidos | Atividade educacional vinculada diretamente à missão, turma e destino verdadeiros | Prioridade inicial após mensuração/oferta prontas |
| Auditório para cursos, oficinas e desenvolvimento profissional | Uso concreto em formação/encontro ligado às atividades do Instituto e destinação da receita | Candidato condicionado à página e comprovação |
| Reuniões e encontros profissionais | Relação real com os serviços/programas e sustentação da missão, sem inventar caráter educativo para toda reunião | Avaliação por campanha e intenção |
| Estações flexíveis, por hora, período, diária, pacote, mês, semestre ou ano | Modelo de sustentabilidade informado; pertinência real do serviço à missão | Permanece uma oferta comercial: texto e destinação financeira isolados não garantem elegibilidade |
| Locação genérica para qualquer evento ou público sem relação demonstrada | Destinação da receita, sozinha, é uma defesa insuficiente para garantir aceitação | Consultar o suporte sobre o caso concreto; se não aceito, manter essa divulgação em conta paga separada |

Esta classificação é uma interpretação operacional das políticas, não uma decisão emitida pelo Google. A duração do plano não altera, por si só, sua elegibilidade.

Antes de ampliar para locação comercial genérica, apresentar ao suporte do Ad Grants as páginas finais, as modalidades reais e a destinação efetiva dos recursos. Não esconder conteúdo de revisores, não apresentar versões diferentes por visitante e não trocar a oferta por uma causa fictícia.

## Rascunhos Search (não cadastrados)
### Estações
Títulos: Coworking em Itu | Trabalhe no Vila Tech Hub | Seu Trabalho Apoia a Educação
Descrições:
- Estações e planos flexíveis. A receita apoia a educação do Instituto Vila Tech.
- Escolha seu período de uso e solicite uma cotação. Conheça os projetos do Instituto.

### Salas
Títulos: Sala de Reunião em Itu | Reúna Sua Equipe no Vila Tech | Espaços Que Apoiam a Educação
Descrições:
- Reúna sua equipe em Itu. A receita dos espaços contribui para a educação do Instituto.
- Consulte capacidade, disponibilidade e condições. Solicite uma cotação no Vila Tech.

### Auditório
Títulos: Auditório para Eventos em Itu | Treinamentos no Vila Tech | Seu Evento Apoia a Educação
Descrições:
- Espaço para encontros e treinamentos em Itu. Consulte condições para o seu evento.
- A receita dos espaços ajuda a manter a estrutura e a educação do Instituto Vila Tech.

Os três rascunhos dependem da análise da oferta, dos destinos e da configuração de conversões. Não há volumes de busca, CPCs ou previsão de retorno inventados.

## Alterações locais preparadas
- Comunicação em CoworkingFeatures e junto à cotação; explicação em InstitutePage com destino /instituto#sustentabilidade.
- Descrição SEO renderizada da página de coworking alinhada à oferta e à missão.
- Períodos do formulário passam a contemplar horas, período, diária, pacote de horas, mensal, semestral e anual; sem preços novos.
- Backend retorna confirmação com lead_id opaco, form_id, service_type e is_test somente após persistência.
- ID por operação e criação atômica no Firestore evitam criar vários leads para reenvios da mesma operação; reutilização com dados diferentes retorna conflito.
- Falha de e-mail não desfaz o lead já gravado nem devolve falso erro de gravação. Uma falha não é reenviada automaticamente: deve ser tratada pelo atendimento/monitoramento do sistema.
- QA é marcado como teste_tecnico e não gera e-mail comercial. O campo is_test e a tag precisam ser excluídos das análises comerciais no CRM.
- Frontend emite generate_lead apenas para a resposta explícita do backend; QA usa lead_submission_test.
- Parâmetros GA4 limitados a form_id=coworking_quote, service_type enumerado e lead_source=website. Nome, e-mail, telefone, mensagem e ID do CRM não são enviados pelo novo evento.
- A Google tag existente passa a criar a fila imediatamente e preserva o carregamento de rede adiado; não adiciona segunda tag.
- Deduplicação de emissão no navegador usa memória e sessionStorage. Isso reduz duplicações locais; não promete entrega exatamente uma vez ao Google ou bloqueio universal de contatos repetidos. Navegadores distintos e novos IDs podem criar novas operações.
- O formulário continua utilizável com o backend antigo, mas não emite evento de lead sem o novo contrato de confirmação.
- O formulário geral já emite generate_lead no código existente. A nova meta Ads deve filtrar a cotação, evitando importar todos os contatos gerais como coworking.
- Não foi alterada a lógica do formulário geral; captura de origem/clique no CRM e eventos de reserva/matrícula são etapas posteriores.

## Configuração Google ainda necessária
1. Conferir stream G-0EJEFT2244 na propriedade GA4 521531340.
2. Conferir vínculo com Ads 192-557-7139 e codificação automática.
3. Criar no GA4 um evento derivado coworking_quote_submitted, copiando parâmetros, com condições event_name=generate_lead e form_id=coworking_quote. Nomear/categorizar de forma coerente; não marcar automaticamente o generate_lead genérico como meta de coworking.
4. Para separar resultados de estações, salas e auditório, acrescentar a condição service_type correspondente a cada derivação/meta de campanha.
5. Importar o evento de cotação pertinente como ação Ads, contagem Uma; verificar ações primárias/secundárias, metas de campanha e duplicações existentes.
6. Não marcar lead_submission_test como evento principal nem importar como conversão comercial.
7. Não disparar os eventos antigos novamente nem atribuir ao Ads o teste histórico sem clique publicitário comprovado.

O Windsor atual permite várias ações de campanha, mas não esta administração de GA4/conversões. Nenhuma configuração administrativa foi declarada aplicada.

## Publicação e aceite
1. Revisar este conjunto de alterações em PR; não há publicação na branch principal nem deploy realizado nesta etapa.
2. Publicar backend antes do frontend, pois o evento exige confirmação com lead_id.
3. Em preview/staging, usar /coworking?vth_test=1; o teste deve criar um registro identificado, emitir só lead_submission_test e não disparar e-mail comercial.
4. Verificar CRM, diagnóstico da tag/DebugView e parâmetros; testar erro, reenvio, atualização da página e carregamento adiado.
5. Conferir o mecanismo de consentimento efetivo antes da publicação; este patch reutiliza a tag existente e não instala uma plataforma de consentimento.
6. Confirmar que a versão pública contém os novos trechos e que os eventos são recebidos. Conversão atribuída no Ads depende também de origem publicitária válida e processamento.
7. Só então ativar o piloto Search, com destinos, geografia, redes, orçamento, metas e políticas conferidos.
8. Reversão: reverter o commit da alteração; os campos novos já persistidos nos leads são aditivos. Não apagar registros comerciais para desfazer uma versão.

## Verificação executada
- Compilação frontend (TypeScript, Vite e pós-processamento SEO): passou.
- Compilação backend: passou.
- 6 testes de persistência/idempotência, QA e falhas: passaram, com banco e e-mail simulados.
- 5 testes de emissão/deduplicação, dados pessoais, bloqueio de Analytics e fila antecipada: passaram.
- ESLint dos módulos novos/alterados de cotação, analytics e página Coworking: passou. Não se afirma lint global limpo.
- Build local utilizou checkout reduzido sem os arquivos grandes de imagens/fontes; houve avisos de recursos estáticos não presentes nessa cópia. Isso não altera os arquivos remotos nem prova que faltem no site publicado.
- A validação visual e o teste de formulário por navegador ficaram pendentes: o ambiente não dispõe de Chromium e o download retornou arquivo inválido. O script local não foi executado além dessa inicialização.
- Ainda não houve teste no CRM real, Firestore real, DebugView ou importação Ads. Nenhum teste enviou pedido comercial real ou dados ao GA4 de produção.

## Fontes oficiais reconsultadas em 21/10/2026
- Política para sites: https://support.google.com/nonprofits/answer/1657899?hl=pt-BR
- Campanhas voltadas para a missão: https://support.google.com/nonprofits/answer/4410314?hl=pt-BR
- Vínculo e conversões GA4–Ads: https://support.google.com/analytics/answer/10632359?hl=pt-BR

