import { siteConfig } from '@/config/site';
import { MonitorSmartphone } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function MainNav() {
	return (
		<div className="hidden gap-6 lg:flex">
			<div className="flex items-center gap-2">
				<MonitorSmartphone className="h-6 w-6" />
				<Link href="/home" className="flex justify-center items-center gap-2 ml-0" title="Home">
					<h1 className="text-xl font-bold m-0 mt-1">{siteConfig.name}</h1>
				</Link>
				<span className="sr-only">Home</span>
			</div>
		</div>
	);
}
