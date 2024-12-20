import SiteFooter from '@/components/layout/footer';
import SiteHeader from '@/components/layout/header';
import ScrollToTop from '@/components/layout/scroll-to-top';
import { auth } from '@/server/auth';

export default async function TechStoreLayout({ children }: { children: React.ReactNode }) {
	const session = await auth();
	return (
		<>
			<SiteHeader session={session} />
			<main className="flex-1">
				{children}
			</main>
			<SiteFooter />
			<ScrollToTop />
		</>
	);
}
//Azur3_!2025.
//https://www.youtube.com/watch?v=7iobxzd_2wY&list=PLUofhDIg_38q4D0xNWp7FEHOTcZhjWJ29
