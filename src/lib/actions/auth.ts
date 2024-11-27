'use server';

import { signIn } from '@/server/auth';
import { db } from '@/server/db';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { SignupInput, signupSchema } from '../validations/auth';
import { users } from '@/server/db/schema';

export interface ActionResponse<T> {
	fieldError?: Partial<Record<keyof T, string | undefined>>;
	formError?: string;
  }

export async function authenticate (prevState: string | undefined, formData: FormData){
	try {
		await signIn('credentials', formData);
	} catch (error) {
		
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CallbackRouteError':
					return 'Invalid credentials.';
				default:
					return 'Something went wrong.';
			}
		}
		throw error;
	}
};


export async function signup(_: any, formData: FormData): Promise<ActionResponse<SignupInput>> {
	const obj = Object.fromEntries(formData.entries());
	const parsed = signupSchema.safeParse(obj);

	if (!parsed.success) {
		const err = parsed.error.flatten();
		return {
		  fieldError: {
			email: err.fieldErrors.email?.[0],
			password: err.fieldErrors.password?.[0],
		  },
		};
	}

	const { name, email, password } = parsed.data;

	const existingUser = await db.query.users.findFirst({
		where: (table, { eq }) => eq(table.email, email),
		columns: { email: true },
	});
	
	if (existingUser) {
		return {
		  formError: "Cannot create account with that email",
		};
	}
	const hashedPassword = await bcrypt.hash(password, 10); 
	await db.insert(users).values({
		name,
		email,
		password: hashedPassword,
	});

	return redirect("/verify-email");
}
