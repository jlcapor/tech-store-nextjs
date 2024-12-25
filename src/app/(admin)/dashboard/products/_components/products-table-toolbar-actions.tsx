"use client"

import { type Table } from "@tanstack/react-table"
import { X } from "lucide-react"

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
       </>
      ) : null}
      <div className="flex items-center space-x-2">
        <Button 
        variant="outline"
          size="sm"  
          className="h-8 px-2 lg:px-3">
          Add Payment
        </Button>
      </div>
    </div>
  )
}