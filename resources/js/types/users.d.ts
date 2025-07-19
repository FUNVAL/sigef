// Tipos base reutilizables
type IdName = { id: number; name: string };

// Formulario base para usuario
type UserForm = {
    firstname: string;
    middle_name: string;
    lastname: string;
    second_lastname: string;
    email: string;
    gender: number;
    document_type: number;
    document_number: string;
    birth_date: string;
    marital_status: number;
    address: string;
    contact_phone_1: string;
    contact_phone_2: string;
    role_id: number;
    status: number;
};

// Usuario existente (editar)
type User = Omit<UserForm, 'gender' | 'marital_status' | 'document_type' | 'status' | 'role_id'> & {
    id: number;
    status: IdName;
    gender: IdName;
    marital_status: IdName;
    document_type: IdName;
    roles: IdName[];
};

// Crear usuario (algunos campos podrían ser opcionales)
type CreateUserForm = Omit<UserForm, 'status'>;

// Actualizar usuario (todos los campos opcionales)
type UpdateUserForm = Partial<UserForm> & { id: number };

// Props para componentes
type CreateUserProps = {
    roles: IdName[];
};

type EditUserProps = {
    user: User;
    roles: IdName[];
};

type EnumsProps = {
    userStatus: IdName[];
    gender: IdName[];
    maritalStatus: IdName[];
    documentType: IdName[];
};

export type {
    UserForm,
    User,
    CreateUserForm,
    UpdateUserForm,
    EditUserProps,
    CreateUserProps,
    EnumsProps,
    IdName,
};