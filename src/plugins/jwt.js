import fastifyJwt from "@fastify/jwt";
import { env } from "../config/env.js";

export async function registerJwt(app) {
	await app.register(fastifyJwt, {
		secret: env.JWT_SECRET,
	});
}
