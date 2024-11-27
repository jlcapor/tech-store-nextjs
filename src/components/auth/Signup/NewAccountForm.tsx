'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/password-input';
import { SubmitButton } from '@/components/submit-button';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Icons } from '@/components/icons';
import { signup } from '@/lib/actions/auth';

export const NewAccountForm = () => {
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const [state, formAction] = React.useActionState(signup, undefined);
	return (
		<Card className="w-full max-w-md">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl font-semibold tracking-tight">Crear cuenta</CardTitle>
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
				<form action={formAction} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Tu nombre</Label>
						<Input
							id="name"
							required
							placeholder="Nombres y apellidos"
							autoComplete="name"
							name="name"
							type="text"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							required
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
							required
							autoComplete="current-password"
							placeholder="********"
						/>
					</div>

					{state?.fieldError ? (
						<ul className="list-disc space-y-1 rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
						{Object.values(state.fieldError).map((err) => (
							<li className="ml-4" key={err}>
								{err}
							</li>
						))}
						</ul>
					) : state?.formError ? (
						<p className="rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
							{state?.formError}
						</p>
					) : null}

					<div>
						<Link href={'/login'}>
							<span className="p-0 text-xs font-medium underline-offset-4 hover:underline">
                				¿Ya tienes cuenta? Iniciar Sesión
							</span>
						</Link>
					</div>

					<SubmitButton className="w-full" aria-label="submit-btn">
            			Crear cuenta
					</SubmitButton>
					<Button variant="outline" className="w-full" asChild>
						<Link href="/">Cancelar</Link>
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};
