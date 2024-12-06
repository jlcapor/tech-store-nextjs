import { Session } from 'next-auth';
import ShoppingCart from '../ShoppingCart';
import AuthDropdown from './AuthDropdown';

interface HeaderProps {
	session: Session | null,
}
export const Header = ({ session }: HeaderProps) => {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center">
				gdfdfg
				<div className="flex flex-1 items-center justify-end space-x-4">
					<div className="w-full flex-1 md:w-auto md:flex-none">wwwww</div>
					<nav className="flex items-center space-x-4">
						<ShoppingCart />
						<AuthDropdown session={session} />
					</nav>
				</div>
			</div>
		</header>
	);
};
