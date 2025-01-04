import { relations } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { products } from "./products";

export const productImages = pgTable('product_images', {
    id: varchar('id', { length: 255 }).primaryKey(),
    name: varchar('name').notNull(),
    url: text('url').notNull(),
    productId: varchar('product_id', { length: 30 }).references(() => products.id, { onDelete: "cascade" }).notNull(),
});

export const imageProductsRelations = relations(productImages, ({ one }) => ({
    product: one(products, {
        fields: [productImages.productId],
        references: [products.id],
    }),
}))

export type ProductImages = typeof productImages.$inferSelect;
export type NewProductImages = typeof productImages.$inferInsert;