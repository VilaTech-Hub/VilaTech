Listed directory SITE\_VILA\_TECH\_HUB\_2026  
Viewed vercel.json:1-11  
Listed directory .vercel  
Viewed project.json  
Searched for files: \*env\*  
Searched for files: \*.env\*  
Searched for "import.meta.env"  
Listed directory backend  
Viewed vercel.json:1-16  
Viewed project.json  
Viewed .env.example:1-5  
Viewed package.json:1-92  
Viewed server.ts:1-42

Aqui está uma estrutura completa de \*\*Engenharia de Prompt\*\*. 

Como este projeto é uma aplicação fullstack dividida em \*\*Frontend (Vite/React)\*\* e \*\*Backend (Node/Express Serverless)\*\* — ambos configurados para rodar na Vercel com dependências cruzadas (como Firebase e tokens de API) —, o prompt foi elaborado utilizando as melhores práticas de prompt engineering (delimitação de contexto, persona, inputs explícitos, restrições e critérios de aceitação).

Você pode copiar o bloco abaixo e repassá-lo diretamente ao outro desenvolvedor (ou pedir para ele rodar em uma IA de código como Cursor, ChatGPT ou Antigravity):

\---

\`\`\`markdown  
\# PROMPT PARA RECIAÇÃO DE AMBIENTES NA VERCEL: VILA TECH HUB 2026

\#\# 🎯 OBJETIVO  
Você é um Engenheiro DevOps & Fullstack especializado no ecossistema Vercel. Sua missão é guiar o desenvolvedor ou configurar do zero os ambientes de deploy (Production e Preview) deste repositório na conta Vercel do desenvolvedor, garantindo que o Frontend e o Backend se comuniquem perfeitamente.

\---

\#\# 🏗️ ARQUITETURA DO PROJETO NA VERCEL  
O repositório é composto por dois ambientes independentes dentro da Vercel:

1\. \*\*Frontend (\`vilatech-hub-frontend\`)\*\*:  
   \- \*\*Framework:\*\* Vite \+ React 19 \+ TypeScript \+ Tailwind CSS  
   \- \*\*Localização:\*\* Pasta \`/app\` (ou deploy a partir da raiz com as diretrizes do \`vercel.json\` raiz).  
   \- \*\*Build Command:\*\* \`cd app && npm install && npm run build\` (ou \`npm run build\` se o Root Directory for \`/app\`).  
   \- \*\*Output Directory:\*\* \`app/dist\` (ou \`dist\` se o Root Directory for \`/app\`).  
   \- \*\*Roteamento SPA:\*\* Reescrever todas as rotas \`/(.\*)\` para \`/index.html\`.

2\. \*\*Backend (\`vilatech-hub-backend\`)\*\*:  
   \- \*\*Framework:\*\* Node.js Express rodando como Vercel Serverless Function (\`@vercel/node\`).  
   \- \*\*Localização:\*\* Subdiretório \`/backend\`.  
   \- \*\*Arquivo de Entrada:\*\* \`backend/src/server.ts\` exportando \`default app\`.  
   \- \*\*Roteamento API:\*\* \`/(.\*)\` direcionado para \`src/server.ts\`.

\---

\#\# 📋 PASSO A PASSO DA EXECUÇÃO

\#\#\# ETAPA 1: Preparação do Repositório Local  
1\. Remova quaisquer pastas de linkage de contas antigas se existirem:  
   \`\`\`bash  
   \# Remova vínculos antigos com contas anteriores  
   rm \-rf .vercel  
   rm \-rf backend/.vercel  
   \`\`\`  
2\. Certifique-se de que a Vercel CLI está instalada e autenticada na sua conta:  
   \`\`\`bash  
   npm i \-g vercel  
   vercel login  
   \`\`\`

\---

\#\#\# ETAPA 2: Deploy do Backend (Faça o Backend primeiro\!)  
O frontend precisa da URL pública do backend para funcionar, portanto crie o projeto do Backend antes:

\#\#\#\# Opção A: Pelo Terminal (Vercel CLI)  
1\. Navegue até a pasta do backend:  
   \`\`\`bash  
   cd backend  
   vercel  
   \`\`\`  
2\. Responda às perguntas do CLI:  
   \- \`Set up and deploy?\` → \*\*Y\*\*  
   \- \`Which scope?\` → Selecione a \*\*sua conta/time\*\*  
   \- \`Link to existing project?\` → \*\*N\*\*  
   \- \`What's your project's name?\` → \`vilatech-hub-backend\` (ou nome de sua preferência)  
   \- \`In which directory is your code located?\` → \`./\`  
3\. O \`backend/vercel.json\` já contém a configuração do \`@vercel/node\`.  
4\. Configure as variáveis de ambiente necessárias:  
   \`\`\`bash  
   vercel env add API\_TOKEN production  
   vercel env add FIREBASE\_PROJECT\_ID production  
   vercel env add FIREBASE\_SERVICE\_ACCOUNT production  
   \`\`\`  
5\. Faça o deploy de produção:  
   \`\`\`bash  
   vercel \--prod  
   \`\`\`  
6\. \*\*Copie a URL de produção gerada\*\* (ex: \`https://vilatech-hub-backend.vercel.app\`). A sua API estará acessível em \`https://vilatech-hub-backend.vercel.app/api\`.

\#\#\#\# Opção B: Pelo Dashboard da Vercel  
1\. Clique em \*\*Add New...\*\* \> \*\*Project\*\* e importe o repositório Git.  
2\. Defina o \*\*Project Name\*\* como \`vilatech-hub-backend\`.  
3\. Em \*\*Root Directory\*\*, clique em Edit e selecione a pasta \`backend\`.  
4\. Em \*\*Environment Variables\*\*, cadastre:  
   \- \`API\_TOKEN\`: seu token secreto de API/CRM (ex: \`token\_seguro\_crm\_2026\`).  
   \- \`PORT\`: \`3001\`  
   \- \`FIREBASE\_PROJECT\_ID\`: ID do seu projeto Firebase.  
   \- \`FIREBASE\_SERVICE\_ACCOUNT\`: Conteúdo JSON minificado da chave de serviço do Firebase (Admin SDK).  
5\. Clique em \*\*Deploy\*\*.

\---

\#\#\# ETAPA 3: Deploy do Frontend

\#\#\#\# Opção A: Pelo Terminal (Vercel CLI)  
1\. Volte para a raiz do repositório:  
   \`\`\`bash  
   cd ..  
   vercel  
   \`\`\`  
2\. Responda às perguntas do CLI:  
   \- \`Set up and deploy?\` → \*\*Y\*\*  
   \- \`Which scope?\` → Selecione a \*\*sua conta/time\*\*  
   \- \`Link to existing project?\` → \*\*N\*\*  
   \- \`What's your project's name?\` → \`vilatech-hub-frontend\` (ou \`vilatech-hub-2026\`)  
   \- \`In which directory is your code located?\` → \`./\` (o arquivo raiz \`vercel.json\` já orquestra o build da pasta \`/app\`).  
3\. Adicione as variáveis de ambiente:  
   \`\`\`bash  
   \# Variáveis do Firebase Client  
   vercel env add VITE\_FIREBASE\_API\_KEY production  
   vercel env add VITE\_FIREBASE\_AUTH\_DOMAIN production  
   vercel env add VITE\_FIREBASE\_PROJECT\_ID production  
   vercel env add VITE\_FIREBASE\_STORAGE\_BUCKET production  
   vercel env add VITE\_FIREBASE\_MESSAGING\_SENDER\_ID production  
   vercel env add VITE\_FIREBASE\_APP\_ID production

   \# Integração com o Backend criado na Etapa 2  
   vercel env add VITE\_API\_URL production  
   vercel env add VITE\_API\_TOKEN production  
   \`\`\`  
   \> \*\*Atenção em \`VITE\_API\_URL\`\*\*: O valor deve ser a URL do backend com \`/api\` no final (ex: \`https://vilatech-hub-backend.vercel.app/api\`).  
   \> \*\*Atenção em \`VITE\_API\_TOKEN\`\*\*: Deve ser exatamente o mesmo valor definido no \`API\_TOKEN\` do backend.

4\. Faça o deploy de produção:  
   \`\`\`bash  
   vercel \--prod  
   \`\`\`

\#\#\#\# Opção B: Pelo Dashboard da Vercel  
1\. Clique em \*\*Add New...\*\* \> \*\*Project\*\* e importe o mesmo repositório Git.  
2\. Em \*\*Project Name\*\*, digite \`vilatech-hub-frontend\`.  
3\. Deixe o \*\*Root Directory\*\* como \`./\` (raiz), pois o \`vercel.json\` da raiz já gerencia o build do app, ou aponte para \`app\` com framework preset \*\*Vite\*\*.  
4\. Configure as variáveis de ambiente listadas acima (\`VITE\_\*\`).  
5\. Clique em \*\*Deploy\*\*.

\---

\#\# 🔐 TABELA DE VARIÁVEIS DE AMBIENTE NECESSÁRIAS

\#\#\# 1\. Backend Vercel Project  
| Chave | Descrição / Exemplo |  
| :--- | :--- |  
| \`API\_TOKEN\` | Token estático para proteger rotas do CRM (ex: \`super\_secret\_crm\_token\_2026\`) |  
| \`FIREBASE\_PROJECT\_ID\` | Ex: \`vila-tech-hub\` |  
| \`FIREBASE\_SERVICE\_ACCOUNT\`| Conteúdo do JSON da Service Account (\`serviceAccount.json\`) gerado no Firebase Console |  
| \`PORT\` | \`3001\` (padrão) |

\#\#\# 2\. Frontend Vercel Project  
| Chave | Descrição / Exemplo |  
| :--- | :--- |  
| \`VITE\_API\_URL\` | \`https://vilatech-hub-backend.vercel.app/api\` |  
| \`VITE\_API\_TOKEN\` | Mesmo valor de \`API\_TOKEN\` configurado no backend |  
| \`VITE\_FIREBASE\_API\_KEY\` | Chave pública da Web App no Firebase |  
| \`VITE\_FIREBASE\_AUTH\_DOMAIN\` | \`seu-app.firebaseapp.com\` |  
| \`VITE\_FIREBASE\_PROJECT\_ID\` | ID do projeto Firebase |  
| \`VITE\_FIREBASE\_STORAGE\_BUCKET\`| \`seu-app.firebasestorage.app\` |  
| \`VITE\_FIREBASE\_MESSAGING\_SENDER\_ID\` | Sender ID numérico do Firebase |  
| \`VITE\_FIREBASE\_APP\_ID\` | App ID \`1:xxxx:web:xxxx\` |

\---

\#\# ✅ CHECKLIST DE VALIDAÇÃO APÓS O DEPLOY  
1\. \*\*Healthcheck do Backend:\*\* Acesse \`https://\<url-do-backend\>/health\` no navegador e confirme se o retorno é \`{"status":"ok", ...}\`.  
2\. \*\*CORS:\*\* Verifique se as chamadas do frontend para \`/api/leads\` ou \`/api/settings\` não retornam erro de CORS no console.  
3\. \*\*Rotas SPA (Client Routing):\*\* Acesse uma subpágina diretamente pelo navegador (ex: \`https://\<url-do-frontend\>/coworking\` ou \`/admin\`) e dê F5 para garantir que o rewrite do \`vercel.json\` não causa erro 404\.  
4\. \*\*Comunicação Segura:\*\* Teste o envio de um lead pelo formulário e confirme o recebimento no Firestore / CRM.  
\`\`\`

\---

\#\#\# 💡 Dica de compartilhamento:  
Se o outro desenvolvedor também for configurar o repositório no GitHub para deploys contínuos (CI/CD automático a cada \`git push\`), oriente-o a conectar os dois projetos da Vercel ao mesmo repositório do GitHub, ajustando apenas o \*\*Root Directory\*\* de cada um no painel de configurações (\*\*Settings \> General \> Root Directory\*\*).  
