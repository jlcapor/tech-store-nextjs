import * as React from 'react';
import { type Metadata } from 'next';
import { db } from '@/server/db';
import { categories, products, type Product } from '@/server/db/schema';
import { env } from '@/env';
import { and, asc, desc, eq, gte, inArray, like, lte, sql } from 'drizzle-orm';
import { storeProductsSearchParamsSchema } from '../_lib/validations/params';
import { ProductsTable } from './_components/products-table';
import { getCategories } from '../_lib/queries/product';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	title: 'Products',
	description: 'Manage your products',
};

export default async function ProductsPage(props: {
	searchParams: Promise<Record<string, string | string[] | undefined>>,
}) {
	const parsedSearchParams = await props.searchParams;
	const { page, per_page, sort, name, category, from, to } = storeProductsSearchParamsSchema.parse(
		parsedSearchParams
	);
	// Fallback page for invalid page numbers
	const fallbackPage = isNaN(page) || page < 1 ? 1 : page;
	// Number of items per page
	const limit = isNaN(per_page) ? 10 : per_page;
	// Number of items to skip
	const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;
	// Column and order to sort by
	 const [column, order] = (sort?.split(".") as [
	   keyof Product | undefined,
	   "asc" | "desc" | undefined,
	 ]) ?? ["createdAt", "desc"]

	 const categoryIds = category?.split(".") ?? []

	const fromDay = from ? new Date(from) : undefined;
	const toDay = to ? new Date(to) : undefined;

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
						name ? like(products.name, `%${name}%`) : undefined,
						categoryIds.length > 0 ? inArray(products.categoryId, categoryIds) : undefined,
						// Filter by createdAt
						fromDay && toDay
							? and(gte(products.createdAt, fromDay), lte(products.createdAt, toDay))
							: undefined
					)
				)
				.orderBy(
					column && column in products
						? order === 'asc' ? asc(products[column]) : desc(products[column])
						: desc(products.createdAt)
				);
			const count = await tx
				.select({
					count: sql < number > `count(${products.id})`,
				})
				.from(products)
				.where(
					and(
						name ? like(products.name, `%${name}%`) : undefined,
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
			return { data: [], pageCount: 0 };
		}
	});
	const categoriesPromise = getCategories();
	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
				<h2 className="text-2xl font-bold tracking-tight">Productos</h2>
			</div>
			<React.Suspense
				fallback={<DataTableSkeleton columnCount={6} searchableColumnCount={1} filterableColumnCount={2} />}
			>
				<ProductsTable promise={productsPromise} categoriesPromise={categoriesPromise} />
			</React.Suspense>
		</div>
	);
}
