'use client';

import * as React from 'react';
import { signupAction } from '@/lib/actions/auth-action';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SignupInput, signupSchema } from '@/lib/validations/auth';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/password-input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { CircleAlert } from 'lucide-react';

export const NewAccountForm = () => {
	const [error, setError] = React.useState<string | null>(null);
	const [isPending, startTransition] = React.useTransition();
	const router = useRouter();
  
	const form = useForm<z.infer<typeof signupSchema>>({
	  resolver: zodResolver(signupSchema),
	  defaultValues: {
		  name: "",
		  email: "",
		  password: "",
	  },
	});

	async function onSubmit(values: SignupInput) {
		setError(null);
		startTransition(async () => {
			const response = await signupAction(values);
			if (response.error) {
				setError(response.error);
			} else {
				router.push('/verify-email');
			}
		});
	}
	return (
		<Form {...form}>
			<form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tu nombre</FormLabel>
							<FormControl>
								<Input type="text" placeholder="Nombres y apellidos" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Correo electrónico</FormLabel>
							<FormControl>
								<Input type="email" placeholder="Correo electrónico" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Contraseña</FormLabel>
							<FormControl>
								<PasswordInput placeholder="**********" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<div>
					<Link href={'/login'}>
						<span className="p-0 text-xs font-medium underline-offset-4 hover:underline">
							¿Ya tienes cuenta? Iniciar Sesión
						</span>
					</Link>
				</div>

				{error && (
					<div
						className="rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive"
						aria-live="polite"
						aria-atomic="true"
					>
						<>
							<CircleAlert className="h-5 w-5 text-red-500" />
							<FormMessage>{error}</FormMessage>
						</>
					</div>
				)}

				<Button type="submit" className="mt-2" disabled={isPending}>
					{isPending && <Icons.spinner className="mr-2 size-4 animate-spin" aria-hidden="true" />}
					Crear cuenta
					<span className="sr-only">Crear cuenta</span>
				</Button>
				<Button variant="outline" className="w-full" asChild>
					<Link href="/">Cancelar</Link>
				</Button>
			</form>
		</Form>
	);
};
