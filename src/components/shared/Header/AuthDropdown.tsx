import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {SignOut } from './AuthActions';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { Session } from 'next-auth';

interface AuthDropdownProps {
    session: Session,
}

export default async function AuthDropdown({ session }: AuthDropdownProps) {
	const initials = `${session.user.name?.charAt(0) ?? ""}`
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary" className="relative h-8 w-8 rounded-full">
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
								<p className="w-[200px] truncate text-sm text-muted-foreground">
									{session.user.email}
								</p>
							)}
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/my-account" className="flex items-center space-x-2.5">
                            <Icons.user className="size-5" />
                            <p className="text-sm">Perfil</p>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <SignOut />
                </DropdownMenuItem>
            </DropdownMenuContent>
		</DropdownMenu>
	);
}
