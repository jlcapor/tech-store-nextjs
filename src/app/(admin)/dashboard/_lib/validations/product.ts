import { z } from 'zod';

export const createProductSchema = z.object({
	name: z.string().min(1, {
		message: 'Debe tener al menos 1 carácter',
	}),
	description: z.string().optional(),
	categoryId: z.string(),
	subcategoryId: z.string().optional().nullable(),
	price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
		message: 'Debe ser un precio válido.',
	}),
	inventory: z.number().int().nonnegative(),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>
