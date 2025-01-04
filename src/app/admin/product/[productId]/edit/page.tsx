import UpdateProductForm from '@/components/admin/producto/update-product-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/server/db';
import { products } from '@/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

export default async function UpdateProductPage(props: { params: Promise<{ productId: string }> }) {
	const params = await props.params;
	const product = await db.query.products.findFirst({
		where: and(eq(products.id, params.productId)),
	});

	if (!product) {
		notFound();
	}
	return (
		<div className="flex flex-col items-center space-y-8">
			<Card className="w-full max-w-4xl p-4">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Update product</CardTitle>
					<CardDescription>Update a product in your store</CardDescription>
				</CardHeader>
				<CardContent>
					<UpdateProductForm product={product} />
				</CardContent>
			</Card>
		</div>
	);
}
