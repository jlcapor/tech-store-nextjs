import { createTRPCRouter } from "@/server/api/trpc";
import { productsAdminRouter } from "./product/products";

export const adminRouter = createTRPCRouter({
    products: productsAdminRouter,
});