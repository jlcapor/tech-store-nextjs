import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { signOut } from '@/server/auth';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

export function SignIn({ className, ...props }: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
	return (
		<Button size="sm" className={cn(className)} {...props} asChild>
			<Link href="/login">
				<LogIn className="h-5 w-5 " />
				Acceder
				<span className="sr-only">Acceder</span>
			</Link>
		</Button>
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