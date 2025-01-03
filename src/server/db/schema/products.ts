import { relations } from 'drizzle-orm';
import { 
	decimal, 
	index, 
	integer, 
	pgEnum, 
	pgTable, 
	text, 
	varchar 
} from 'drizzle-orm/pg-core';

import { generateId } from '@/lib/id';

import { categories } from './categories';
import { subcategories } from './subcategories';
import { productTags } from './tags';
import { productVariants } from './variants';
import { orderItems } from './orderItems';
import { lifecycleDates } from './utils';
import { productImages } from './productImages';


export const productStatusEnum = pgEnum('product_status', [ 'active', 'draft', 'archived' ]);

export const products = pgTable(
	'products',
	{
		id: varchar('id', { length: 30 }).$defaultFn(() => generateId()).primaryKey(), // prefix_ + nanoid (12)
		name: text('name').notNull(),
		description: text('description'),
		categoryId: varchar('category_id', { length: 30 })
			.references(() => categories.id, { onDelete: 'cascade' })
			.notNull(),
		subcategoryId: varchar('subcategory_id', { length: 30 }).references(() => subcategories.id, {
			onDelete: 'cascade',
		}),

		price: decimal('price', { precision: 10, scale: 2 }).notNull().default('0'),
		originalPrice: decimal('original_price', {
			precision: 10,
			scale: 2,
		}).default('0'),
		inventory: integer('inventory').notNull().default(0),
		rating: integer('rating').notNull().default(0),
		status: productStatusEnum('status').notNull().default('active'),
		...lifecycleDates,
	},
	(table) => ({
		categoryIdIdx: index('products_category_id_idx').on(table.categoryId),
		subcategoryIdIdx: index('products_subcategory_id_idx').on(table.subcategoryId),
	})
);



export const productsRelations = relations(products, ({ one, many }) => ({
	category: one(categories, {
		fields: [ products.categoryId ],
		references: [ categories.id ],
	}),
	subcategory: one(subcategories, {
		fields: [ products.subcategoryId ],
		references: [ subcategories.id ],
	}),
	imageProducts: many(productImages, { relationName: 'productImages' }),
	variants: many(productVariants, { relationName: 'productVariants' }),
	tags: many(productTags, { relationName: 'productTags' }),
	ordersItems: many(orderItems, { relationName: 'orderProducts' })
}));

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
