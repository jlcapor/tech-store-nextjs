'use client';

import { siteConfig } from '@/config/site';
import { useSidebar } from '@/hooks/use-sidebar';
import { MonitorSmartphone } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useCallback, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useSelectedLayoutSegments } from 'next/navigation';
import { type SidebarNavItem } from '@/types';
import SidebarItem from './sidebar-Item';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DashboardSidebar() {
    const { isOpen, setIsOpen } = useSidebar();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const segments = useSelectedLayoutSegments();
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const sidebarNav: SidebarNavItem[] = [
        {
            title: "Dashboard",
            href: '/admin/overview',
            icon: "dashboard",
            isActive: segments.includes("overview"),
            items: []
        },
        {
            title: "Pedidos",
            href: '/admin/orders',
            icon: "cart",
            isActive: segments.includes("orders"),
            items: []
        },
        {
            title: "Products",
            href: '/admin/products',
            icon: "cube",
            isActive: segments.includes("products"),
            items: []
        },
        {
            title: "Clientes",
            href: '/admin/customers',
            icon: "user",
            isActive: segments.includes("customers"),
        }
    ];

    const handleResize = useCallback(() => {
        if (window.innerWidth >= 1024 && isOpen) {
            setIsOpen(false);
        }
    }, [isOpen, setIsOpen]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
            setIsOpen(false);
        }
    }, [isOpen, setIsOpen]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleResize, handleClickOutside]);

    const toggleSidebar = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen, setIsOpen]);

    const handleItemClick = (title: string) => {
        setActiveItem(title);
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                    role="presentation"
                />
            )}
            <aside
                ref={sidebarRef}
                className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-800 lg:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out`}
                aria-label="Dashboard Sidebar"
            >
                <div className="flex h-[3.56rem] items-center justify-between border-b bg-background gap-2 px-6 py-5 lg:py-6">
                    <Link href="/" className="flex items-center justify-center space-x-2">
                        <MonitorSmartphone className="h-7 w-7" aria-hidden="true" />
                        <span className="text-xl font-bold">{siteConfig.name}</span>
                        <span className="sr-only">Home</span>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
                        className="lg:hidden"
                    >
                        <Icons.x className="w-6 h-6" aria-hidden="true" />
                    </Button>
                </div>
                <ScrollArea className="h-[calc(100vh-8rem)] px-3 py-2.5 lg:px-5">
                    <SidebarNav items={sidebarNav} className="p-1 pt-4">
                        {sidebarNav.map((item) => (
                            <SidebarItem
                                key={item.title}
                                item={item}
                                isActive={activeItem === item.title}
                                onClick={() => handleItemClick(item.title)}
                            />
                        ))}
                    </SidebarNav>
                </ScrollArea>
            </aside>
        </>
    );
}