import type { Metadata } from 'next';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';
import DashboardSidebar from './_components/dashboard-sidebar';
import DashboardHeader from './_components/dashboard-header';
import { SidebarProvider } from '@/context/sidebar-context';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Admin dashboard',
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
        redirect('/');
    }

    return (
        <SidebarProvider>
            <div className="flex">
                <DashboardSidebar />
                <div className="relative flex flex-1 flex-col lg:ml-72">
                    <DashboardHeader />
                    <main>
                        <div className="flex-1 overflow-hidden px-6 pt-6">{children}</div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}