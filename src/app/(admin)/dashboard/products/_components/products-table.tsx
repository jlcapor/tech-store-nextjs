'use client';

import * as React from 'react';
import { Product } from '@/server/db/schema';
import { DataTableFilterField } from '@/types';
import { useDataTable } from '@/hooks/use-data-table';
import { DataTable } from '@/components/data-table/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { getCategories } from '../../_lib/queries/product';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatPrice } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { EllipsisVertical } from 'lucide-react';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { ProductsTableToolbarActions } from './products-table-toolbar-actions';

export type AwaitedProduct = Pick<
  Product,
  "id" | "name" | "price" | "inventory" | "rating" | "createdAt" 
> & {
  category: string | null;
};

interface ProductsTableProps {
  promise: Promise<{
    data: AwaitedProduct[];
    pageCount: number;
  }>;
  categoriesPromise: ReturnType<typeof getCategories>
}

export function ProductsTable({ promise, categoriesPromise }: ProductsTableProps) {
  const { data, pageCount } = React.use(promise); 
  const categories = React.use(categoriesPromise)

  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([])

  const columns = React.useMemo<ColumnDef<AwaitedProduct, unknown>[]>(
	() => [
		{
			id: "select",
			header: ({ table }) => (
			  <Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => {
				  table.toggleAllPageRowsSelected(!!value)
				  setSelectedRowIds((prev) =>
					prev.length === data.length ? [] : data.map((row) => row.id)
				  )
				}}
				aria-label="Select all"
				className="translate-y-[2px]"
			  />
			),
			cell: ({ row }) => (
			  <Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => {
				  row.toggleSelected(!!value)
				  setSelectedRowIds((prev) =>
					value
					  ? [...prev, row.original.id]
					  : prev.filter((id) => id !== row.original.id)
				  )
				}}
				aria-label="Select row"
				className="translate-y-[2px]"
			  />
			),
			enableSorting: false,
			enableHiding: false,
		  },
		  {
			accessorKey: "name",
			header: ({ column }) => (
			  <DataTableColumnHeader column={column} title="Name" />
			),
		  },

		  {
			accessorKey: "category",
			header: ({ column }) => (
			  <DataTableColumnHeader column={column} title="Category" />
			),
			cell: ({ cell }) => {
			  const category = cell.getValue() as string
			  const existingCategory = categories.some(
				(categoryData) => categoryData.name === category
			  )
			  return existingCategory ? (
				<Badge variant="outline" className="capitalize">
				  {category}
				</Badge>
			  ) : null
			},
		  },

		  {
			accessorKey: "price",
			header: ({ column }) => (
			  <DataTableColumnHeader column={column} title="Price" />
			),
			cell: ({ cell }) => formatPrice(cell.getValue() as number),
		  },

		  {
			accessorKey: "inventory",
			header: ({ column }) => (
			  <DataTableColumnHeader column={column} title="Inventory" />
			),
		  },

		  {
			accessorKey: "rating",
			header: ({ column }) => (
			  <DataTableColumnHeader column={column} title="Rating" />
			),
		  },

		  {
			accessorKey: "createdAt",
			header: ({ column }) => (
			  <DataTableColumnHeader column={column} title="Created At" />
			),
			cell: ({ cell }) => formatDate(cell.getValue() as Date),
			enableColumnFilter: false,
		  },
		  {
			id: "actions",
			cell: ({ row }) => (
			  <DropdownMenu>
				<DropdownMenuTrigger asChild>
				  <Button
					aria-label="Open menu"
					variant="ghost"
					className="flex size-8 p-0 data-[state=open]:bg-muted"
				  >
					<EllipsisVertical  className="size-4" aria-hidden="true" />
				  </Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[160px]">
				  <DropdownMenuItem asChild>
					<Link
					  href={`/admin/dashboard/products/${row.original.id}/edit`}
					>
					  Edit
					</Link>
				  </DropdownMenuItem>
				  <DropdownMenuItem asChild>
					<Link href={`/product/${row.original.id}`}>View</Link>
				  </DropdownMenuItem>
				  <DropdownMenuSeparator />
				  <DropdownMenuItem>
					Delete
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				  </DropdownMenuItem>
				</DropdownMenuContent>
			  </DropdownMenu>
			),
		  }
		],
	[data, isPending]
  )

  const filterFields: DataTableFilterField<AwaitedProduct>[] = [
    {
      id: 'name',
      label: 'Name',
      placeholder: 'Filter name...',
    },
  ];

  const { table } = useDataTable({
	data,
	columns,
	pageCount,
	filterFields,
  });

  return (
	<>
		<DataTable table={table}>
			<DataTableToolbar table={table} filterFields={filterFields}>
				<ProductsTableToolbarActions table={table} />
			</DataTableToolbar>
		</DataTable>
	</>
  )
}
