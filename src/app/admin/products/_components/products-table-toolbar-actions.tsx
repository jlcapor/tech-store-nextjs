"use client"

import * as React from "react"

import { type Table } from '@tanstack/react-table';
import { DownloadIcon, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AwaitedProduct } from './products-table';
import { useRouter } from 'next/navigation';
import { CreateProductkDialog } from "./create-product-dialog";

interface ProductsTableToolbarActionsProps {
	table: Table<AwaitedProduct>,
}

export function ProductsTableToolbarActions({ table }: ProductsTableToolbarActionsProps) {
	const [showNewProductDialog, setShowNewProductDialog] = React.useState(false)
	return (
		<div className="flex items-center gap-2">
			{table.getFilteredSelectedRowModel().rows.length > 0 ? (
				<>
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							table.toggleAllPageRowsSelected(false);
						}}
						className="gap-2"
					>
						<X className="size-4" aria-hidden="true" />
						Clear selection
					</Button>
				</>
			) : null}
			<div className="flex items-center space-x-2">
				<CreateProductkDialog
				 open={showNewProductDialog}
				 onOpenChange={setShowNewProductDialog}
				/>

				<Button
					variant="outline"
					size="sm"
					
				>
					<DownloadIcon className="mr-2 size-4" aria-hidden="true" />
					Export
				</Button>
			</div>
		</div>
	);
}
