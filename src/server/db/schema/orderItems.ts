import { generateId } from '@/lib/id';
import { decimal, integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { orders } from './orders';
import { products } from './products';
import { relations } from 'drizzle-orm';

export const orderItems = pgTable('order_items', {
	id: varchar('id', { length: 30 }).$defaultFn(() => generateId()).primaryKey(),
	orderId: varchar('order_id', { length: 30 }).references(() => orders.id).notNull(),
	productId: varchar('product_id', { length: 30 }).references(() => products.id).notNull(),
	quantity: integer('quantity').notNull(),
	price: decimal('price', { precision: 10, scale: 2 }).notNull(),
});

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
	order: one(orders, {
		fields: [ orderItems.orderId ],
		references: [ orders.id ],
	}),
	product: one(products, {
		fields: [ orderItems.productId ],
		references: [ products.id ],
	}),
}));
