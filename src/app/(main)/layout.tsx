import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";

export default async function TechStoreLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header/>
			<div className="flex-1">{children}</div>
			<Footer/>
		</>
	);
}

//
