'use client';

import * as React from 'react';
import { type ColumnDef } from '@tanstack/react-table';

import { formatDate, formatPrice } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { AwaitedProduct } from './products-table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Ellipsis } from 'lucide-react';
import Link from 'next/link';
import { productSchema } from './product.schema';
import { deleteProduct } from '../../_lib/actions/product.actions';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/handle-error';

export function getColumns(): ColumnDef<AwaitedProduct>[] {
	return [
		{
			id: 'select',
			header: ({ table }) => (
				<Checkbox
					checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
					className="translate-y-0.5"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
					className="translate-y-0.5"
				/>
			),
		},
		{
			accessorKey: 'name',
			header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
		},
		{
			accessorKey: 'price',
			header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
			cell: ({ cell }) => formatPrice(cell.getValue() as number),
		},
		{
			accessorKey: 'inventory',
			header: ({ column }) => <DataTableColumnHeader column={column} title="Inventory" />,
		},
		{
			accessorKey: 'rating',
			header: ({ column }) => <DataTableColumnHeader column={column} title="Rating" />,
		},
		{
			accessorKey: 'createdAt',
			header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
			cell: ({ cell }) => formatDate(cell.getValue() as Date),
			enableColumnFilter: false,
		},
		{
			id: 'actions',
			cell: function Cell({ row }) {
				const [ isPending, startTransition ] = React.useTransition();
				const product = productSchema.parse(row.original);
				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								aria-label="Open menu"
								variant="ghost"
								className="flex size-8 p-0 data-[state=open]:bg-muted"
							>
								<Ellipsis className="size-4" aria-hidden="true" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-[160px]">
							<DropdownMenuItem asChild>
								<Link href={`/admin/products/${product.id}/edit/`}>Editar</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => {
									startTransition(() => {
										row.toggleSelected(false);

										toast.promise(
											deleteProduct({
												id: product.id,
											}),
											{
												loading: 'Deleting...',
												success: () => 'Product deleted successfully.',
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
			},
		},
	];
}
