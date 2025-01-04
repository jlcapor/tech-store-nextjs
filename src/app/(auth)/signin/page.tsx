import { type Metadata } from 'next';
import { SignInForm } from '@/components/auth/SignIn';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OAuthSignIn } from '@/components/auth/OAuthSignIn';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';
import { Paths } from '@/lib/constants';

export const metadata: Metadata = {
	title: 'Sign In',
	description: 'Sign in to your account',
};

export default async function SignInPage() {
	const session = await auth();
	if (session?.user) redirect(Paths.Home);
	return (
		<Card className="w-full max-w-md">
			<CardHeader className="text-center mt-3">
				<CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
				<CardDescription>Elija su método de inicio de sesión preferido</CardDescription>
			</CardHeader>
			<CardContent>
				<OAuthSignIn />
				<div className="my-5 flex items-center">
					<div className="flex-grow border-t border-muted" />
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">O continuar con</span>
					</div>
					<div className="flex-grow border-t border-muted" />
				</div>
				<SignInForm />
			</CardContent>
		</Card>
	);
}
