'use client';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { MonitorSmartphone } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'Tienda' },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="hidden gap-6 lg:flex">
      <Link href="/" className="hidden items-center space-x-2 lg:flex">
        <MonitorSmartphone className="h-7 w-7" aria-hidden="true" />
        <span className="hidden text-xl font-bold lg:inline-block">
          {siteConfig.name}
        </span>
        <span className="sr-only">Home</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname === href || (href !== '/' && pathname?.startsWith(href))
                ? 'text-foreground'
                : 'text-foreground/80'
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

