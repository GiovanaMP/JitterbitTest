import { ZodError } from "zod";
import { AppError } from "../utils/app-error.js";

export function registerErrorHandler(app) {
	app.setErrorHandler((error, request, reply) => {
		if (error instanceof AppError) {
			return reply.status(error.statusCode).send({ message: error.message });
		}

		if (error instanceof ZodError) {
			return reply.status(400).send({
				message: "Payload inválido",
				details: error.issues.map((issue) => ({
					field: issue.path.join("."),
					message: issue.message,
				})),
			});
		}

		if (error?.validation) {
			return reply.status(400).send({
				message: "Payload inválido",
				details: error.validation,
			});
		}

		request.log.error(error);
		return reply.status(500).send({ message: "Erro interno do servidor" });
	});
}
