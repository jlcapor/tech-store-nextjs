import type { Metadata } from 'next';
import { AppSidebar } from './_components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';
import UserButton from './_components/user-button';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Admin dashboard',
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const session = await auth();
	if (!session || session.user.role !== 'ADMIN') {
		redirect("/")
	}
	
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center justify-between border-b px-3">
					<div className="flex items-center gap-2">
						<SidebarTrigger />
					</div>
					<nav className="flex items-center space-x-4 ml-auto">
						<UserButton />
					</nav>
				</header>
				<div className="flex flex-1 flex-col gap-4 pt-6 p-4">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
