'use client';

import { useSidebar } from '@/hooks/use-sidebar';
import React, { useEffect, useCallback, useRef } from 'react';

export default function DashboardSidebar() {
    const { isOpen, setIsOpen } = useSidebar();
    const sidebarRef = useRef<HTMLDivElement>(null);

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

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
            <aside
                ref={sidebarRef}
                className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-black lg:translate-x-0 ${isOpen
                    ? 'translate-x-0'
                    : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
                    fff
                    <button onClick={() => setIsOpen(!isOpen)} aria-controls="sidebar" className="block lg:hidden bg-white">
                        <svg
                            className="fill-current"
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                                fill=""
                            />
                        </svg>
                    </button>
                </div>
                <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                    <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
                        {/* Navigation links */}
                    </nav>
                </div>
            </aside>
        </>
    );
}