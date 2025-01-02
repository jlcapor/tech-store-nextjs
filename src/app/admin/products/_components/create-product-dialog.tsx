"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { createProductSchema, CreateProductSchema } from "../../_lib/validations/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "@/components/icons";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

export function CreateProductkDialog({
    onOpenChange,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog>) {
    const router = useRouter()
    const [isCreatePending, startCreateTransaction] = React.useTransition()
    const isDesktop = useMediaQuery("(min-width: 640px)")
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

    const onSubmit = async (input: CreateProductSchema) => {
        startCreateTransaction(async () => {
            onOpenChange?.(false)
            form.reset()
        })
    }

    if (isDesktop) {
        return (
            <Dialog
                onOpenChange={(open) => {
                    if (!open) {
                        form.reset()
                    }
                    onOpenChange?.(open)
                }}
                {...props}
            >
                <DialogTrigger  asChild>
                    <Button size="sm">Create store</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Create a new product</DialogTitle>
                        <DialogDescription>
                            Create a new store to manage your products
                        </DialogDescription>
                        {/* formulario */}
                        <DialogFooter className="pt-4">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={isCreatePending}
                            >
                                {isCreatePending && (
                                <Icons.spinner
                                    className="mr-2 size-4 animate-spin"
                                    aria-hidden="true"
                                />
                                )}
                                Add store
                            </Button>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        )
    }
    return (
        <Drawer
            onOpenChange={(open) => {
                if (!open) {
                    form.reset()
                }
                onOpenChange?.(open)
          }}
          {...props}
        >
            <DrawerTrigger asChild>
                <Button size="sm">Create store</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Create a new store</DrawerTitle>
                    <DrawerDescription>
                        Create a new store to manage your products
                    </DrawerDescription>
                </DrawerHeader>
                {/* formulario */}
                <DrawerFooter className="flex-col-reverse px-0">
                    <DrawerClose asChild>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </DrawerClose>
                    <Button
                        type="submit"
                        disabled={isCreatePending}
                    >
                        {isCreatePending && (
                            <Icons.spinner
                            className="mr-2 size-4 animate-spin"
                            aria-hidden="true"
                            />
                        )}
                        Add store
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}