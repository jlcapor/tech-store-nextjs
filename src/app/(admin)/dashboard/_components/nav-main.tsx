'use client';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { SidebarNavItem } from '@/types';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { usePathname } from 'next/navigation';

interface MainNavProps {
	items?: SidebarNavItem[],
}

export function NavMain({ items }: MainNavProps) {
	const pathname = usePathname();
	const { setOpenMobile } = useSidebar()

	if (!items?.length) return null

	
	return (

		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => {
					const Icon = Icons[item.icon ?? 'cube'];
					const isActive = pathname === item.href;
					return (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild onClick={() => setOpenMobile(false)} isActive={isActive} tooltip={item.title}>
								<Link
									href={item.href ?? '#'}
								>
									<Icon className="mr-1 size-4" aria-hidden="true" />
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
