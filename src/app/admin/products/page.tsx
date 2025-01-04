import * as React from 'react';
import { type SearchParams } from '@/types';
import { type Metadata } from 'next';
import { env } from '@/env';
import { ProductsTable } from '@/components/admin/producto/products-table';
import { DataTableSkeleton } from '@/components/admin/producto/data-table-skeleton';
import { productsSearchParamsSchema } from '../_lib/validations/params';
import { fetchProducts } from '../_lib/queries/product';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchComponent from '@/components/admin/search-component';

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	title: 'Products',
	description: 'Manage your products',
};

interface ProductsPageProps {
	searchParams: Promise<SearchParams>,
}

export default async function ProductsPage(props: ProductsPageProps) {
	const searchParams = await props.searchParams;
	const search = productsSearchParamsSchema.parse(searchParams);
	const productsPromise = fetchProducts(search);

	return (
		<div className="w-full space-y-6">
			<div className="flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
				<h2 className="text-2xl font-bold tracking-tight">Productos</h2>
			</div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<SearchComponent placeholder="Search products..." />
				<Button variant="default">
					<Link href="/admin/product/new" className="cursor-pointer flex gap-2 items-center">
						<PlusIcon className="h-5 w-5" />
						<span className="hidden md:block">Crear producto</span>
					</Link>
				</Button>
			</div>
			<React.Suspense fallback={<DataTableSkeleton columnCount={7} />}>
				<ProductsTable promise={productsPromise} />
			</React.Suspense>
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4">
				<span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
					Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of{' '}
					<span className="font-semibold text-gray-900 dark:text-white">1000</span>
				</span>
			</div>
		</div>
	);
}
