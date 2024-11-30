import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';
import ScrollToTop from '@/components/shared/ScrollToTop/ScrollToTop';

export default async function TechStoreLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative flex min-h-screen flex-col">
			<Header />
			<div className="flex-1">{children}</div>
			<Footer />
			<ScrollToTop />
		</div>
	);
}

//
