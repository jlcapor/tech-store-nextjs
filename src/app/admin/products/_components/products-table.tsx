'use client';

import * as React from 'react';

import { type ColumnDef } from '@tanstack/react-table';

import { Product } from '@/server/db/schema';
import { DataTableFilterField } from '@/types';
import { getColumns } from './products-table-columns';
import { DataTable } from '@/components/data-table/data-table';
import { z } from 'zod';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { ProductsTableToolbarActions } from './products-table-toolbar-actions';
import { useDataTable } from '@/hooks/use-data-table';

export type AwaitedProduct = Omit<
  Pick<Product, "id" | "name" | "price" | "inventory" | "rating" | "createdAt">,
  "createdAt"
> & {
  createdAt: string;
};

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
});

export function ProductsTable({ promise }: ProductsTableProps) {
  const { data, pageCount } = React.use(promise);
  const columns = React.useMemo<ColumnDef<AwaitedProduct, unknown>[]>(() => getColumns(), []);

  const filterFields: DataTableFilterField<AwaitedProduct>[] = [
    {
      id: "name",
      label: "Name",
      placeholder: "Filter titles...",
    },
  ];

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields
  })

  return (
    <>
      <DataTable table={table}>
        <DataTableToolbar table={table} filterFields={filterFields}>
          <ProductsTableToolbarActions table={table} />
        </DataTableToolbar>
      </DataTable>
    </>
  );
}