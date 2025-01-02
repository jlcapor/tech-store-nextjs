'use client';

import Link from 'next/link';
import { SidebarNavItem } from '@/types';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
    item: SidebarNavItem;
    isActive: boolean;
    onClick: () => void;
}

export default function SidebarItem({ item, isActive, onClick }: SidebarItemProps) {
    const Icon = Icons[item.icon ?? 'cube'];

    return (
        <Link href={item.href ?? '#'} onClick={onClick}>
            <span
                className={cn(
                    'group flex w-full items-center rounded-md border border-transparent px-2 py-2 hover:bg-muted hover:text-foreground',
                    isActive ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground',
                    item.disabled && 'pointer-events-none opacity-60'
                )}
            >
                <Icon className="mr-2 size-4" aria-hidden="true" />
                <span>{item.title}</span>
            </span>
        </Link>
    );
}