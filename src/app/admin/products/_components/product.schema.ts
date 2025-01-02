import { z } from "zod"


export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  inventory: z.number(),
  rating: z.number(),
  createdAt: z.string(),

})

export type Product = z.infer<typeof productSchema>