'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { UserRound } from 'lucide-react';

export default function AuthOptions() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleNavigation = React.useCallback((path: string) => {
    setOpen(false);
    router.push(path);
  }, [router]);

  const handleMouseEnter = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(true);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 100); 
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label="Menú de cuenta"
        >
          <UserRound className="h-6 w-6" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-40 p-2" 
        align="end"
        ref={popoverRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => handleNavigation('/signin')}
          >
            Iniciar sesión
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNavigation('/signup')}
          >
            Registrarse
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

