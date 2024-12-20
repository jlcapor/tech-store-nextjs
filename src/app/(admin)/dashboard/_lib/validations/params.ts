import * as z from 'zod';

export const searchParamsSchema = z.object({
	page: z.coerce.number().default(1),
	per_page: z.coerce.number().default(10),
	from: z.string().optional(),
	to: z.string().optional(),
	sort: z.string().optional().default('createdAt.desc'),
});

export const productsSearchParamsSchema = searchParamsSchema
.omit({ from: true, to: true })
.extend({
	categories: z.string().optional(),
	subcategory: z.string().optional(),
	subcategories: z.string().optional(),
	price_range: z.string().optional(),
	active: z.string().optional().default('true'),
});

export const storeProductsSearchParamsSchema = searchParamsSchema
.extend({
	name: z.string().optional(),
	category: z.string().optional(),
});

export const storeSearchParamsSchema = searchParamsSchema
  .omit({ sort: true, from: true, to: true })
  .extend({
    sort: z.string().optional().default("productCount.desc"),
    statuses: z.string().optional(),
})





