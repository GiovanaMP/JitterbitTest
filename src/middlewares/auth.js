import { AppError } from "../utils/app-error.js";

export async function requireAuth(request, _reply) {
	try {
		await request.jwtVerify();
	} catch {
		throw new AppError(401, "Token inválido ou ausente");
	}
}
