'use client';

import * as React from 'react';
import { 
  ColumnDef, 
  ColumnFiltersState, 
  getCoreRowModel, 
  getFacetedRowModel, 
  getFacetedUniqueValues, 
  getFilteredRowModel, 
  getPaginationRowModel, 
  getSortedRowModel, 
  PaginationState, 
  SortingState, 
  useReactTable, 
  VisibilityState 
} from '@tanstack/react-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Product } from '@/server/db/schema';
import { DataTableFilterField, DataTableRowAction } from '@/types';
import { getColumns } from './products-table-columns';
import { DataTable } from '@/components/data-table/data-table';
import { z } from 'zod';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { ProductsTableToolbarActions } from './products-table-toolbar-actions';

export type AwaitedProduct = Pick<
  Product,
  "id" | "name" | "price" | "inventory" | "rating" | "createdAt"
>;

interface ProductsTableProps {
  promise: Promise<{
    data: AwaitedProduct[];
    pageCount: number;
  }>;
}

const schema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().optional(),
  sort: z.string().optional(),
})

export function ProductsTable({ promise }: ProductsTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = schema.parse(Object.fromEntries(searchParams))
  const page = search.page
  const perPage = search.per_page ?? 10
  const defaultSort = "createdAt.desc" as `${Extract<keyof AwaitedProduct, string | number>}.${"asc" | "desc"}`;
  const sort = search.sort ?? defaultSort;
  const [column, order] = sort?.split(".") ?? []

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  const { data, pageCount } = React.use(promise);

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: perPage,
  });

  const pagination = React.useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  React.useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page: pageIndex + 1,
        per_page: pageSize,
      })}`,
      {
        scroll: false,
      }
    )
  }, [pageIndex, pageSize])

  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: column ?? "",
      desc: order === "desc",
    },
  ])

  React.useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page,
        sort: sorting[0]?.id
          ? `${sorting[0]?.id}.${sorting[0]?.desc ? "desc" : "asc"}`
          : null,
      })}`
    )
  }, [sorting])

 

  const columns = React.useMemo<ColumnDef<AwaitedProduct, unknown>[]>(
    () => getColumns(),
    []
  );

  const filterFields: DataTableFilterField<AwaitedProduct>[] = [
    {
      id: "name",
      label: "Name",
      placeholder: "Filter names...",
    },
  ]

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields}>
            <ProductsTableToolbarActions table={table}/>
      </DataTableToolbar>
    </DataTable>
  );
}

// Genial Gianella, muy buenos ejemplos. Lo único que cambiaría es que en el ejemplo de "Pick" el nuevo tipo se llama "UserData" y ese nombre podría mejorarse. Podría ser "CompleteUser" o "ExtendedUser" pero añadir el "data" a una interfaz no aporta mucho. Sólo como apunte.
