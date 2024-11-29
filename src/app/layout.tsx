import '@/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { fontHeading } from '@/lib/fonts';

import { TRPCReactProvider } from '@/trpc/react';
import SessionWrapper from '../components/session-wrapper';
import { cn } from '@/lib/utils';

// export const metadata: Metadata = {
// 	title: 'Create T3 App',
// 	description: 'Generated by create-t3-app',
// 	icons: [ { rel: 'icon', url: '/favicon.ico' } ],
// };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					GeistSans.variable,
					GeistMono.variable,
					fontHeading.variable
				)}
			>
				<SessionWrapper>
					<TRPCReactProvider>
						<div className="relative flex min-h-screen flex-col bg-background">{children}</div>
					</TRPCReactProvider>
				</SessionWrapper>
			</body>
		</html>
	);
}
