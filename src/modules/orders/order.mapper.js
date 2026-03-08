import { AppError } from "../../utils/app-error.js";

export function mapIncomingOrderToPersistence(input) {
	const orderId = input.numeroPedido.split("-")[0];

	if (!orderId) {
		throw new AppError(400, "numeroPedido inválido");
	}

	const mappedItems = input.items.map((item) => {
		const productId = Number(item.idItem);

		if (!Number.isInteger(productId) || productId <= 0) {
			throw new AppError(
				400,
				"idItem inválido: deve ser um número inteiro positivo",
			);
		}

		return {
			productId,
			quantity: item.quantidadeItem,
			price: item.valorItem,
		};
	});

	return {
		orderId,
		value: input.valorTotal,
		creationDate: new Date(input.dataCriacao),
		items: mappedItems,
	};
}

export function mapOrderToResponse(order) {
	return {
		orderId: order.orderId,
		value: order.value,
		creationDate: order.creationDate,
		items: order.items.map((item) => ({
			productId: item.productId,
			quantity: item.quantity,
			price: item.price,
		})),
	};
}
