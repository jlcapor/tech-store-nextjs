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

//
