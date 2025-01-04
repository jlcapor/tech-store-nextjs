'use client';

import { useSidebar } from '@/hooks/use-sidebar';
import DropdownUser from './dropdown-user';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function DashboardHeader() {
  const { isOpen, setIsOpen } = useSidebar();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-40 flex w-full border-b bg-background">
      <div className="flex flex-grow items-center justify-between px-4 h-14 md:px-6 2xl:px-11">
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="outline"
            onClick={toggleSidebar}
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            className="lg:hidden"
          >
            <Icons.menu className="w-6 h-6" aria-hidden="true" />
            <span className="sr-only">{isOpen ? "Close sidebar" : "Open sidebar"}</span>
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <nav className="flex items-center space-x-4">
            <DropdownUser />
          </nav>
        </div>
      </div>
    </header>
  );
}