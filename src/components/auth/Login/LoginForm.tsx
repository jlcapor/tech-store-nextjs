'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { LoginInput, loginSchema } from '@/lib/validations/auth';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/password-input';
import Link from 'next/link';
import { authenticateAction } from '@/lib/actions/auth-action';
import { CircleAlert } from 'lucide-react';
import { OAuthSignIn } from '../OAuthSignIn';

export const LoginForm = () => {
	const [ isGoogleLoading, setIsGoogleLoading ] = React.useState<boolean>(false);

	const [error, setError] = React.useState<string | null>(null);
  	const [isPending, startTransition] = React.useTransition();
  	const router = useRouter();

  	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
			defaultValues: {
			email: "",
			password: "",
		},
  	});

	async function onSubmit(values: LoginInput) {
		startTransition(async () => {
			const response = await authenticateAction(values);
			if (response.error) {
				setError(response.error);
			} else {
				router.push('/');
			}
		});
	}
	return (
		<Form {...form}>
			<form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="email" type="email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<PasswordInput placeholder="**********" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex flex-wrap justify-between">
					<Button variant={'link'} size={'sm'} className="p-0" asChild>
						<Link href={'/signup'}>¿No tienes cuenta? Crear Una</Link>
					</Button>
					<Button variant={'link'} size={'sm'} className="p-0" asChild>
						<Link href={'/reset-password'}>¿Olvidaste tu contraseña?</Link>
					</Button>
				</div>

				{error && (
					<div
						className="border border-red-500 rounded-md p-2 flex items-center space-x-2 bg-red-50"
						aria-live="polite"
						aria-atomic="true"
					>
						<div>
							<CircleAlert className="h-5 w-5 text-red-500" />
							<FormMessage>{error}</FormMessage>
						</div>
					</div>
				)}
				<Button type="submit" className="mt-2" disabled={isPending}>
					{isPending && <Icons.spinner className="mr-2 size-4 animate-spin" aria-hidden="true" />}
					Iniciar Sesión
					<span className="sr-only">Iniciar Sesión</span>
				</Button>

				<Button variant="outline" className="w-full" asChild>
					<Link href="/">Cancelar</Link>
				</Button>
			</form>
		</Form>
	);
};
