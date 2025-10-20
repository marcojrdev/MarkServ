# MarkServ — API (TypeScript + Express + Prisma)
#front: https://github.com/marcojrdev/MarkServ---front

Resumo rápido
- Backend em TypeScript com Express e Prisma (PostgreSQL).
- Autenticação/middleware em [src/middlewares/authMiddleware.ts](src/middlewares/authMiddleware.ts).
- Modelos de banco em [prisma/schema.prisma](prisma/schema.prisma).
- Rotas principais em [src/routes](src/routes).

Estrutura principal do projeto
- [package.json](package.json)  
- [tsconfig.json](tsconfig.json)  
- [prisma/schema.prisma](prisma/schema.prisma)  
- [prisma/seed.ts](prisma/seed.ts)  
- [src/index.ts](src/index.ts) (entry)  
- Rotas:
  - [src/routes/servicoRoutes.ts](src/routes/servicoRoutes.ts)
  - [src/routes/contratoRoutes.ts](src/routes/contratoRoutes.ts)
  - [src/routes/authRoutes.ts](src/routes/authRoutes.ts)
- Controllers:
  - [`ServicoController`](src/controllers/serviceControllers.ts) — veja [`ServicoController`](src/controllers/serviceControllers.ts) para criar/atualizar/deletar/listar serviços.
  - [`ContratacaoController`](src/controllers/contratacaoController.ts) — veja [`ContratacaoController.criar`](src/controllers/contratacaoController.ts) e [`ContratacaoController.listarContratacao`](src/controllers/contratacaoController.ts).
- Services:
  - [`ContratacaoService`](src/services/contratacaoService.ts) — [`criarContratacao`](src/services/contratacaoService.ts) e [`listarContratacoes`](src/services/contratacaoService.ts).
- Utils:
  - [src/utils/jwt.ts](src/utils/jwt.ts)

Instalação e execução (local)
1. Instalar dependências:
   ```sh
   npm install

2. Variáveis de ambiente (exemplo mínimo no arquivo .env)
   
   - DATABASE_URL=postgresql://USER:PASS@HOST:PORT/DBNAME
   - JWT_SECRET=uma_chave_segura
   - PORT=3000


3. Gerar cliente Prisma / migrar / seed:
   ```sh
   npx prisma generate
   npx prisma migrate dev --name init
   npx prisma db seed

   
(O seed usa prisma/seed.ts.)
4. Rodar em desenvolvimento:
  - Se houver script de dev (ex.: ts-node-dev): npm run dev
  - Senão compile e rode
    ```sh
    npm run build
    npm start

5. A API ficará disponível em http://localhost:$PORT
Modelos relevantes (resumo)

- schema.prisma define entidades importantes:
  - Contratacao (campos: clienteId, servicoId, prestadorId, data, duracaoMin, preco, status)
  - Servico, Prestador, Cliente, Agenda, VariacoesServico, TipoServico
  -Rotas principais (resumo extraído dos arquivos)

Rotas de serviços — servicoRoutes.ts

- POST /servicos
  - Middleware: AuthMilddleware.Authorize ("prestador")
  - Controller: ServicoController.criarServico
- PUT /servicos
  - Middleware: AuthMilddleware.Authorize ("prestador")
  - Controller: ServicoController.atualizarServico
  - DELETE /servicos/:servicoId
  - Middleware: AuthMilddleware.Authorize ("prestador")
  - Controller: ServicoController.deletarServico
- GET /servicos
  - Controller: ServicoController.listarServicos
  - GET /servicos/:servicoId
  - Controller: ServicoController.listarServicoPorId
  - POST /servicos/agendas
  - Middleware: AuthMilddleware.Authorize ("prestador")
  - Controller: ServicoController.criarAgendas
  - Arquivo: servicoRoutes.ts

Rotas de contratação — contratoRoutes.ts

- POST /contratos
Middleware: AuthMilddleware.Authorize ("cliente")
Controller: ContratacaoController.criar
Body esperado (exemplo):
  ```sh
  {
    "clienteId": "uuid-cliente",
    "servicoId": "uuid-servico",
    "prestadorId": "uuid-prestador",
    "data": "2025-10-20T10:00:00.000Z",
    "duracaoMin": 60,
    "preco": 150.0
  }
