# Desafio Técnico Jitterbit

## Contexto
Implementação do desafio técnico da Jitterbit: API em Node.js para gerenciamento de pedidos com CRUD completo, persistência em PostgreSQL e transformação obrigatória de payload.

Arquivo de referência:
- `/home/giovana-mp/Downloads/Jitterbit - Teste TeÃ³rico IE PS - v2.pdf`

## Requisitos do teste

### Objetivo
A API deve permitir:
- Criação
- Leitura
- Atualização
- Exclusão

### Endpoints
- `POST /order`
- `GET /order/:orderId`
- `GET /order/list`
- `PUT /order/:orderId`
- `DELETE /order/:orderId`

### Mapping obrigatório
Entrada:
- `numeroPedido`
- `valorTotal`
- `dataCriacao`
- `items[].idItem`
- `items[].quantidadeItem`
- `items[].valorItem`

Persistência/resposta:
- `orderId`
- `value`
- `creationDate`
- `items[].productId`
- `items[].quantity`
- `items[].price`

Regra aplicada:
- `orderId` é derivado de `numeroPedido` (parte antes de `-`).

### Estrutura SQL/PostgreSQL
- `Order(orderId, value, creationDate)`
- `Items(orderId, productId, quantity, price)`

## Stack adotada
- `Node.js`
- `Fastify`
- `PostgreSQL`
- `Prisma`
- `pnpm`
- `Biome`
- `Zod`
- `@fastify/jwt` (JWT)
- `@fastify/swagger` + `@fastify/swagger-ui`
- `Postman`
- `Jest` + `Supertest`
- `Docker Compose` (subida do banco)

## Arquitetura
- `src/config`
- `src/plugins`
- `src/middlewares`
- `src/modules/auth`
- `src/modules/orders`
- `src/lib`
- `src/utils`

Separação por responsabilidade:
- `routes` -> `service` -> `repository`
- `mapper` para transformação do payload
- validação de entrada
- tratamento centralizado de erro

## O que foi implementado
- CRUD completo de pedidos
- Mapping obrigatório do payload
- Prisma com modelos `Order` e `Items`
- Erros com mensagens claras e status HTTP adequados
- JWT com `POST /auth/login`
- Proteção JWT em `POST/PUT/DELETE /order`
- Swagger em `/docs`
- Coleção e environment do Postman em `postman/`
- Testes de integração com `Jest + Supertest`
- README com instruções de execução
- Banco PostgreSQL subido e validado com Docker

## Status HTTP aplicados
- `201` criação
- `200` leitura/listagem/atualização
- `204` deleção
- `400` payload inválido
- `401` token inválido/ausente
- `404` pedido não encontrado
- `409` pedido já existente
- `500` erro interno

## Execução local

### Com Docker (forma utilizada)
1. `pnpm run db:down`
2. `pnpm run db:start`
3. `pnpm run db:push`
4. `pnpm run dev`

### Sem Docker
1. Configurar PostgreSQL local
2. Ajustar `DATABASE_URL` no `.env`
3. `pnpm run db:push`
4. `pnpm run dev`

## Configuração atual de ambiente
- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/docs`
- Postgres Docker host port: `5433`
- `DATABASE_URL`: `postgresql://postgres:password@localhost:5433/jitterbit`
- Imagem Postgres: `postgres:18.3`

## Validação executada
- `pnpm run check`: OK
- `pnpm run db:start`: OK
- `pnpm run db:push`: OK
- `pnpm run test`: OK (`4 passed`)
- Bootstrap da aplicação: OK
- API acessível em `GET /` retornando `{"status":"ok"}`

## Status da entrega
- Escopo do desafio técnico implementado conforme requisitos.
- Extras opcionais implementados: JWT + Swagger/Postman.

## Observação importante sobre Swagger Auth
- Em `Authorize`, colar apenas o valor do token JWT.
- Não colar o JSON completo retornado pelo login.
- Exemplo correto: `eyJ...`
- Exemplo incorreto: `{ "token": "eyJ..." }`
