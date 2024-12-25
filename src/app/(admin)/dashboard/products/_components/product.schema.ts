import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  inventory: z.number(),
  rating: z.number(),
  createdAt: z.date(),

})

export type Product = z.infer<typeof productSchema>