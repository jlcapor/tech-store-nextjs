import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { AwaitedProduct } from './products-table';
import { formatDate, formatPrice } from '@/lib/utils';
import Link from 'next/link';

export function ProductItem({ product }: { product: AwaitedProduct }) {
	const { id, name, price, inventory, rating, createdAt } = product;
	// const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;

	return (
		<TableRow className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
			<TableCell className="hidden sm:table-cell pl-4">
				{/* <Image
					alt={images[0]?.name ?? product.name}
					className="aspect-square rounded-md object-cover"
					height={64}
					width={64}
					src={images[0]?.url ?? "/hero/product-placeholder.webp"}
				/> */}
			</TableCell>
			<TableCell scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
				{name}
			</TableCell>
			<TableCell className="px-6 py-4">{formatPrice(price)}</TableCell>
			<TableCell className="px-6 py-4">{inventory}</TableCell>
			<TableCell className="px-6 py-4">{rating}</TableCell>
			<TableCell className="px-6 py-4">{formatDate(createdAt)}</TableCell>
			<TableCell>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button aria-haspopup="true" size="icon" variant="ghost">
							<MoreHorizontal className="h-4 w-4" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-[160px]">
						<DropdownMenuLabel>Acciones</DropdownMenuLabel>
						<DropdownMenuItem asChild>
              <Link href={`/admin/product/${id}/edit`} className="flex items-center">
                <Pencil className="size-5 mr-2" />
                <p className="text-sm">Actualizar</p>
              </Link>
						</DropdownMenuItem>
            <DropdownMenuSeparator />
						<DropdownMenuItem asChild>

            </DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	);
}
