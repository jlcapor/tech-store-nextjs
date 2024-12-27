import { pgTable, varchar, text } from 'drizzle-orm/pg-core';
import { generateId } from '@/lib/id';

export const brands = pgTable('brands', {
  id: varchar('id', { length: 30 }).$defaultFn(() => generateId()).primaryKey(),
  name: text('name').notNull(), 
  slug: text("slug").notNull().unique(), 
  description: text('description'),  
  logo: varchar('logo', { length: 255 }), 
});

export type Brand = typeof brands.$inferSelect;
export type NewBrand = typeof brands.$inferInsert;
