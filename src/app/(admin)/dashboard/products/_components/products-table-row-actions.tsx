'use client';

import * as React from 'react';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { productSchema } from './product.schema';
import { deleteProduct } from '../../_lib/actions/product';
import { getErrorMessage } from '@/lib/handle-error';
import Link from 'next/link';

interface ProductsTableRowActionsProps<TData> {
	row: Row<TData>,
}

export function ProductsTableRowActions<TData>({ row }: ProductsTableRowActionsProps<TData>) {
	const product = productSchema.parse(row.original);
	const [ isPending, startTransition ] = React.useTransition();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
					<MoreHorizontal />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px]">
				<DropdownMenuItem asChild>
					<Link href={`/dashboard/products/${product.id}/edit`}>Edit</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href={`/product/${product.id}`}>View</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						startTransition(() => {
							row.toggleSelected(false);
							toast.promise(
								deleteProduct({
									id: product.id,
								}),
								{
									loading: 'Eliminando...',
									success: () => 'Producto eliminado exitosamente.',
									error: (err: unknown) => getErrorMessage(err),
								}
							);
						});
					}}
					disabled={isPending}
				>
					Delete
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
