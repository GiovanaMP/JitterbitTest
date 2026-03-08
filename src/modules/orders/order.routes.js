import { requireAuth } from "../../middlewares/auth.js";
import {
	createOrderSchema,
	deleteOrderSchema,
	getOrderSchema,
	listOrdersSchema,
	updateOrderSchema,
} from "./order.schemas.js";
import {
	createOrderService,
	deleteOrderService,
	getOrderByIdService,
	listOrdersService,
	updateOrderService,
} from "./order.service.js";

export async function orderRoutes(app) {
	app.post(
		"/order",
		{
			preHandler: requireAuth,
			schema: {
				tags: ["Order"],
				summary: "Cria um novo pedido",
				security: [{ bearerAuth: [] }],
				...createOrderSchema,
			},
		},
		async (request, reply) => {
			const result = await createOrderService(request.body);
			return reply.status(201).send(result);
		},
	);

	app.get(
		"/order/list",
		{
			schema: {
				tags: ["Order"],
				summary: "Lista todos os pedidos",
				...listOrdersSchema,
			},
		},
		async (_request, reply) => {
			const result = await listOrdersService();
			return reply.status(200).send(result);
		},
	);

	app.get(
		"/order/:orderId",
		{
			schema: {
				tags: ["Order"],
				summary: "Busca pedido por orderId",
				...getOrderSchema,
			},
		},
		async (request, reply) => {
			const result = await getOrderByIdService(request.params.orderId);
			return reply.status(200).send(result);
		},
	);

	app.put(
		"/order/:orderId",
		{
			preHandler: requireAuth,
			schema: {
				tags: ["Order"],
				summary: "Atualiza um pedido",
				security: [{ bearerAuth: [] }],
				...updateOrderSchema,
			},
		},
		async (request, reply) => {
			const result = await updateOrderService(
				request.params.orderId,
				request.body,
			);
			return reply.status(200).send(result);
		},
	);

	app.delete(
		"/order/:orderId",
		{
			preHandler: requireAuth,
			schema: {
				tags: ["Order"],
				summary: "Remove um pedido",
				security: [{ bearerAuth: [] }],
				...deleteOrderSchema,
			},
		},
		async (request, reply) => {
			await deleteOrderService(request.params.orderId);
			return reply.status(204).send();
		},
	);
}
