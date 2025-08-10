import { IdName } from './users';

// Formulario de perfil (sin campos de sistema como rol y status)
type ProfileForm = {
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
};

// Usuario para perfil (con relaciones)
type ProfileUser = Omit<ProfileForm, 'gender' | 'marital_status' | 'document_type'> & {
    id: number;
    gender: IdName;
    marital_status: IdName;
    document_type: IdName;
    email_verified_at?: string | null;
};

// Props para el componente de perfil
type ProfileProps = {
    user: ProfileUser;
    mustVerifyEmail: boolean;
    status?: string;
    enums: {
        gender: IdName[];
        documentType: IdName[];
        maritalStatus: IdName[];
        userStatus: IdName[];
    };
};

export type { ProfileForm, ProfileProps, ProfileUser };
