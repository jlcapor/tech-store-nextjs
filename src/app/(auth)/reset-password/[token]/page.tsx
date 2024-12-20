import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export const metadata = {
	title: 'Reset Password',
	description: 'Reset Password Page',
};

export default function ResetPasswordPage({
    params,
  }: {
    params: { token: string };
  }) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle>Restablecer contraseña</CardTitle>
          <CardDescription>Ingrese una nueva contraseña.</CardDescription>
        </CardHeader>
        <CardContent>
          
        </CardContent>
      </Card>
    );
  }
