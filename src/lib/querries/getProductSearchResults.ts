import { db } from '@/server/db';
import { categories, products, subcategories } from '@/server/db/schema';
import { or } from 'drizzle-orm';


export async function getProductSearchResults() {
	const results = await db
		.select({
			id: products.id,
			name: products.name,
			description: products.description,
			images: products.images,
			category: categories.name,
            subcategory: subcategories.name,
            price: products.price,
            inventory: products.inventory,
            rating: products.rating,
		})
		.from(products)
		.where(or());
}
