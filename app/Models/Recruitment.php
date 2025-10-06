<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recruitment extends Model
{
    use HasFactory;

    protected $fillable = [
        // Socio-económico
        'household_members',
        'monthly_income',
        'has_residential_internet',
        'device_type',
        'housing_type',
        'has_employment',
        'employment_type',
        'company_name',
        'job_position',
        'employment_income',
        'needs_bonus',
        'bonus_categories',
        'bonus_amounts',
        'needs_practice_bonus',
        'practice_bonus_categories',
        'practice_bonus_amounts',
        
        // Salud
        'has_health_insurance',
        'has_illness',
        'illness_description',
        'takes_medication',
        'medical_visit_frequency',
        'health_declaration_accepted',
        
        // Información adicional
        'start_month',
        'start_year',
        'interview_photo',
        
        // Acuerdos
        'mutual_understanding_accepted',
        'work_commitment_accepted',
        'data_authorization_accepted',
        'scholarship_agreement_accepted',
        'religious_institute_accepted',
        'health_agreement_accepted',
    ];

    protected $casts = [
        'household_members' => 'array',
        'bonus_categories' => 'array',
        'bonus_amounts' => 'array',
        'practice_bonus_categories' => 'array',
        'practice_bonus_amounts' => 'array',
        'has_residential_internet' => 'boolean',
        'has_employment' => 'boolean',
        'needs_bonus' => 'boolean',
        'needs_practice_bonus' => 'boolean',
        'has_health_insurance' => 'boolean',
        'has_illness' => 'boolean',
        'health_declaration_accepted' => 'boolean',
        'mutual_understanding_accepted' => 'boolean',
        'work_commitment_accepted' => 'boolean',
        'data_authorization_accepted' => 'boolean',
        'scholarship_agreement_accepted' => 'boolean',
        'religious_institute_accepted' => 'boolean',
        'health_agreement_accepted' => 'boolean',
    ];
}