import SiteFooter from '@/components/layout/footer';
import SiteHeader from '@/components/layout/header';
import { auth } from '@/server/auth';

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
	const session = await auth();
	return (
		<div className="flex flex-col min-h-screen">
			<SiteHeader session={session} />
			<main className="flex-1 flex flex-col">{children}</main>
			<SiteFooter />
		</div>
	);
}
