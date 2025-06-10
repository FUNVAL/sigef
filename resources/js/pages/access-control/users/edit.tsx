import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AccessControlLayout from '@/layouts/access-control/layout';
import { type UserForm, type EditUserProps, type EnumsProps } from '@/types/users';


export default function EditUser({ user, roles }: EditUserProps) {
    const { data, setData, put, errors, processing, recentlySuccessful } =
        useForm<UserForm>(getUserInitialData(user));

    const { enums } = usePage<{ enums: EnumsProps }>().props;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('users.update', user.id), {
            preserveScroll: true,
            onError: (errors) => {
                console.error('Error al actualizar el usuario:', errors);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={getEditUserBreadcrumbs(user.id)}>

            <Head title="Control de accesos" />

            <AccessControlLayout headings={{
                title: 'Editar usuario',
                description: 'Formulario para editar usuario',
            }}>
                <div className="space-y-8">
                    <form onSubmit={submit} className="space-y-8">
                        <div className="space-y-6 border-b pb-6">
                            <HeadingSmall
                                title="Datos personales"
                                description="Información básica del usuario"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    <Select
                                        value={String(data.gender)}
                                        onValueChange={(value) => setData('gender', Number(value))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione género" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {enums.gender?.map((status) => (
                                                <SelectItem key={status.id} value={String(status.id)}>
                                                    {status.name}
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
                            <HeadingSmall
                                title="Documentos e identificación"
                                description="Información de documentos oficiales"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="document_type">Tipo de Documento</Label>
                                    <Select
                                        value={String(data.document_type)}
                                        onValueChange={(value) => setData('document_type', Number(value))}
                                    >
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
                                    />
                                    <InputError message={errors.birth_date} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="marital_status">Estado Civil</Label>
                                    <Select
                                        value={String(data.marital_status)}
                                        onValueChange={(value) => setData('marital_status', Number(value))}
                                    >
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

                        {/* Contacto */}
                        <div className="space-y-6 border-b pb-6">
                            <HeadingSmall
                                title="Información de contacto"
                                description="Datos para contactar al usuario"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="grid gap-2 md:col-span-2">
                                    <Label htmlFor="address">Dirección</Label>
                                    <Input
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
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

                        {/* Sistema */}
                        <div className="space-y-6">
                            <HeadingSmall
                                title="Datos de acceso al sistema"
                                description="Configuración de acceso y permisos"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="role_id">Rol</Label>
                                    <Select
                                        value={String(data.role_id)}
                                        onValueChange={(value) => setData('role_id', Number(value))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione rol" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map(role => (
                                                <SelectItem
                                                    key={role.id}
                                                    value={String(role.id)}
                                                    className='capitalize'
                                                    disabled={role.name === 'Student'}
                                                >
                                                    {role.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.role_id} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="user_status">Estado del Usuario</Label>
                                    <Select
                                        value={String(data.status)}
                                        onValueChange={(value) => setData('status', Number(value))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {enums.userStatus?.map((status) => (
                                                <SelectItem key={status.id} value={String(status.id)}>
                                                    {status.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} />
                                </div>
                            </div>

                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t">
                            <Button type="submit" disabled={processing} className='cursor-pointer'>Actualizar Usuario</Button>
                            <Button type="button" variant="outline" className='cursor-pointer' onClick={() => window.history.back()}>
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </div>
            </AccessControlLayout>
        </AppLayout>
    );
}

function getUserInitialData(user: EditUserProps['user']): UserForm {
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
        role_id: user.roles[0]?.id ?? 0, // Aseguramos un valor numérico por defecto
        status: user.status.id,
    };
}

function getEditUserBreadcrumbs(userId: number): BreadcrumbItem[] {
    return [
        {
            title: 'Control de Accesos',
            href: '/access-control',
        },
        {
            title: 'Usuarios',
            href: '/access-control/users',
        },
        {
            title: 'Editar usuario',
            href: `/access-control/users/${userId}/editar`,
        },
    ];
}