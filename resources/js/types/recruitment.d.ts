export type HouseholdExpense = {
    type: number;
    amount: number;
};

export type HouseholdMember = {
    age: string;
    name: string;
    phone?: string;
    relationship: number;
    income_contribution?: number;
};

export type BonusInfo = {
    category: number;
    amount: number;
};

export type JobOffer = {
    company_name: string;
    salary_expectation: number;
};

export type RecruitmentFormData = {
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
    has_work_experience?: boolean;
    experience_job_position?: number;
    years_of_experience?: number;
    needs_bonus: boolean;
    bonus_categories: number[];
    bonus_amounts: number[];
    needs_practice_bonus: boolean;
    practice_bonus_categories: number[];
    practice_bonus_amounts: number[];
    job_offers: JobOffer[];

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
};

export type RecruitmentRequest = {
    data: RecruitmentFormData;
    setData: (field: keyof RecruitmentFormData | string, value: any) => void;
    post: (url: string, options?: any) => void;
    processing: boolean;
    errors: Record<string, string>;
};