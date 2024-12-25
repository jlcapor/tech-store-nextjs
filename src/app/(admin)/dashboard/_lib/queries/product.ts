import 'server-only';

import { categories, products, type Product } from '@/server/db/schema';
import { db } from '@/server/db';
import { and, asc, desc, eq, gte, like, lte, sql } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';
import { ProductsSearchParams } from '../validations/params';

export async function fetchProducts(input: ProductsSearchParams) {
	try {
		const { page, per_page, sort, name, from, to } = input;
		const fallbackPage = isNaN(page) || page < 1 ? 1 : page;
		const limit = isNaN(per_page) ? 10 : per_page;
		const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;
		const [column, order] = (sort?.split(".") as [
			keyof Product | undefined,
			"asc" | "desc" | undefined,
		]) ?? ["createdAt", "desc"]

		const fromDay = from ? new Date(from) : undefined;
		const toDay = to ? new Date(to) : undefined;
		const transaction = await db.transaction(async (tx) => {
			const data = await tx
				.select({
					id: products.id,
					name: products.name,
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
						fromDay && toDay
							? and(gte(products.createdAt, fromDay), lte(products.createdAt, toDay))
							: undefined
					)
				)
				.orderBy(
					column && column in products
					  ? order === "asc"
						? asc(products[column])
						: desc(products[column])
					  : desc(products.createdAt)
				)

			const count = await tx
				.select({
					count: sql < number > `count(${products.id})`,
				})
				.from(products)
				.where(
					and(
						name ? like(products.name, `%${name}%`) : undefined,
						fromDay && toDay
							? and(gte(products.createdAt, fromDay), lte(products.createdAt, toDay))
							: undefined
					)
				)
				.execute()
			.then((res) => res[0]?.count ?? 0)

			const pageCount = Math.ceil(count / limit);
			return {
				data,
				pageCount,
			};
		});
		return transaction;
	} catch (error) {
		return {
			data: [],
			pageCount: 0,
		};
	}
}

export const getCategories = unstable_cache(
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
		tags: [ 'categories' ],
	}
);
