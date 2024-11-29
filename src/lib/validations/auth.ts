import { z } from 'zod';

export const signupSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(1, 'Name is required')
		.max(32, 'Name must be less than 32 characters'),
	email: z.string().email('Please enter a valid email'),
	password: z.string().min(1, 'Please provide your password.').max(255),
});

export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
	email: z.string().email({
		message: 'Please enter a valid email address',
	}),
	password: z
		.string()
		.min(8, {
			message: 'Password must be at least 8 characters long',
		})
		.max(100, {
			message: 'Password must be at most 100 characters long',
		}),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
	email: z.string().email(),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
	token: z.string().min(1, 'Invalid token'),
	password: z.string().min(8, 'Password is too short').max(255),
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

//https://www.youtube.com/watch?v=vkV4wApku5s
