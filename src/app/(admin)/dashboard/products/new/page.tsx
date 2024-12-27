import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CreateProductForm from "./_components/create-product-form"

export default function CreateProductPage() {
  return (
    <div className="flex flex-col items-center space-y-8">
      <Card className="w-full max-w-4xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Crear producto</CardTitle>
          <CardDescription>Crea un nuevo producto para tu tienda</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateProductForm />
        </CardContent>
      </Card>
    </div>
  )
}

