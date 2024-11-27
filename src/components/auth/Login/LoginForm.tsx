'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { PasswordInput } from '@/components/password-input';
import { SubmitButton } from '@/components/submit-button';
import { Icons } from '@/components/icons';
import { signIn } from 'next-auth/react';
import { authenticate } from '@/lib/actions/auth';
import { CircleAlert } from 'lucide-react';

export const LoginForm = () => {
	const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
	const [ errorMessage, formAction ] = React.useActionState(authenticate, undefined);

	return (
		<Card className="w-full max-w-md">
			<CardHeader className="text-center mt-3">
				<CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
				<CardDescription>Inicia sesión para gestionar tus pedidos</CardDescription>
			</CardHeader>
			<CardContent>
				<Button
					variant="outline"
					className="w-full"
					onClick={() => {
						setIsGoogleLoading(true);
						signIn('google');
					}}
					disabled={isGoogleLoading}
				>
					{isGoogleLoading ? (
						<Icons.spinner className="mr-2 size-4 animate-spin" />
					) : (
						<Icons.google className="mr-2 size-4" />
					)}{' '}
					Google
				</Button>
				<div className="my-2 flex items-center">
					<div className="flex-grow border-t border-muted" />
					<div className="mx-2 text-muted-foreground">O</div>
					<div className="flex-grow border-t border-muted" />
				</div>
				<form action={formAction} className="grid gap-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							required
							id="email"
							placeholder="email@example.com"
							autoComplete="email"
							name="email"
							type="email"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<PasswordInput
							id="password"
							name="password"
							// required
							autoComplete="current-password"
							placeholder="********"
						/>
					</div>

						{errorMessage && (
							<div 
								className="flex h-8 items-end space-x-1"
								aria-live="polite"
								aria-atomic="true"
							>
								<>
									<CircleAlert className="h-5 w-5 text-red-500" />
									<p className="text-sm text-red-500">{errorMessage}</p>
								</>
							</div>
						)}

					<div className="flex flex-wrap justify-between">
						<Button variant={'link'} size={'sm'} className="p-0" asChild>
							<Link href={'/signup'}>¿No tienes cuenta? Crear Una</Link>
						</Button>
						<Button variant={'link'} size={'sm'} className="p-0" asChild>
							<Link href={'/reset-password'}>¿Olvidaste tu contraseña?</Link>
						</Button>
					</div>
					<SubmitButton className="mt-4 w-full" aria-label="submit-btn">
						Iniciar Sesión
					</SubmitButton>
					<Button variant="outline" className="w-full" asChild>
						<Link href="/">Cancelar</Link>
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};
