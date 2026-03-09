# Teste Técnico Jitterbit - Perguntas e Respostas

## 1)Desenvolver uma API em Node.js para gerenciar pedidos (criar, ler, atualizar e excluir).

**Resposta implementada:**
- API em `Node.js` com `Fastify`.
- CRUD completo de pedidos:
  - `POST /order`
  - `GET /order/:orderId`
  - `GET /order/list`
  - `PUT /order/:orderId`
  - `DELETE /order/:orderId`

---

## 2)Armazenar os dados em MongoDB, SQL ou PostgreSQL.

**Resposta implementada:**
- `PostgreSQL` + `Prisma`.
- Banco executado localmente com `Docker` (`docker compose`).
- Estrutura aderente ao PDF:
  - Tabela `Order`: `orderId`, `value`, `creationDate`
  - Tabela `Items`: `orderId`, `productId`, `quantity`, `price`

---

## 3)Receber JSON de entrada e transformar para salvar no banco.

**Resposta implementada:**
Entrada:
- `numeroPedido`
- `valorTotal`
- `dataCriacao`
- `items[].idItem`
- `items[].quantidadeItem`
- `items[].valorItem`

Persistência/Resposta:
- `orderId`
- `value`
- `creationDate`
- `items[].productId`
- `items[].quantity`
- `items[].price`

Regra aplicada:
- `orderId` = parte antes de `-` em `numeroPedido`.
- Ex.: `v10089015vdb-01` -> `v10089015vdb`

---

## 4)Tratamento de erros e status HTTP corretos. 

Status usados:
- `201` criação
- `200` leitura/listagem/atualização
- `204` deleção
- `400` payload inválido
- `401` não autorizado
- `404` não encontrado
- `409` conflito (pedido já existe)
- `500` erro interno

---

## 5) JWT e documentação (Swagger/Postman) 

- JWT:
  - `POST /auth/login`
  - proteção em `POST/PUT/DELETE /order`
- Documentação:
  - Swagger em `http://localhost:3000/docs`
  - Coleção e environment Postman em `postman/`

Observação importante no Swagger:
- Em `Authorize`, copie e cole apenas o valor do token JWT.

---

## 6)Stack adotada
- Node.js
- Fastify
- PostgreSQL
- Prisma
- pnpm
- Zod
- Biome
- JWT (`@fastify/jwt`)
- Swagger (`@fastify/swagger`, `@fastify/swagger-ui`)
- Postman
- Jest + Supertest
- Docker Compose (subida do banco)

---

## 7) Como rodar o projeto:
### Com Docker (forma usada no desenvolvimento)
```bash
pnpm install
pnpm run db:start
pnpm run db:push
pnpm run dev
```

API:
- `http://localhost:3000`

Swagger:
- `http://localhost:3000/docs`

### Sem Docker
1. Configurar PostgreSQL local.
2. Ajustar `DATABASE_URL` no `.env`.
3. Rodar:
```bash
pnpm install
pnpm run db:push
pnpm run dev
```

---


## 8) Como validar rapidamente os endpoints:
1. `POST /auth/login`
2. `POST /order`
3. `GET /order/list`
4. `GET /order/{orderId}`
5. `PUT /order/{orderId}`
6. `DELETE /order/{orderId}`
7. `GET /order/{orderId}` (esperado `404` após delete)

---

## 9) Testes automatizados:
Rodar:
```bash
pnpm run test
```
Inclui testes de integração com `Jest + Supertest`.
