import '@/styles/globals.css';

import { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { fontHeading } from '@/lib/fonts';

import { TRPCReactProvider } from '@/trpc/react';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '../components/providers';
import { env } from '@/env';
import { siteConfig } from '@/config/site';
import Providers from './Providers';

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					GeistSans.variable,
					GeistMono.variable,
					fontHeading.variable
				)}
			>
				<Providers>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						<TRPCReactProvider>
							<div className="relative flex flex-col min-h-screen bg-background">
								{children}
							</div>
						</TRPCReactProvider>
					</ThemeProvider>
				</Providers>
			</body>
		</html>
	);
}
