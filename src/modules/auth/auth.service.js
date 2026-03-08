import { env } from "../../config/env.js";
import { AppError } from "../../utils/app-error.js";

export async function authenticateUser({ username, password }) {
	if (username !== env.AUTH_USERNAME || password !== env.AUTH_PASSWORD) {
		throw new AppError(401, "Credenciais inválidas");
	}

	return { username };
}
