import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, ButtonProps } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { Icons } from '@/components/icons'
import { Session } from 'next-auth'
import { cn } from '@/lib/utils'
import { Heart, LayoutDashboardIcon } from 'lucide-react'
import { SignOut } from './sing-out'

interface AuthDropdownProps extends React.ComponentPropsWithRef<typeof DropdownMenuTrigger>, ButtonProps {
  session: Session | null
}

export  function AuthDropdown({ session, className, ...props }: AuthDropdownProps) {
  if (!session?.user) {
    return (
      <Button variant="outline" size="icon" className={cn(className)} {...props} asChild>
        <Link href="/signin">
          <Icons.user/>
          <span className="sr-only">Iniciar de Sesión</span>
        </Link>
      </Button>
    );
  }

  const initials = `${session.user.name?.charAt(0) ?? ""}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className={cn("size-8 rounded-full", className)} {...props}>
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
          {session.user.role === "ADMIN" ? (
            <DropdownMenuItem asChild>
              <Link href="/admin/overview" className="flex items-center space-x-2.5">
                <LayoutDashboardIcon className="size-5" />
                <p className="text-sm">Dashboard</p>
              </Link>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem asChild>
            <Link href="/my-account" className="flex items-center space-x-2.5">
              <Icons.user className="size-5" />
              <p className="text-sm">Mi Perfil</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/favorites" className="flex items-center space-x-2.5">
              <Heart className="size-5" />
              <p className="text-sm">Mis Favoritos</p>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

