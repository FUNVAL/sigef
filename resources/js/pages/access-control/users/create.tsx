import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import AccessControlLayout from '@/layouts/access-control/layout';

type UserForm = {
    firstname: string;
    middle_name: string;
    lastname: string;
    second_lastname: string;
    email: string;
    gender: string;
    document_type: string;
    document_number: string;
    birth_date: string;
    marital_status: string;
    address: string;
    contact_phone_1: string;
    contact_phone_2: string;
    role_id: string;
    password: string;
    password_confirmation: string;
}
const initialData = {
    firstname: '',
    middle_name: '',
    lastname: '',
    second_lastname: '',
    email: '',
    gender: '',
    document_type: '',
    document_number: '',
    birth_date: '',
    marital_status: '',
    address: '',
    contact_phone_1: '',
    contact_phone_2: '',
    role_id: '',
    password: '',
    password_confirmation: '',
}
export default function CreateUser() {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<UserForm>(initialData);
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Control de Accesos',
            href: '/access-control/users',
        },
    ];
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('users.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Control de accesos" />
            <AccessControlLayout headings={{
                title: 'Crear usuario',
                description: 'Formulario para crear un nuevo usuario',
            }}>
                <div className="space-y-8">
                    <form onSubmit={submit} className="space-y-8"> 
                        <div className="space-y-6">
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
                                        value={data.gender}
                                        onValueChange={(value) => setData('gender', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione género" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="M">Masculino</SelectItem>
                                            <SelectItem value="F">Femenino</SelectItem>
                                            <SelectItem value="O">Otro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.gender} />
                                </div>
                            </div>
                        </div>

                        {/* Documentos */}
                        <div className="space-y-6">
                            <HeadingSmall 
                                title="Documentos e identificación" 
                                description="Información de documentos oficiales"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="document_type">Tipo de Documento</Label>
                                    <Select
                                        value={data.document_type}
                                        onValueChange={(value) => setData('document_type', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="DNI">DNI</SelectItem>
                                            <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                                            <SelectItem value="Cédula">Cédula</SelectItem>
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
                                        value={data.marital_status}
                                        onValueChange={(value) => setData('marital_status', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="soltero">Soltero/a</SelectItem>
                                            <SelectItem value="casado">Casado/a</SelectItem>
                                            <SelectItem value="divorciado">Divorciado/a</SelectItem>
                                            <SelectItem value="viudo">Viudo/a</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.marital_status} />
                                </div>
                            </div>
                        </div>

                        {/* Contacto */}
                        <div className="space-y-6">
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
                                        value={data.role_id}
                                        onValueChange={(value) => setData('role_id', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione rol" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Administrador</SelectItem>
                                            <SelectItem value="2">Usuario</SelectItem>
                                            <SelectItem value="3">Auditor</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.role_id} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                        placeholder="Contraseña segura"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2 md:col-start-2">
                                    <Label htmlFor="password_confirmation">Confirmar Contraseña</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                        placeholder="Confirme la contraseña"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t">
                            <Button type="submit" disabled={processing}>Crear Usuario</Button>
                            <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                Cancelar
                            </Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-green-600">Usuario creado correctamente</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </AccessControlLayout>
        </AppLayout>
    );
}
