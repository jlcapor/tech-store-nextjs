import type { Metadata } from 'next';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';

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
		<div className="flex">
			<div className="relative flex flex-1 flex-col lg:ml-64">
				<main>
					<div className="flex-1 overflow-hidden px-6 pt-6">{children}</div>
				</main>
			</div>
		</div>
	);
}
