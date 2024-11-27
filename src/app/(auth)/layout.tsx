const AuthLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode,
}>) => {
	return <div className="grid min-h-screen place-items-center p-4 py-12 sm:px-6 lg:px-8">{children}</div>;
};

export default AuthLayout;
