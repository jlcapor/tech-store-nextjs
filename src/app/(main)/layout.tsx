import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';
import { ScrollToTop } from '@/components/shared/ScrollToTop';
import { auth } from '@/server/auth';

export default async function TechStoreLayout({ children }: { children: React.ReactNode }) {
	const session = await auth();
	return (
		<>
			<Header session={session} />
			<main className="flex-1">{children}</main>
			<Footer />
			<ScrollToTop />
		</>
	);
}

//https://www.youtube.com/watch?v=7iobxzd_2wY&list=PLUofhDIg_38q4D0xNWp7FEHOTcZhjWJ29
