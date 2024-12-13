import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
export default function ShoppingCart() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button aria-label="Open cart" variant="outline" size="icon" className="relative">
					<Icons.cart className="size-4" aria-hidden="true" />
				</Button>
			</SheetTrigger>
			<SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
				<DialogTitle className="sr-only">Menu</DialogTitle>
				<SheetHeader className="space-y-2.5 pr-6">
					<SheetTitle>Cart</SheetTitle>
					<Separator />
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
