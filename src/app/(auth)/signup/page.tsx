import { Metadata } from 'next';
import { SignUpForm } from '@/components/auth/SignUp';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OAuthSignIn } from '@/components/auth/OAuthSignIn';

export const metadata: Metadata = {
	title: 'Sign Up',
	description: 'Sign up for an account',
};

export default function SignUpPage() {
	return (
		<Card className="w-full max-w-md">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl font-semibold tracking-tight">Crear cuenta</CardTitle>
				<CardDescription>Elija su método de registro preferido</CardDescription>
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
				<SignUpForm />
			</CardContent>
		</Card>
	);
}
