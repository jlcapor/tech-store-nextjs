import { Session } from 'next-auth';
import ShoppingCart from '../ShoppingCart';
import AuthDropdown from './AuthDropdown';
import MobileNav from './MobileNav';
import MainNav from './MainNav';
import { SearchBar } from '../SearchBar';
interface HeaderProps {
	session: Session | null,
}
export const Header = ({ session }: HeaderProps) => {
	return (
		<header className="animate-slide sticky top-0 z-50 w-full border-b bg-background">
			<div className="container flex h-16 items-center px-4">
				<MainNav />
				<MobileNav />
				<div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
					<div className="w-full flex-1 lg:w-auto lg:flex-none">
						<SearchBar />
					</div>
					<nav className="flex items-center space-x-2">
						<ShoppingCart />
						<AuthDropdown session={session} />
					</nav>
				</div>
			</div>
		</header>
	);
};
