import { z } from "zod";

const itemSchema = z.object({
	idItem: z.string().min(1),
	quantidadeItem: z.number().int().positive(),
	valorItem: z.number().positive(),
});

export const createOrUpdateOrderSchema = z.object({
	numeroPedido: z.string().min(1),
	valorTotal: z.number().positive(),
	dataCriacao: z.string().datetime({ offset: true }),
	items: z.array(itemSchema).min(1),
});

export const orderIdParamSchema = z.object({
	orderId: z.string().min(1),
});
