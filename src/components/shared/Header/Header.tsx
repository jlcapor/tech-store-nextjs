import AuthDropdown from "./AuthDropdown";

export const Header = () => {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
			<div className="relative mx-auto max-w-7xl px-6 2xl:px-0">
				<nav className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-28">
            hfghfg
          </div>
          <div className="flex items-center gap-3">
            <AuthDropdown/>
          </div>
        </nav>
			</div>
		</header>
	);
};
