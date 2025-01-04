'use client';

import * as React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody } from '@/components/ui/table';
import { type Product } from '@/server/db/schema';
import { ProductItem } from './product-item';

export type AwaitedProduct = Omit<
    Pick<Product, 'id' | 'name' | 'price' | 'inventory' | 'rating' | 'createdAt'>,
    'createdAt'
> & {
    createdAt: string,
};

interface ProductsTableProps {
    promise: Promise<{
        data: AwaitedProduct[],
        pageCount: number,
    }>,
}

export function ProductsTable({ promise }: ProductsTableProps) {
    const { data, pageCount } = React.use(promise);
    return (
        <div className="overflow-x-auto">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <TableRow>
                            <TableHead className="hidden md:table-cell px-6 py-3">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead scope="col" className="px-6 py-3">
                                Producto
                            </TableHead>
                            <TableHead scope="col" className="px-6 py-3">
                                Precio
                            </TableHead>
                            <TableHead scope="col" className="px-6 py-3">
                                Cantidad
                            </TableHead>
                            <TableHead scope="col" className="px-6 py-3">
                                Rating
                            </TableHead>
                            <TableHead scope="col" className="px-6 py-3">
                                Created at
                            </TableHead>
                            <TableHead scope="col" className="px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>{data.map((product) => <ProductItem key={product.id} product={product} />)}</TableBody>
                </Table>
            </div>
        </div>
    );
}