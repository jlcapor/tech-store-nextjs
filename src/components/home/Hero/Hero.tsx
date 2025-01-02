import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => {
    return (
        <div className="relative mx-auto flex max-w-7xl flex-col gap-y-8 px-6 py-16 md:flex-row-reverse md:gap-x-8 md:px-12 lg:py-20">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500 to-purple-600 opacity-50"></div>
            <div className="flex justify-center lg:mt-0 lg:col-span-5">
                <Image
                    alt="Pet Image"
                    loading="eager"
                    priority={true}
                    height={480}
                    width={480}
                    src="/hero/product-placeholder.webp"
                    sizes="(max-width: 640px) 70vw, 480px"
                    className="rounded-lg shadow-lg"
                />
            </div>
            <div className="place-self-center lg:col-span-7 px-4 text-center lg:text-left mt-5">
                <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl text-gray-900 dark:text-white">
                    Bienvenido a Pet Shop
                </h1>
                <p className="max-w-2xl mb-8 font-light text-gray-600 lg:mb-10 sm:text-xl lg:text-lg xl:text-xl dark:text-gray-300">
                    Encuentra todo lo que necesitas para el cuidado y bienestar de tus mascotas.
                </p>
                <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center lg:justify-start">
                    <Link href="/products" className={cn(buttonVariants(), "flex items-center justify-center")}>
                        Explorar Productos
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link href="/dashboard/stores" className={cn(buttonVariants({ variant: 'outline' }), "flex items-center justify-center")}>
                        Vender ahora
                    </Link>
                </div>
            </div>
        </div>
    );
};