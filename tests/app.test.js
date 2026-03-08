import request from "supertest";
import { buildApp } from "../src/app.js";

describe("App integration", () => {
	let app;

	beforeAll(async () => {
		app = await buildApp();
		await app.listen({ port: 0, host: "127.0.0.1" });
	});

	afterAll(async () => {
		await app.close();
	});

	test("GET / should return status ok", async () => {
		const response = await request(app.server).get("/");

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({ status: "ok" });
	});

	test("POST /auth/login should return token with valid credentials", async () => {
		const response = await request(app.server).post("/auth/login").send({
			username: "admin",
			password: "admin123",
		});

		expect(response.statusCode).toBe(200);
		expect(typeof response.body.token).toBe("string");
		expect(response.body.token.length).toBeGreaterThan(10);
	});

	test("POST /auth/login should return 401 with invalid credentials", async () => {
		const response = await request(app.server).post("/auth/login").send({
			username: "admin",
			password: "wrong-password",
		});

		expect(response.statusCode).toBe(401);
		expect(response.body.message).toBe("Credenciais inválidas");
	});

	test("POST /order should return 401 without token", async () => {
		const response = await request(app.server)
			.post("/order")
			.send({
				numeroPedido: "v10089015vdb-01",
				valorTotal: 10000,
				dataCriacao: "2023-07-19T12:24:11.5299601+00:00",
				items: [
					{
						idItem: "2434",
						quantidadeItem: 1,
						valorItem: 1000,
					},
				],
			});

		expect(response.statusCode).toBe(401);
		expect(response.body.message).toBe("Token inválido ou ausente");
	});
});
