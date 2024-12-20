import { generateId } from '@/lib/id';
import { decimal, pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';
import { users } from './users';
import { lifecycleDates } from './utils';
import { relations } from 'drizzle-orm';
import { orderItems } from './orderItems';

export const orderStatusEnum = pgEnum('order_status', [ 
    'PENDIENTE',
    'ESPERANDO_PAGO',
    'PAGO_RECIBIDO',
    'COMPLETADO',
    'FALLIDO',
    'ENVIADO',
    'CANCELADO',
    'RECHAZADO',
    'REEMBOLSADO',
    'DISPUTADO'
]);

export const orders = pgTable('orders', {
	id: varchar('id', { length: 30 }).$defaultFn(() => generateId()).primaryKey(),
	userId: varchar('user_id', { length: 30 }).references(() => users.id).notNull(),
	status: orderStatusEnum('status').notNull().default('PENDIENTE'),
	total: decimal('total', { precision: 10, scale: 2 }).notNull().default('0'),
	...lifecycleDates,
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
	user: one(users, {
		fields: [ orders.userId ],
		references: [ users.id ],
	}),
	orderItems: many(orderItems)
}));

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
