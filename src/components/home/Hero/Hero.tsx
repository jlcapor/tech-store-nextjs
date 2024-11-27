import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';



export const Hero = () => {
	return (
		<div className="mx-auto flex max-w-6xl flex-col gap-y-4 px-4 py-12 md:flex-row-reverse md:gap-x-4 md:px-8 lg:py-14">
			<div className="flex justify-center lg:mt-0 lg:col-span-5">
				<Image
					alt="Pet Image"
					loading="eager"
					priority={true}
					height={440}
					width={440}
					src="/hero/product-placeholder.webp"
					sizes="(max-width: 640px) 70vw, 450px"
				/>
			</div>
			<div className="place-self-center lg:col-span-7 px-4 text-center lg:text-left mt-5">
				<h1
					className="text-4xl font-extrabold tracking-tight lg:text-5xl"
				>
					Bienvenido a Pet Shop
				</h1>
				<p
					className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 sm:text-xl lg:text-lg xl:text-xl dark:text-gray-400"
				>
					Encuentra todo lo que necesitas para el cuidado y bienestar de tus mascotas.
				</p>
				<div
					className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start"
					
				>
					<Link href="/products" className={cn(buttonVariants())}>
						Explorar Productos
						<ArrowRight className="ml-2 h-5 w-5" />
					</Link>
					<Link href="/dashboard/stores" className={cn(buttonVariants({ variant: 'outline' }))}>
						Sell now
					</Link>
				</div>
			</div>
		</div>
	);
};
