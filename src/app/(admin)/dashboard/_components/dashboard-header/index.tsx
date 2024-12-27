'use client';

import { useSidebar } from '@/hooks/use-sidebar';
import DropdownUser from './dropdown-user';

export default function DashboardHeader() {
  const { setIsOpen } = useSidebar();
  return (
    <header className="sticky top-0 z-40 flex w-full border-b bg-background">
      <div className="flex flex-grow items-center justify-between px-4 py-2 shadow-sm md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button onClick={() => setIsOpen(true)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <DropdownUser />
          </nav>
        </div>
      </div>
    </header>
  );
}