const incomingItem = {
	type: "object",
	required: ["idItem", "quantidadeItem", "valorItem"],
	properties: {
		idItem: { type: "string" },
		quantidadeItem: { type: "number" },
		valorItem: { type: "number" },
	},
};

const incomingOrderBody = {
	type: "object",
	required: ["numeroPedido", "valorTotal", "dataCriacao", "items"],
	properties: {
		numeroPedido: { type: "string" },
		valorTotal: { type: "number" },
		dataCriacao: { type: "string", format: "date-time" },
		items: { type: "array", items: incomingItem },
	},
};

const item = {
	type: "object",
	properties: {
		productId: { type: "number" },
		quantity: { type: "number" },
		price: { type: "number" },
	},
};

const order = {
	type: "object",
	properties: {
		orderId: { type: "string" },
		value: { type: "number" },
		creationDate: { type: "string", format: "date-time" },
		items: { type: "array", items: item },
	},
};

export const createOrderSchema = {
	body: incomingOrderBody,
	response: {
		201: order,
	},
};

export const getOrderSchema = {
	params: {
		type: "object",
		required: ["orderId"],
		properties: {
			orderId: { type: "string" },
		},
	},
	response: {
		200: order,
	},
};

export const listOrdersSchema = {
	response: {
		200: {
			type: "array",
			items: order,
		},
	},
};

export const updateOrderSchema = {
	params: {
		type: "object",
		required: ["orderId"],
		properties: {
			orderId: { type: "string" },
		},
	},
	body: incomingOrderBody,
	response: {
		200: order,
	},
};

export const deleteOrderSchema = {
	params: {
		type: "object",
		required: ["orderId"],
		properties: {
			orderId: { type: "string" },
		},
	},
	response: {
		204: { type: "null" },
	},
};
