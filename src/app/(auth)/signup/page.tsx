import { Metadata } from 'next';
import { SignUpForm } from '@/components/auth/SignUp';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
	title: 'Sign Up',
	description: 'Sign up for an account',
};

export default function SignupPage() {
	return (
		<Card className="w-full max-w-md">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl font-semibold tracking-tight">Crear cuenta</CardTitle>
			</CardHeader>
			<CardContent>
				<SignUpForm />
			</CardContent>
		</Card>
	);
}
