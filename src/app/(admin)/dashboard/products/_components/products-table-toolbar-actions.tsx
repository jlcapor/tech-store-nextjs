"use client"

import { type Product } from "@/server/db/schema"
import { type Table } from "@tanstack/react-table"
import { Download, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AwaitedProduct } from "./products-table"



interface ProductsTableToolbarActionsProps {
  table: Table<AwaitedProduct>
}

export function ProductsTableToolbarActions({
  table,
}: ProductsTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
       <>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.toggleAllPageRowsSelected(false)
          }}
          className="gap-2"
        >
          <X className="size-4" aria-hidden="true" />
          Clear selection
        </Button>
        {/**
         * Other actions can be added here.
         * For example, delete, mark as complete, etc.
         */}
       </>
      ) : null}
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <Download className="size-4" aria-hidden="true" />
        Export
      </Button>
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  )
}