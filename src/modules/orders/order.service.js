import { AppError } from "../../utils/app-error.js";
import {
	mapIncomingOrderToPersistence,
	mapOrderToResponse,
} from "./order.mapper.js";
import {
	createOrder,
	deleteOrder,
	findOrderById,
	listOrders,
	updateOrder,
} from "./order.repository.js";
import { createOrUpdateOrderSchema } from "./order.validators.js";

export async function createOrderService(payload) {
	const input = createOrUpdateOrderSchema.parse(payload);
	const mapped = mapIncomingOrderToPersistence(input);

	const existing = await findOrderById(mapped.orderId);

	if (existing) {
		throw new AppError(409, "Pedido já existe");
	}

	const created = await createOrder(mapped);
	return mapOrderToResponse(created);
}

export async function getOrderByIdService(orderId) {
	const order = await findOrderById(orderId);

	if (!order) {
		throw new AppError(404, "Pedido não encontrado");
	}

	return mapOrderToResponse(order);
}

export async function listOrdersService() {
	const orders = await listOrders();
	return orders.map(mapOrderToResponse);
}

export async function updateOrderService(orderId, payload) {
	const input = createOrUpdateOrderSchema.parse(payload);
	const mapped = mapIncomingOrderToPersistence(input);

	if (mapped.orderId !== orderId) {
		throw new AppError(
			400,
			"O numeroPedido informado no body deve corresponder ao orderId da URL",
		);
	}

	const existing = await findOrderById(orderId);

	if (!existing) {
		throw new AppError(404, "Pedido não encontrado");
	}

	const updated = await updateOrder(orderId, mapped);
	return mapOrderToResponse(updated);
}

export async function deleteOrderService(orderId) {
	const existing = await findOrderById(orderId);

	if (!existing) {
		throw new AppError(404, "Pedido não encontrado");
	}

	await deleteOrder(orderId);
}
