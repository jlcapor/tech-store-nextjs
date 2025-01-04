'use client';

import * as React from 'react';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';

const CartDropdown = () => {
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const [activeTimer, setActiveTimer] = React.useState<NodeJS.Timeout | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = React.useState(false)
  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  React.useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  return (
    <div
      className="relative"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover>
        <PopoverButton className="h-full p-2 flex items-center justify-center">
          <Link
            href="/cart"
            className="flex items-center hover:text-primary-600 transition-colors"
            data-testid="nav-cart-link"
          >
            <ShoppingCart className="w-6 h-6 mr-1" />
            <span className="sr-only">Cart</span>
          </Link>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={React.Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden md:block absolute top-full mt-3 right-0 bg-white border border-gray-200 w-[420px] text-gray-900 z-50 rounded-none"
            data-testid="nav-cart-dropdown"
          >
            <div className="p-4 flex items-center justify-center border-b border-gray-200">
              <h3 className="text-lg font-semibold">Cart</h3>
            </div>
            {/* Add cart content here */}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  );
};

export default CartDropdown;

