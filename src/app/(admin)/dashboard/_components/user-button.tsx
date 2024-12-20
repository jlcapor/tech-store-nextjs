import * as React from 'react';
import { auth } from "@/server/auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EqualApproximatelyIcon, LayoutDashboardIcon, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Icons } from '@/components/icons';

const SignoutConfirmation = React.lazy(() => import('./sign-out-confirmation'));

export default async function UserButton() {
    const session = await auth()
    if (!session?.user) return null

    const initials = `${session.user.name?.charAt(0) ?? ""}`;

    return (
      <div className="flex items-center gap-2">
        <span className="hidden text-sm sm:inline-flex">
          {session.user.email}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="relative h-8 w-8 size-8 rounded-full">
              <Avatar className="size-9">
                <AvatarImage src={session.user.image ?? ""} alt={session?.user.name ?? ""} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <div className="flex flex-col space-y-1 leading-none">
                  {session.user.name && <p className="font-medium">{session.user.name}</p>}
                  {session.user.email && (
                    <p className="w-[200px] truncate text-sm text-muted-foreground">{session.user.email}</p>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex items-center space-x-2.5">
                  <Icons.dashboard className="size-5" />
                  <p className="text-sm">Dashboard</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  href="/settings" 
                  className="flex items-center space-x-2.5"
                >
                  <Icons.settings className="size-5" />
                  <p className="text-sm">Settings</p>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuLabel className="flex items-center">
              <LogOut  className="mr-2 size-5" aria-hidden="true" />
              <SignoutConfirmation />
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }