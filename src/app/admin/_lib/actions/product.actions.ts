'use server';

import { db } from '@/server/db';
import { products } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { CreateProductInput } from '../validations/product';
import { getErrorMessage } from '@/lib/handle-error';
import { ProductFile } from '@/types';

export async function createProduct(input: CreateProductInput) {
    try {
        const productWithSameName = await db.query.products.findFirst({
            columns: {
                id: true,
            },
            where: eq(products.name, input.name),
        });

        if (productWithSameName) {
            throw new Error('Product name already taken.');
        }
        await db.insert(products).values({
            ...input,
            images: JSON.stringify(input.images) as unknown as ProductFile[],
        });
    } catch (error) {
        return {
            data: null,
            error: getErrorMessage(error),
        };
    }
	revalidatePath('/admin/products');
}

export async function deleteProduct(input: { id: string }) {
    try {
        const product = await db.query.products.findFirst({
            columns: {
                id: true,
            },
            where: eq(products.id, input.id),
        });

        if (!product) {
            throw new Error('Product not found.');
        }
        await db.delete(products).where(eq(products.id, input.id));
        revalidatePath('/admin/products');
        return {
            success: true,
            message: 'Product created successfully',
        }
    } catch (error) {
        return {
            success: false,
            error: getErrorMessage(error),
        };
    }
}

export async function deleteProducts(input: { ids: string[] }) {
    try {
        
    } catch (error) {
        return {
            data: null,
            error: getErrorMessage(error),
        };
    }
}