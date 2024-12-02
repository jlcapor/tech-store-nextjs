import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Heart } from 'lucide-react';

interface FavoritesButtonProps {
	className?: string,
}

export function FavoritesButton({ className }: FavoritesButtonProps) {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={300}>
				<TooltipTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className={cn(
							'cursor-pointer items-center justify-center fill-none transition-transform hover:scale-105',
							className
						)}
						asChild
					>
						<Link href="/favorites" aria-label="Ver favoritos">
							<Heart className="h-[1.2rem] w-[1.2rem]" />
							<span className="sr-only">Favoritos</span>
						</Link>
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom" align="center">
					<p>Ver favoritos</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
