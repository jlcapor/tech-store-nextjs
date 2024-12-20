'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { cn, isMacOs } from '@/lib/utils';
import { CommandDialog, CommandEmpty, CommandInput, CommandList } from '../ui/command';
import { DialogTitle } from '../ui/dialog';

export function ProductsCombobox() {
	const router = useRouter();
	const [ open, setOpen ] = React.useState(false);
	const [ query, setQuery ] = React.useState('');
	const debouncedQuery = useDebounce(query, 300);
	const [ loading, setLoading ] = React.useState(false);


	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
		  if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault()
			setOpen((open) => !open)
		  }
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [])

	const onSelect = React.useCallback((callback: () => unknown) => {
		setOpen(false)
		callback()
	}, [])

	return (
		<div>
			<Button
				variant="outline"
				className="relative size-9 p-0 xl:h-10 xl:w-72 xl:justify-start xl:px-3 xl:py-2"
				onClick={() => setOpen(true)}
			>
				<Search className="size-6 xl:mr-2" aria-hidden="true" />
				<span className="hidden xl:inline-flex">Search products...</span>
				<span className="sr-only">Search products</span>
				<kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
					<abbr title={isMacOs() ? 'Command' : 'Control'}>{isMacOs() ? '⌘' : 'Ctrl+'}</abbr>
					K
				</kbd>
			</Button>
			<CommandDialog
				open={open}
				onOpenChange={(open) => {
					setOpen(open);
					if (!open) {
						setQuery('');
					}
				}}
			>
				<CommandInput placeholder="Search products..." value={query} onValueChange={setQuery} />
				<DialogTitle className="sr-only">Search products</DialogTitle>
				<CommandList>
					<CommandEmpty 
						className={cn(loading ? 'hidden' : 'py-6 text-center text-sm')}
					>
						No products found.
					</CommandEmpty>
					
				</CommandList>
			</CommandDialog>
		</div>
	);
}
