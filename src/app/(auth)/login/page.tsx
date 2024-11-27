import { LoginForm } from '@/components/auth/Login';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';

export const metadata = {
	title: 'Login',
	description: 'Login Page',
};

export default async function LoginPage() {
	const session = await auth();
	if (session?.user) {
		if (session.user.role === 'ADMIN') redirect('/');
		redirect('/my-account');
	}
	return <LoginForm />;
}
