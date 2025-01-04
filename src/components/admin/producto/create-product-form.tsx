'use client';

import * as React from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { FileUploader } from '@/components/file-uploader';
import { useRouter } from 'next/navigation';
import { api } from '@/trpc/react';
import { useUploadFile } from '@/hooks/use-upload-file';
import  {  createProductSchema, type CreateProductSchema } from '@/app/admin/_lib/validations/product';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProduct } from '@/app/admin/_lib/actions/product.actions';
import { toast } from 'sonner';
import { type ProductFile } from '@/types';

export default function CreateProductForm() {
	const router = useRouter();
	const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>("")
	const [ loading, setLoading ] = React.useState(false);

	const { data: categories = [] } = api.admin.products.getCategories.useQuery(undefined, {
		staleTime: 1000 * 3600,
		refetchOnWindowFocus: false,
	});

	const {data: subcategories = [],isLoading: isLoadingSubcategories,} = api.admin.products.getSubcategories.useQuery(
		{ categoryId: selectedCategoryId },
		{
			enabled: !!selectedCategoryId,
			staleTime: 1000 * 3600,
			refetchOnWindowFocus: false,
		}
	);

	const { uploadThings, progresses, isUploading } = useUploadFile('imageUploader', { defaultUploadedFiles: [] });

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
		setSelectedCategoryId(value);
		form.setValue('categoryId', value);
		form.clearErrors('categoryId');
		form.setValue('subcategoryId', '');
	};

	const onSubmit = async (input: CreateProductSchema) => {
		setLoading(true);
		try {
			const uploadedFiles = await uploadThings(input.images ?? [])
			await createProduct({
				...input,
				images: JSON.stringify(uploadedFiles) as unknown as ProductFile[],
			});
			toast.success('Product created successfully!');
			router.push('/admin/products');
		} catch (error) {
			toast.error('Error creating product.');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-6">
				<div className="col-span-6 space-y-2">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nombre del producto</FormLabel>
								<FormControl>
									<Input {...field} type="text" placeholder="Nombre del producto" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="col-span-6 space-y-2">
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Descripción del producto</FormLabel>
								<FormControl>
									<Textarea {...field} placeholder="Descripción del producto" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="col-span-6 sm:col-span-3">
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Precio del producto</FormLabel>
								<FormControl>
									<Input {...field} type="number" placeholder="Precio del producto" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="col-span-6 sm:col-span-3">
					<FormField
						control={form.control}
						name="inventory"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Stock del producto</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="Stock del producto"
										{...field}
										// value={field.value?.toString() ?? ''}
										onChange={(e) =>
											field.onChange(e.target.value ? parseInt(e.target.value, 10) : '')}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="col-span-6 sm:col-span-3">
					<FormField
						control={form.control}
						name="categoryId"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Categoría del producto</FormLabel>
								<Select value={field.value} onValueChange={onCategoryChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Seleccione una categoría" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											{categories.map((category) => (
												<SelectItem key={category.id} value={category.id}>
													{category.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormDescription>Select the category for your product.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="col-span-6 sm:col-span-3">
					<FormField
						control={form.control}
						name="subcategoryId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Subcategory</FormLabel>
								<Select
									disabled={isLoadingSubcategories || subcategories.length < 1}
									onValueChange={field.onChange}
									value={field.value ?? ''}
								>
									<FormControl>
										<SelectTrigger>
											{isLoadingSubcategories ? (
												<div className="flex items-center space-x-2">
													<Icons.spinner className="animate-spin" />
													<span>Loading...</span>
												</div>
											) : (
												<SelectValue placeholder="Select a subcategory" />
											)}
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{subcategories.map((subcategory) => (
											<SelectItem key={subcategory.id} value={subcategory.id}>
												{subcategory.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormDescription>Select the subcategory for your product.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="col-span-6 space-y-2">
					<FormField
						control={form.control}
						name="images"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Imagenes</FormLabel>
								<FormControl>
									<FileUploader
										value={field.value ?? []}
										onValueChange={field.onChange}
										maxFiles={4}
										maxSize={4 * 1024 * 1024}
										progresses={progresses}
										disabled={isUploading}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit" className="w-fit" disabled={loading}>
					{loading && <Icons.spinner className="mr-2 size-4 animate-spin" aria-hidden="true" />}
					Add Product
					<span className="sr-only">Add Product</span>
				</Button>
			</form>
		</Form>
	);
}
