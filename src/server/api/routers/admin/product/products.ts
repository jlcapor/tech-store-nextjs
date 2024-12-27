import { z } from 'zod';
import { createTRPCRouter, adminProcedure } from '@/server/api/trpc';
import { categories, subcategories } from '@/server/db/schema';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';

export const productsAdminRouter = createTRPCRouter({
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

	getSubcategories: adminProcedure
    .input(z.object({ categoryId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db
          .select()
          .from(subcategories)
          .where(eq(subcategories.categoryId, input.categoryId))
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch subcategories",
        })
      }
    }),
});
