import { TriangleAlertIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import React from 'react';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/loading-button';
import { Icons } from '@/components/icons';

const SignoutConfirmation = () => {
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSignout = async () => {
        setIsLoading(true);
        try {
            await signOut({ callbackUrl: `${window.location.origin}/?redirect=false` });
        } catch (error) {
            if (error instanceof Error) {
                toast(error.message, {
                    icon: <TriangleAlertIcon className="h-4 w-4 text-destructive" />,
                });
            }
        } finally {
            setOpen(false);
            setIsLoading(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className="px-2 py-1.5 text-sm text-muted-foreground outline-none" asChild>
                <Button
				     variant="outline"
					 size="sm"
					className="flex items-center gap-2 w-full"
				>
                    <Icons.logout className="h-4 w-4" />
                    Sign out
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-xs">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">Desconectar</AlertDialogTitle>
                    <AlertDialogDescription>¿Estás seguro que deseas cerrar sesión?</AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <LoadingButton loading={isLoading} onClick={handleSignout}>
                        Cerrar sesion
                    </LoadingButton>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SignoutConfirmation;