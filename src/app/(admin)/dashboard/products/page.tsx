import * as React from 'react';
import { type SearchParams } from "@/types"

import { type Metadata } from 'next';
import { env } from '@/env';
import { ProductsTable } from './_components/products-table';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { productsSearchParamsSchema } from '../_lib/validations/params';
import { fetchProducts } from '../_lib/queries/product';
import { DateRangePicker } from '@/components/date-range-picker';

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	title: 'Products',
	description: 'Manage your products',
};

interface ProductsPageProps {
	searchParams: Promise<SearchParams>
}

export default async function ProductsPage(props: ProductsPageProps) {
	const searchParams = await props.searchParams
	const search = productsSearchParamsSchema.parse(searchParams)
  	const productsPromise = fetchProducts(search)
	
	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
				<h2 className="text-2xl font-bold tracking-tight">Productos</h2>
				<DateRangePicker align="end" />
			</div>
			<React.Suspense 
				fallback={
					<DataTableSkeleton 
						columnCount={6} 
						searchableColumnCount={1}
					/>
				}>
				<ProductsTable promise={productsPromise}/>
			</React.Suspense>
		</div>
	);
}
