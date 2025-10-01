import {
    type BaseEntity,
    type BaseFilters,
    type BaseFormData,
    type BasePaginatedResponse,
    type BaseUpdateFormData,
    type Country,
    type GenderInfo,
    type MaritalStatusInfo,
    type Stake,
    type StatusInfo,
} from './common';

/**
 * Información del tipo de documento
 */
type DocumentTypeInfo = {
    id: number;
    name: string;
};

/**
 * Información del estado de bautismo
 */
type BaptismStatusInfo = {
    id: number;
    name: string;
};

/**
 * Información del estado del templo
 */
type TempleStatusInfo = {
    id: number;
    name: string;
};

/**
 * Información del nivel educativo
 */
type EducationLevelInfo = {
    id: number;
    name: string;
};

/**
 * Información del nivel de English Connect
 */
type EnglishConnectLevelInfo = {
    id: number;
    name: string;
};

/**
 * Tipo base para una inscripción de estudiante con todos sus campos y relaciones
 */
type StudentRegistration = BaseEntity & {
    // Información Personal
    first_name: string;
    middle_name?: string;
    last_name: string;
    second_last_name?: string;
    birth_date: string;
    age: number;
    gender: GenderInfo;
    country: Country;
    marital_status: MaritalStatusInfo;
    email: string;
    phone: string;
    recruiter_name?: string;
    home_location_link?: string;

    // Documentos Requeridos
    document_type: DocumentTypeInfo;
    document_number: string;
    id_front_photo?: string;
    id_back_photo?: string;
    driver_license?: string;
    utility_bill_photo?: string;
    formal_photo?: string;

    // Información Religiosa/Eclesiástica
    is_active_member: boolean;
    member_certificate_number?: string;
    baptism_year?: number;
    is_returned_missionary: boolean;
    mission_served?: string;
    mission_end_year?: number;
    temple_status: TempleStatusInfo;
    current_calling?: string;
    stake: Stake;
    ward_branch?: string;

    // Información Académica y Profesional
    education_level: EducationLevelInfo;
    course_id: number;
    english_connect_level: EnglishConnectLevelInfo;

    // Sistema
    status: StatusInfo;
    comments?: string;
    updated_at?: string;

    course?: {
        id: number;
        name: string;
    };
};

/**
 * Tipo para crear una nueva inscripción de estudiante
 * Convierte las relaciones de objetos a IDs numéricos
 */
type StudentRegistrationFormData = Omit<
    StudentRegistration,
    | 'id'
    | 'created_at'
    | 'updated_at'
    | 'country'
    | 'stake'
    | 'gender'
    | 'marital_status'
    | 'document_type'
    | 'baptism_status'
    | 'temple_status'
    | 'education_level'
    | 'english_connect_level'
    | 'status'
    | 'course'
> &
    BaseFormData & {
        // IDs para las relaciones
        gender: number;
        marital_status: number;
        document_type: number;
        temple_status: number;
        education_level: number;
        english_connect_level: number;
        status?: number;

        // Archivos como File objects para subida
        id_front_photo_file?: File;
        id_back_photo_file?: File;
        driver_license_file?: File;
        utility_bill_photo_file?: File;
        formal_photo_file?: File;

        // Agreement Information
        agreement_terms_accepted: boolean;
        agreement_privacy_accepted: boolean;
        agreement_conduct_accepted: boolean;

        // Index signature for Inertia compatibility
        [key: string]: any;
    };

/**
 * Tipo para actualizar el estado de una inscripción de estudiante
 */
type StudentRegistrationUpdateFormData = BaseUpdateFormData & {
    comments?: string;
};

/**
 * Tipo para editar datos de una inscripción de estudiante existente
 */
type StudentRegistrationEditFormData = Omit<StudentRegistrationFormData, 'id'> & {
    id: number;
};

/**
 * Tipo para filtros de búsqueda de inscripciones de estudiantes
 */
type StudentRegistrationFilters = BaseFilters & {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    document_number?: string;
    gender?: number;
    marital_status?: number;
    document_type?: number;
    is_active_member?: boolean;
    is_returned_missionary?: boolean;
    temple_status?: number;
    education_level?: number;
    english_connect_level?: number;
    course_id?: number;
};

/**
 * Tipo para la respuesta paginada de inscripciones de estudiantes
 */
type StudentRegistrationsPaginatedResponse = BasePaginatedResponse<StudentRegistration>;

/**
 * Tipo para el request del formulario con métodos de Inertia
 */
export type StudentRegistrationRequest = {
    data: StudentRegistrationFormData;
    setData: (field: keyof StudentRegistrationFormData, value: any) => void;
    post: (...args: any[]) => void;
    processing: boolean;
    errors: Partial<Record<string | number, string>>;
};

export type {
    BaptismStatusInfo,
    DocumentTypeInfo,
    EducationLevelInfo,
    EnglishConnectLevelInfo,
    StudentRegistration,
    StudentRegistrationEditFormData,
    StudentRegistrationFilters,
    StudentRegistrationFormData,
    StudentRegistrationsPaginatedResponse,
    StudentRegistrationUpdateFormData,
    TempleStatusInfo,
};
