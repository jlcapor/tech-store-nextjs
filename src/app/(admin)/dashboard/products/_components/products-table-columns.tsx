'use client';
import * as React from 'react';
import { type ColumnDef } from '@tanstack/react-table';

import { formatDate, formatPrice } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { AwaitedProduct } from './products-table';
import { ProductsTableRowActions } from './products-table-row-actions';


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
			enableSorting: false,
			enableHiding: false,
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
			cell: ({ row }) => <ProductsTableRowActions row={row} />,
		},
	];
}
