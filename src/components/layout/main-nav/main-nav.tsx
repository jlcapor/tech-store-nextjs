import { siteConfig } from '@/config/site';
import { MonitorSmartphone } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function MainNav() {
	return (
		<div className="hidden gap-6 lg:flex">
			<Link href="/" className="hidden items-center space-x-2 lg:flex">
				<MonitorSmartphone className="size-7" aria-hidden="true" />
				<span className="hidden text-xl font-bold lg:inline-block">{siteConfig.name}</span>
				<span className="sr-only">Home</span>
			</Link>
		</div>
	);
}
