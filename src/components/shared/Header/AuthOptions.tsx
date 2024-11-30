'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation'; // Importar useRouter de Next.js
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { UserRound } from 'lucide-react';

export default function AuthOptions() {
	const [ open, setOpen ] = React.useState(false);
	const router = useRouter(); 

	
	const handleNavigation = (path: string) => {
		setOpen(false);
		router.push(path); 
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon">
					<UserRound className="h-12 w-12" aria-hidden="true" />
					<span className="sr-only">Account menu</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-40 p-2" align="end">
				<div className="flex flex-col gap-2">
					<Button
						variant="default"
						onClick={() => handleNavigation('/signin')} // Redirige a /login
					>
						Iniciar sesión
					</Button>
					<Button
						variant="outline"
						onClick={() => handleNavigation('/signup')} // Redirige a /register
					>
						Registrarse
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
