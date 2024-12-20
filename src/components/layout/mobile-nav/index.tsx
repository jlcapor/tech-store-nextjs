'use client';

import * as React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import Link from 'next/link';
import { DialogTitle } from '@/components/ui/dialog';
import { Icons } from '@/components/icons';

export default function MobileNav() {
	const isDesktop = useMediaQuery('(min-width: 1024px)');
	const [ open, setOpen ] = React.useState(false);
    
	if (isDesktop) return null;
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="-ml-2 mr-2 h-8 w-8 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
				>
					<Icons.menu className="size-5 text-muted-foreground" aria-hidden="true" />
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="pl-1 pr-0 pt-9">
				<DialogTitle className="sr-only">Menu</DialogTitle>
				<div className="w-full px-7">
					<Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
						{/* <Icons.logo className="mr-2 size-4" aria-hidden="true" /> */}
						<span className="font-bold">{siteConfig.name}</span>
						<span className="sr-only">Home</span>
					</Link>
				</div>
			</SheetContent>
		</Sheet>
	);
}
