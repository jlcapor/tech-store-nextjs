import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { api } from "@/trpc/react"
import { useUploadFile } from "@/hooks/use-upload-file"
import { createProduct } from "@/app/admin/_lib/actions/product.actions"
import { createProductSchema, CreateProductSchema } from "../_lib/validations/product"
import { ProductFile } from "@/types"

export function useCreateProductForm() {
  const router = useRouter()
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>("")
  const [loading, setLoading] = React.useState(false)

  const { data: categories = [] } = api.admin.products.getCategories.useQuery(undefined, {
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  })

  const { data: subcategories = [], isLoading: isLoadingSubcategories } = api.admin.products.getSubcategories.useQuery(
    { categoryId: selectedCategoryId },
    { 
      enabled: !!selectedCategoryId,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    }
  )

  const { uploadThings, progresses, isUploading } = useUploadFile(
    "imageUploader",
    { defaultUploadedFiles: [] }
  )

  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      inventory: NaN,
      categoryId: "",
      subcategoryId: "",
      images: [],
    }
  })

  const onCategoryChange = (value: string) => {
    setSelectedCategoryId(value)
    form.setValue("categoryId", value)
    form.clearErrors("categoryId")
    form.setValue("subcategoryId", "")
  }

  const onSubmit = async (input: CreateProductSchema) => {
    setLoading(true)
    try {
      const uploadedFiles = await uploadThings(input.images ?? [])
      await createProduct({
        ...input,
        images: JSON.stringify(uploadedFiles) as unknown as ProductFile[],
      })
      toast.success("Product created successfully!")
      router.push("/admin/products")
    } catch (error) {
      toast.error("Error creating product.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    form,
    categories,
    subcategories,
    isLoadingSubcategories,
    loading,
    isUploading,
    progresses,
    onCategoryChange,
    onSubmit,
  }
}

