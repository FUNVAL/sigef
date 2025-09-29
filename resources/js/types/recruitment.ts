export interface HouseholdExpense {
    type: number;
    amount: number;
}

export interface HouseholdMember {
    name: string;
    phone?: string;
    relationship: number;
    income_contribution?: number;
}

export interface BonusInfo {
    category: number;
    amount: number;
}

export interface RecruitmentFormData {
    // Datos básicos
    country_id?: number;
    
    // Socio-económico
    household_members: HouseholdMember[];
    monthly_expenses: HouseholdExpense[];
    monthly_income: number;
    has_residential_internet: boolean;
    device_type: number;
    housing_type: number;
    has_employment: boolean;
    employment_type?: number;
    company_name?: string;
    job_position?: number;
    employment_income?: number;
    needs_bonus: boolean;
    bonus_categories: number[];
    bonus_amounts: number[];

    // Salud
    has_health_insurance: boolean;
    has_illness: boolean;
    illness_description?: string;
    takes_medication?: boolean;
    medical_visit_frequency?: string;
    health_declaration_accepted: boolean;

    // Información adicional
    start_month: number;
    start_year: number;
    interview_photo?: File;

    // Acuerdos
    mutual_understanding_accepted: boolean;
    work_commitment_accepted: boolean;
    data_authorization_accepted: boolean;
    scholarship_agreement_accepted: boolean;
    religious_institute_accepted: boolean;
    health_agreement_accepted: boolean;
}

export interface RecruitmentRequest {
    data: RecruitmentFormData;
    setData: (field: keyof RecruitmentFormData | string, value: any) => void;
    post: (url: string, options?: any) => void;
    processing: boolean;
    errors: Record<string, string>;
}