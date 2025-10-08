<?php

return [
    'title' => 'Recruitment Form - FUNVAL',
    'success_message' => 'Your recruitment application has been successfully submitted.',
    'error_message' => 'An error occurred while processing your application. Please try again.',
    'update_success_message' => 'Your recruitment application has been successfully updated.',
    'update_error_message' => 'An error occurred while updating your application.',
    'delete_success_message' => 'The recruitment application has been successfully deleted.',
    'delete_error_message' => 'An error occurred while deleting the application.',
    
    'steps' => [
        'socio_economic' => [
            'title' => 'SocioEconomic Information',
            'subtitle' => 'Provide information about your economic and family situation',
        ],
        'health' => [
            'title' => 'Health Information',
            'subtitle' => 'Provide information about your health status',
        ],
        'agreements' => [
            'title' => 'Agreements and Commitments',
            'subtitle' => 'Please read each agreement carefully and accept all terms to continue',
        ],
        'additional_info' => [
            'title' => 'Additional Information',
            'subtitle' => 'Complete the final information for your application',
        ],
        'overview' => [
            'title' => 'Application Summary',
            'subtitle' => 'Review your information before submitting the application',
        ],
    ],
    
    'fields' => [
        'household_members' => 'People living in your house',
        'monthly_income' => 'Monthly income (USD)',
        'has_residential_internet' => 'Do you have residential Internet or WiFi service?',
        'device_type' => 'What type of device will you use to connect to classes?',
        'housing_type' => 'Housing Type',
        'has_employment' => 'Do you currently have a job?',
        'employment_type' => 'Employment type',
        'company_name' => 'Company name',
        'job_position' => 'Position',
        'employment_income' => 'Salary (USD)',
        'needs_bonus' => 'Do you need a bonus?',
        'bonus_categories' => 'Bonus categories',
        'has_health_insurance' => 'Do you have health insurance?',
        'has_illness' => 'Do you suffer from any illness?',
        'illness_description' => 'Describe the illness',
        'takes_medication' => 'Do you take any medication?',
        'medical_visit_frequency' => 'How often do you visit the doctor for your illness?',
        'health_declaration_accepted' => 'Health declaration',
        'start_month' => 'Start month',
        'start_year' => 'Start year',
        'interview_photo' => 'Interview photo',
    ],
    
    'validation' => [
        'household_members_required' => 'You must add at least one person',
        'monthly_income_required' => 'Monthly income is required',
        'device_type_required' => 'Device type is required',
        'housing_type_required' => 'Housing type is required',
        'employment_type_required' => 'Employment type is required',
        'company_name_required' => 'Company name is required',
        'job_position_required' => 'Position is required',
        'employment_income_required' => 'Salary is required',
        'illness_description_required' => 'You must describe the illness',
        'takes_medication_required' => 'You must indicate if you take medications',
        'medical_visit_frequency_required' => 'You must indicate the frequency of medical visits',
        'health_declaration_required' => 'You must accept the health declaration',
        'start_month_required' => 'You must select the start month',
        'start_year_required' => 'You must select the start year',
        'interview_photo_required' => 'You must upload the interview photo',
        'agreement_required' => 'You must accept this agreement to continue',
    ],
];