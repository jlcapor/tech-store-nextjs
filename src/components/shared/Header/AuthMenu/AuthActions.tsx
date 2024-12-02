import { Button } from '@/components/ui/button';
import { auth, signOut } from '@/server/auth';
import AuthDropdown from './AuthDropdown';
import AuthOptions from './AuthOptions';

export async function  AuthActions() {
	const session = await auth();

  return session?.user ? (
    <AuthDropdown session={session} />
  ) : (
    <AuthOptions />
  );
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
	return (
		<form
			action={async () => {
				'use server';
				await signOut();
			}}
			className="w-full"
		>
			<Button variant="ghost" className="w-full p-0" {...props}>
				Salir
			</Button>
		</form>
	);
}


 //https://authjs.dev/getting-started