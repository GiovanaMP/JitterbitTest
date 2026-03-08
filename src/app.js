import cors from "@fastify/cors";
import Fastify from "fastify";
import { env } from "./config/env.js";
import { registerErrorHandler } from "./middlewares/error-handler.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { orderRoutes } from "./modules/orders/order.routes.js";
import { registerJwt } from "./plugins/jwt.js";
import { registerSwagger } from "./plugins/swagger.js";

export async function buildApp() {
	const app = Fastify({ logger: true });

	await app.register(cors, {
		origin: env.CORS_ORIGIN,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	});

	await registerJwt(app);
	await registerSwagger(app);

	app.get("/", async () => ({ status: "ok" }));

	await app.register(authRoutes);
	await app.register(orderRoutes);

	registerErrorHandler(app);

	return app;
}
