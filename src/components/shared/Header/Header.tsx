import { AuthActions } from './AuthActions';
import ThemeToggler from './ThemeToggler';

export const Header = () => {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
			<div className="relative mx-auto max-w-7xl px-6 2xl:px-0">
				<nav className="flex items-center justify-between h-16">
					<div className="flex items-center space-x-28">hfghfg</div>
					<div className="flex items-center gap-4">
						{/* <AuthDropdown/> */}
						<AuthActions />
						<ThemeToggler />
					</div>
				</nav>
			</div>
		</header>
	);
};
