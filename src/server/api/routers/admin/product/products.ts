import { z } from 'zod';
import { createTRPCRouter, adminProcedure } from '@/server/api/trpc';
import { categories, products, subcategories } from '@/server/db/schema';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';

export const productsAdminRouter = createTRPCRouter({
	getProductById: adminProcedure.input(z.object({ productId: z.string() })).query(async ({ ctx, input }) => {
		try {
			const product = await ctx.db
				.select()
				.from(products)
				.where(eq(products.id, input.productId))
				.then((rows) => rows[0]);
			if (!product) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Product not found',
				});
			}
			return product;
		} catch (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to fetch product',
			});
		}
	}),
	getCategories: adminProcedure.query(async ({ ctx }) => {
		try {
			return await ctx.db.select().from(categories);
		} catch (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to fetch categories',
			});
		}
	}),

	getSubcategories: adminProcedure.input(z.object({ categoryId: z.string() })).query(async ({ ctx, input }) => {
		try {
			return await ctx.db.select().from(subcategories).where(eq(subcategories.categoryId, input.categoryId));
		} catch (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to fetch subcategories',
			});
		}
	}),
});
