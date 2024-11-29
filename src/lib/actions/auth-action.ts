'use server';

import { signIn } from '@/server/auth';
import { db } from '@/server/db';
import { AuthError } from 'next-auth';
import { loginSchema, signupSchema } from '../validations/auth';
import { users } from '@/server/db/schema';
import { z } from 'zod';
import bcrypt from 'bcrypt';


export async function authenticateAction(values: z.infer<typeof loginSchema>) {
	try {
		await signIn("credentials", {
			email: values.email,
			password: values.password,
			redirect: false,
		});
		return { success: true };
	} catch (error) {
		if (error instanceof AuthError) {
			return { error: error.cause?.err?.message };
		}
		return { error: "error 500" };
	}

	
}

export async function signupAction(values: z.infer<typeof signupSchema>) {
	
	try {
		// Validar datos con el esquema de Zod 
		const validatedFields  = signupSchema.safeParse(values);
		if (!validatedFields.success) {
			return {
				error: "Invalid data", // Aquí se utiliza 'error' en lugar de 'errors'
			};
		}

		const { name, email, password } = validatedFields.data;

		// Verificar si el usuario ya existe
		const existingUser = await db.query.users.findFirst({
			where: (table, { eq }) => eq(table.email, email),
			columns: { email: true },
		});

		// Si el usuario ya existe, devolver el error
		if (existingUser) {
			return {
				error: 'Ya existe una cuenta asociada con este correo electrónico',
			};
		}

		// Encriptar la contraseña y registrar al nuevo usuario
		const hashedPassword = await bcrypt.hash(password, 10);
		await db.insert(users).values({
			name,
			email,
			password: hashedPassword,
		});

		// Devolver un éxito si todo va bien
		return { error: null};
	} catch (error) {
		// Manejo de errores adicionales
		if (error instanceof AuthError) {
			return { error: error.cause?.err?.message };
		}
		return { error: "error 500" }; // Mensaje de error genérico
	}
}


//