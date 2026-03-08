import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { env } from "../config/env.js";

export async function registerSwagger(app) {
	await app.register(fastifySwagger, {
		openapi: {
			info: {
				title: "Jitterbit Order API",
				description: "API para gerenciamento de pedidos do desafio técnico",
				version: "1.0.0",
			},
			servers: [{ url: `http://localhost:${env.PORT}` }],
			components: {
				securitySchemes: {
					bearerAuth: {
						type: "http",
						scheme: "bearer",
						bearerFormat: "JWT",
					},
				},
			},
		},
	});

	await app.register(fastifySwaggerUi, {
		routePrefix: "/docs",
	});
}
