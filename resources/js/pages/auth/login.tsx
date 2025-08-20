import TextLink from '@/components/auth/text-link';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="" description="">
            <Head title="Iniciar sesión" />

            <form onSubmit={submit} className="mx-auto w-full max-w-sm px-5 pt-2 pb-4">
                <div className="mb-4">
                    <Label htmlFor="email" className='text-[17px]'>Usuario</Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoFocus
                        autoComplete="email"
                        className="mt-1 h-10"
                        placeholder="correo@ejemplo.com"
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="mb-4">
                    <Label htmlFor="password" className='text-[17px]'>Contraseña</Label>
                    <Input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        autoComplete="current-password"
                        className="mt-1 h-10"
                        placeholder="•••••••••••••"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        id="remember"
                        name="remember"
                        checked={data.remember}
                        onChange={() => setData('remember', !data.remember)}
                        className="mr-2"
                    />
                    <Label htmlFor="remember" className='text-[16px]'>Recuérdame</Label>
                </div>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={processing}
                        className="mx-auto flex min-w-4/5 items-center justify-center gap-2 rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-70"
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Iniciar sesión
                    </Button>
                </div>
            </form>

            {canResetPassword && (
                <div className="mt-4 text-center text-sm text-gray-600">
                    <TextLink href={route('password.request')}>¿Olvidaste tu contraseña?</TextLink>
                </div>
            )}

            {status && <div className="mt-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
