import { loginSchema } from "./auth.schemas.js";
import { authenticateUser } from "./auth.service.js";

export async function authRoutes(app) {
	app.post(
		"/auth/login",
		{
			schema: {
				tags: ["Auth"],
				summary: "Autenticação básica com JWT",
				...loginSchema,
			},
		},
		async (request, reply) => {
			const user = await authenticateUser(request.body);
			const token = await reply.jwtSign({ sub: user.username });
			return reply.status(200).send({ token });
		},
	);
}
