import 'server-only';

import { unstable_cache } from '@/lib/unstable-cache';
import { GetProductsSchema } from '../validations/params';
import { categories, Product, products } from '@/server/db/schema';
import { and, asc, count, desc, eq, gte, ilike, inArray, like, lte, sql } from 'drizzle-orm';
import { db } from '@/server/db';

export async function getProducts(input: GetProductsSchema) {
	return await unstable_cache(
		async () => {
			// Fallback page for invalid page numbers
			const fallbackPage = isNaN(input.page) || input.page < 1 ? 1 : input.page;
			// Number of items per page
			const limit = isNaN(input.perPage) ? 10 : input.perPage;
			// Number of items to skip
			const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;

			// Extract column and order from input.sort
			const [ column, order ] = input.sort && input.sort.length > 0
			? [input.sort[0]?.id , input.sort[0]?.desc]
			: ["createdAt", "desc"];

			  const validColumn = column as keyof Product;

			const categoryIds = input.category?.split(".") ?? []
			const fromDay = input.from ? new Date(input.from) : undefined;
			const toDay = input.to ? new Date(input.to) : undefined;

			const productsPromise = db.transaction(async (tx) => {
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
								input.name ? like(products.name, `%${input.name}%`) : undefined,
								categoryIds.length > 0 ? inArray(products.categoryId, categoryIds) : undefined,
								// Filter by createdAt
								fromDay && toDay
									? and(gte(products.createdAt, fromDay), lte(products.createdAt, toDay))
									: undefined
							)
						)
						.orderBy(
							validColumn in products
								? order === 'asc' ? asc(products[validColumn]) : desc(products[validColumn])
								: desc(products.createdAt)
						);
					const count = await tx
						.select({
							count: sql < number > `count(${products.id})`,
						})
						.from(products)
						.where(
							and(
								input.name ? like(products.name, `%${input.name}%`) : undefined,
								categoryIds.length > 0 ? inArray(products.categoryId, categoryIds) : undefined,
								categoryIds.length > 0 ? inArray(products.categoryId, categoryIds) : undefined,
								fromDay && toDay
									? and(gte(products.createdAt, fromDay), lte(products.createdAt, toDay))
									: undefined
							)
						)
					.then((res) => res[0]?.count ?? 0)
					const pageCount = Math.ceil(count / limit);
					return { data, pageCount };
				} catch (error) {
					console.error(error);
					return {
						data: [],
						pageCount: 0,
					};
				}
			});
		},
		[ JSON.stringify(input) ],
		{ revalidate: 3600 }
	)();
}

export async function getCategories() {
	return await unstable_cache(
		async () => {
			return db
				.selectDistinct({
					id: categories.id,
					name: categories.name,
					slug: categories.slug,
					description: categories.description,
					image: categories.image,
				})
				.from(categories)
				.orderBy(desc(categories.name));
		},
		[ 'categories' ],
		{
			revalidate: 3600, // every hour
		}
	)();
}
