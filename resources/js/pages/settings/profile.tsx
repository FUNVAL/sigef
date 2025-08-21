import { type BreadcrumbItem } from '@/types';
import { type ProfileForm, type ProfileProps } from '@/types/profile';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AccessControlLayout from '@/layouts/access-control/layout';
import AppLayout from '@/layouts/app-layout';
import { settingsNavItems } from '@/lib/consts/settings-nav-items';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Configuración de perfil',
        href: '/settings/profile',
    },
];

export default function Profile({ user, mustVerifyEmail, status, enums }: ProfileProps) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<ProfileForm>(getProfileInitialData(user));

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} menuOptions={settingsNavItems}>
            <Head title="Configuración de perfil" />

            <AccessControlLayout
                headings={{
                    title: 'Configuración de perfil',
                    description: 'Actualiza tu información personal y preferencias de cuenta.',
                }}
            >
                <div className="w-full space-y-8">
                    <form onSubmit={submit} className="space-y-8">
                        {/* Datos personales */}
                        <div className="space-y-6 border-b pb-6">
                            <HeadingSmall title="Información personal" description="Actualiza tu información personal básica" />
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstname">Primer Nombre</Label>
                                    <Input
                                        id="firstname"
                                        value={data.firstname}
                                        onChange={(e) => setData('firstname', e.target.value)}
                                        required
                                        placeholder="Primer nombre"
                                    />
                                    <InputError message={errors.firstname} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="middle_name">Segundo Nombre</Label>
                                    <Input
                                        id="middle_name"
                                        value={data.middle_name}
                                        onChange={(e) => setData('middle_name', e.target.value)}
                                        placeholder="Segundo nombre (opcional)"
                                    />
                                    <InputError message={errors.middle_name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="lastname">Primer Apellido</Label>
                                    <Input
                                        id="lastname"
                                        value={data.lastname}
                                        onChange={(e) => setData('lastname', e.target.value)}
                                        required
                                        placeholder="Primer apellido"
                                    />
                                    <InputError message={errors.lastname} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="second_lastname">Segundo Apellido</Label>
                                    <Input
                                        id="second_lastname"
                                        value={data.second_lastname}
                                        onChange={(e) => setData('second_lastname', e.target.value)}
                                        placeholder="Segundo apellido (opcional)"
                                    />
                                    <InputError message={errors.second_lastname} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Correo Electrónico</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        placeholder="correo@ejemplo.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="gender">Género</Label>
                                    <Select value={String(data.gender)} onValueChange={(value) => setData('gender', Number(value))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione género" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {enums.gender?.map((gender) => (
                                                <SelectItem key={gender.id} value={String(gender.id)}>
                                                    {gender.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.gender} />
                                </div>
                            </div>
                        </div>

                        {/* Documentos */}
                        <div className="space-y-6 border-b pb-6">
                            <HeadingSmall title="Documentos e identificación" description="Información de documentos oficiales" />
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="document_type">Tipo de Documento</Label>
                                    <Select value={String(data.document_type)} onValueChange={(value) => setData('document_type', Number(value))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {enums.documentType?.map((doc) => (
                                                <SelectItem key={doc.id} value={String(doc.id)}>
                                                    {doc.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.document_type} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="document_number">Número de Documento</Label>
                                    <Input
                                        id="document_number"
                                        value={data.document_number}
                                        onChange={(e) => setData('document_number', e.target.value)}
                                        required
                                        placeholder="Número de documento"
                                    />
                                    <InputError message={errors.document_number} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="birth_date">Fecha de Nacimiento</Label>
                                    <Input
                                        id="birth_date"
                                        type="date"
                                        value={data.birth_date}
                                        onChange={(e) => setData('birth_date', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.birth_date} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="marital_status">Estado Civil</Label>
                                    <Select value={String(data.marital_status)} onValueChange={(value) => setData('marital_status', Number(value))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {enums.maritalStatus?.map((status) => (
                                                <SelectItem key={status.id} value={String(status.id)}>
                                                    {status.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.marital_status} />
                                </div>
                            </div>
                        </div>

                        {/* Información de contacto */}
                        <div className="space-y-6 pb-6">
                            <HeadingSmall title="Información de contacto" description="Datos para contactarte" />
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="grid gap-2 md:col-span-2">
                                    <Label htmlFor="address">Dirección</Label>
                                    <Input
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        required
                                        placeholder="Dirección completa"
                                    />
                                    <InputError message={errors.address} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="contact_phone_1">Teléfono Principal</Label>
                                    <Input
                                        id="contact_phone_1"
                                        value={data.contact_phone_1}
                                        onChange={(e) => setData('contact_phone_1', e.target.value)}
                                        required
                                        placeholder="Teléfono principal"
                                    />
                                    <InputError message={errors.contact_phone_1} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="contact_phone_2">Teléfono Secundario</Label>
                                    <Input
                                        id="contact_phone_2"
                                        value={data.contact_phone_2}
                                        onChange={(e) => setData('contact_phone_2', e.target.value)}
                                        placeholder="Teléfono secundario (opcional)"
                                    />
                                    <InputError message={errors.contact_phone_2} />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 border-t pt-6">
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm font-medium text-green-600">¡Perfil actualizado!</p>
                            </Transition>

                            <Button type="submit" disabled={processing} className="min-w-[140px]">
                                {processing ? 'Actualizando...' : 'Actualizar Perfil'}
                            </Button>
                        </div>
                    </form>
                </div>
            </AccessControlLayout>
        </AppLayout>
    );
}

function getProfileInitialData(user: ProfileProps['user']): ProfileForm {
    return {
        firstname: user.firstname ?? '',
        middle_name: user.middle_name ?? '',
        lastname: user.lastname ?? '',
        second_lastname: user.second_lastname ?? '',
        email: user.email ?? '',
        gender: user.gender.id,
        document_type: user.document_type.id,
        document_number: user.document_number ?? '',
        birth_date: user.birth_date ?? '',
        marital_status: user.marital_status.id,
        address: user.address ?? '',
        contact_phone_1: user.contact_phone_1 ?? '',
        contact_phone_2: user.contact_phone_2 ?? '',
    };
}
