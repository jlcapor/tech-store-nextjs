'use client';

import * as React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';

export const SearchBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = React.useState(() => searchParams.get('q') || '');
  const debouncedSearchText = useDebounce(searchText, 300);

  const updateSearchParams = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    return params.toString();
  };

  React.useEffect(() => {
    if (debouncedSearchText !== searchParams.get('q')) {
      const newParams = updateSearchParams(debouncedSearchText);
      if (pathname === '/search') {
        router.replace(`/search?${newParams}`, { scroll: false });
      }
    }
  }, [debouncedSearchText, pathname, router, searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedSearchText = searchText.trim();
    if (trimmedSearchText) {
      const newParams = updateSearchParams(trimmedSearchText);
      router.push(`/search?${newParams}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative my-2 w-full lg:w-80">
      <Label htmlFor="search" className="sr-only">
        Search for products
      </Label>
      <div className="relative">
        <Input
          id="search"
          name="searchText"
          type="search"
          placeholder="Search for products..."
          autoComplete="off"
          className="w-full rounded-md border border-neutral-300 bg-transparent bg-white px-4 py-2 pr-10 text-sm text-black placeholder:text-neutral-500  [&::-webkit-search-cancel-button]:p-1 [&::-webkit-search-cancel-button]:mr-2"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          type="submit"
          variant="secondary"
          size="icon"
          className="absolute right-0 top-0 flex h-full cursor-pointer items-center rounded-r bg-main-red-barn px-"
          aria-label="Submit search"
        >
          <SearchIcon className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

