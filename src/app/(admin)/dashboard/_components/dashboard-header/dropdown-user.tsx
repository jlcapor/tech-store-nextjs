import * as React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession, signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { DropdownMenuShortcut } from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/icons';
import { toast } from 'sonner';
import { TriangleAlertIcon } from 'lucide-react';

export default function DropdownUser() {
    const { data: session } = useSession();

    if (!session?.user) return null;
    const initials = `${session.user.name?.charAt(0) ?? ""}`;

    const handleSignout = async () => {
        try {
            await signOut({ callbackUrl: `${window.location.origin}/?redirect=false` });
        } catch (error) {
            if (error instanceof Error) {
                toast(error.message, {
                    icon: <TriangleAlertIcon className="h-4 w-4 text-destructive" />,
                });
            }
        }
    };

    return (
        <div className="items-center shrink-0 space-x-10 space-x-reverse">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <MenuButton className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                        <div className="relative flex gap-2 items-center cursor-pointer">
                            <Avatar className="size-9">
                                <AvatarImage src={session.user.image ?? ""} alt={session?.user.name ?? ""} />
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                        </div>
                    </MenuButton>
                </div>
                <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <MenuItems
                        as="div"
                        className="absolute right-0 top-10 mt-2 w-64 rounded-xl border bg-white py-1 shadow-sm focus:outline-none dark:border-gray-700 dark:bg-black"
                    >
                        <MenuItem
                            as="div"
                            className="m-2 flex items-center rounded-lg px-4 py-2 text-sm text-gray-700"
                        >
                            <div className="flex flex-col space-y-1">
                                <div className="flex flex-col space-y-1 leading-none">
                                    {session.user.name && <p className="font-medium">{session.user.name}</p>}
                                    {session.user.email && (
                                        <p className="w-[200px] truncate text-sm text-muted-foreground">{session.user.email}</p>
                                    )}
                                </div>
                            </div>
                        </MenuItem>
                        <div className="divider" />
                        <MenuItem
                           as="div"
                           className={({ active }: { active: boolean }) =>
                             cn({ "dropdown-active": active }, "menu-item ")
                           }
                        >
                            <Link
                                href="/account/dashboard"
                                className="flex items-center gap-1"
                            >
                                <Icons.user className="mr-1 h-4 w-4" aria-hidden="true" />
                                Account
                                <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                            </Link>
                        </MenuItem>
                        <MenuItem
                            as="div"
                            className={({ active }: { active: boolean }) =>
                               cn({ "dropdown-active": active }, "menu-item flex items-center gap-1")
                            }
                            onClick={handleSignout}
                        >
                            <Icons.logout className="mr-1 h-4 w-4" aria-hidden="true"/>
                            <span>Log out</span>
                        </MenuItem>
                    </MenuItems>
                </Transition>
            </Menu>
        </div>
    );
}