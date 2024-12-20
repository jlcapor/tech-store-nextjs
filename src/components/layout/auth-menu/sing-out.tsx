import { Button } from '@/components/ui/button';
import { signOut } from '@/server/auth';

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
	return (
		<form action={async () => {
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
