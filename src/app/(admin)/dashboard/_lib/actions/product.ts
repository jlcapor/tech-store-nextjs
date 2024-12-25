"use server"

import { db } from "@/server/db";
import { products } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteProduct(input: { id: string}) {
    try {
        const product = await db.query.products.findFirst({
            columns: {
                id: true,
            },
            where: eq(products.id, input.id),
        })

        if (!product) {
            throw new Error("Product not found.")
        }
        await db.delete(products).where(eq(products.id, input.id))
        revalidatePath("/dashboard/products")
        return {
            data: null,
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error: "eeeeee",
        }
    }
}