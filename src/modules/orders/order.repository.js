import { prisma } from "../../lib/prisma.js";

export async function createOrder(data) {
	return prisma.order.create({
		data: {
			orderId: data.orderId,
			value: data.value,
			creationDate: data.creationDate,
			items: {
				create: data.items,
			},
		},
		include: { items: true },
	});
}

export async function findOrderById(orderId) {
	return prisma.order.findUnique({
		where: { orderId },
		include: { items: true },
	});
}

export async function listOrders() {
	return prisma.order.findMany({
		include: { items: true },
		orderBy: { creationDate: "desc" },
	});
}

export async function updateOrder(orderId, data) {
	return prisma.$transaction(async (tx) => {
		await tx.item.deleteMany({ where: { orderId } });

		return tx.order.update({
			where: { orderId },
			data: {
				value: data.value,
				creationDate: data.creationDate,
				items: {
					create: data.items,
				},
			},
			include: { items: true },
		});
	});
}

export async function deleteOrder(orderId) {
	return prisma.order.delete({ where: { orderId } });
}
