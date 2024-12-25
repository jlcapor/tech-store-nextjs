import { z } from 'zod';
import { createTRPCRouter, adminProcedure } from '@/server/api/trpc';
import { categories, products } from '@/server/db/schema';
import { and, asc, desc, eq, gte, inArray, like, lte, sql } from 'drizzle-orm';

export const productsAdminRouter = createTRPCRouter({
	getProducts: adminProcedure
		.input(
			z.object({
				page: z.number().int().default(0),
				per_page: z.number().int().default(10),
				sort: z
					.array(
						z.object({
							id: z.enum([ 'id', 'name', 'price', 'inventory', 'rating', 'createdAt', 'category' ]),
							desc: z.boolean().default(false),
						})
					)
					.optional(),
				name: z.string().default(''),
				category: z.string().default(''),
				from: z.string().default(''),
				to: z.string().default(''),
			})
		)
		.query(async ({ ctx, input }) => {
			const { page, per_page, sort, name, category, from, to } = input;
			const fallbackPage = isNaN(page) || page < 1 ? 1 : page;
			const limit = isNaN(per_page) ? 10 : per_page;
			const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;
			
			const sortMap: Record<string, any> = {
				id: products.id,
				name: products.name,
				price: products.price,
				inventory: products.inventory,
				rating: products.rating,
				createdAt: products.createdAt,
				category: categories.name,
			};

			const orderBy =
				Array.isArray(sort) && sort.length > 0
					? sort.map((item) => (item.desc ? desc(sortMap[item.id]) : asc(sortMap[item.id])))
					: [ asc(sortMap.createdAt) ];

			const categoryIds = category?.split('.') ?? []
			const fromDay = from ? new Date(from) : undefined;
			const toDay = to ? new Date(to) : undefined;

			const getProducts = await ctx.db.transaction(async (tx) => {
				try {
					const data = await tx
						.select({
							id: products.id,
							name: products.name,
							category: categories.name,
							price: products.price,
							inventory: products.inventory,
							rating: products.rating,
							createdAt: products.createdAt,
						})
						.from(products)
						.limit(limit)
						.offset(offset)
						.leftJoin(categories, eq(products.categoryId, categories.id))
						.where(
							and(
								name ? like(products.name, `%${name}%`) : undefined,
								categoryIds.length > 0 ? inArray(products.categoryId, categoryIds) : undefined,
								fromDay && toDay
									? and(gte(products.createdAt, fromDay), lte(products.createdAt, toDay))
									: undefined
							)
						)
						.orderBy(...orderBy);

					const count = await tx
						.select({
							count: sql < number > `count(${products.id})`,
						})
						.from(products)
						.where(
							and(
								name ? like(products.name, `%${name}%`) : undefined,
								categoryIds.length > 0 ? inArray(products.categoryId, categoryIds) : undefined,
								fromDay && toDay
									? and(gte(products.createdAt, fromDay), lte(products.createdAt, toDay))
									: undefined
							)
						)
					.then((res) => res[0]?.count ?? 0);
					const pageCount = Math.ceil(count / limit);
					return { data, pageCount };
				} catch (error) {
					console.error(error);
					return { data: [], pageCount: 0 };
				}
			});
			return getProducts;
		}),
});
