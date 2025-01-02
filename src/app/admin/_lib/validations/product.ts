import { ProductFile } from '@/types';
import { z } from 'zod';

export const createProductSchema = z.object({
	name: z.string().min(1, {
		message: 'Debe tener al menos 1 carácter',
	}),
	description: z.string().min(1, "Description is required"),
	categoryId: z.string().min(1, "Category is required"),
	subcategoryId: z.string().min(1, "Subcategory is required"),
	price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
		message: 'Debe ser un precio válido.',
	}),
	inventory: z.number().int().nonnegative("Inventory must be a non-negative number"),
	images: z
    .custom<File[] | undefined | null>()
    .optional()
    .nullable()
    .default(null),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>

export interface CreateProductInput extends Omit<CreateProductSchema, "images"> {
	images: ProductFile[]
}
