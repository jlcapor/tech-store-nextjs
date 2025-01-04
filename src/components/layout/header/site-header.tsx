import { type Session } from 'next-auth';
import { Suspense } from 'react';
import Link from 'next/link';

import { MainNav } from '@/components/layout/main-nav';
import MobileNav from '@/components/layout/mobile-nav';
import CartButton from '@/components/shopping-cart/cart-button';
import AuthDropdown from '@/components/layout/auth-menu';
import ProductsCombobox from '@/components/products-combobox';

interface SiteHeaderProps {
	session: Session | null,
}

export function SiteHeader({ session }: SiteHeaderProps) {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background">
			<div className="container flex h-16 items-center px-4">
				<MainNav />
				<MobileNav />
				<div className="flex flex-1 items-center justify-end space-x-4">
					<nav className="flex items-center space-x-4">
						<ProductsCombobox />
						<Suspense
							fallback={
								<Link className="flex gap-2 hover:text-base" href="/cart" data-testid="nav-cart-link">
									Cart (0)
								</Link>
							}
						>
							<CartButton />
						</Suspense>
						<AuthDropdown session={session} />
					</nav>
				</div>
			</div>
		</header>
	);
}
