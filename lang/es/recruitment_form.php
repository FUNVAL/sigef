<?php

return [
    'title' => 'Formulario de Reclutamiento - FUNVAL',
    'success_message' => 'Su aplicación de reclutamiento ha sido enviada exitosamente.',
    'error_message' => 'Ha ocurrido un error al procesar su aplicación. Por favor, intente nuevamente.',
    'update_success_message' => 'Su aplicación de reclutamiento ha sido actualizada exitosamente.',
    'update_error_message' => 'Ha ocurrido un error al actualizar su aplicación.',
    'delete_success_message' => 'La aplicación de reclutamiento ha sido eliminada exitosamente.',
    'delete_error_message' => 'Ha ocurrido un error al eliminar la aplicación.',
    
    'steps' => [
        'socio_economic' => [
            'title' => 'Información Socio-económica',
            'subtitle' => 'Proporcione información sobre su situación económica y familiar',
        ],
        'health' => [
            'title' => 'Información de Salud',
            'subtitle' => 'Proporcione información sobre su estado de salud',
        ],
        'agreements' => [
            'title' => 'Acuerdos y Compromisos',
            'subtitle' => 'Por favor, lea cuidadosamente cada acuerdo y acepte todos los términos para continuar',
        ],
        'additional_info' => [
            'title' => 'Información Adicional',
            'subtitle' => 'Complete la información final para su aplicación',
        ],
        'overview' => [
            'title' => 'Resumen de Aplicación',
            'subtitle' => 'Revise su información antes de enviar la aplicación',
        ],
    ],
    
    'fields' => [
        'household_members' => 'Personas que viven en su casa',
        'monthly_income' => 'Ingresos mensuales (USD)',
        'has_residential_internet' => '¿Cuenta con servicio de Internet Residencial o WIFI?',
        'device_type' => '¿Qué tipo de dispositivo usará para conectarse a clases?',
        'housing_type' => 'Tipo de Vivienda',
        'has_employment' => '¿Al día de hoy tiene un empleo?',
        'employment_type' => 'Tipo de empleo',
        'company_name' => 'Nombre de la empresa',
        'job_position' => 'Puesto',
        'employment_income' => 'Salario (USD)',
        'needs_bonus' => '¿Necesita bono?',
        'bonus_categories' => 'Categorías de bono',
        'needs_practice_bonus' => '¿Necesita bono para prácticas o bootcamp?',
        'practice_bonus_categories' => 'Categorías de bono para prácticas',
        'has_health_insurance' => '¿Cuenta con seguro médico?',
        'has_illness' => '¿Padece de alguna enfermedad?',
        'illness_description' => 'Describa la enfermedad',
        'takes_medication' => '¿Toma algún medicamento?',
        'medical_visit_frequency' => '¿Con qué frecuencia asiste al médico por su enfermedad?',
        'health_declaration_accepted' => 'Declaración jurada de salud',
        'start_month' => 'Mes de inicio',
        'start_year' => 'Año de inicio',
        'interview_photo' => 'Foto de entrevista',
    ],
    
    'validation' => [
        'household_members_required' => 'Debe agregar al menos una persona',
        'monthly_income_required' => 'Los ingresos mensuales son requeridos',
        'device_type_required' => 'El tipo de dispositivo es requerido',
        'housing_type_required' => 'El tipo de vivienda es requerido',
        'employment_type_required' => 'El tipo de empleo es requerido',
        'company_name_required' => 'El nombre de la empresa es requerido',
        'job_position_required' => 'El puesto es requerido',
        'employment_income_required' => 'El salario es requerido',
        'illness_description_required' => 'Debe describir la enfermedad',
        'takes_medication_required' => 'Debe indicar si toma medicamentos',
        'medical_visit_frequency_required' => 'Debe indicar la frecuencia de visitas médicas',
        'health_declaration_required' => 'Debe aceptar la declaración de salud',
        'start_month_required' => 'Debe seleccionar el mes de inicio',
        'start_year_required' => 'Debe seleccionar el año de inicio',
        'interview_photo_required' => 'Debe subir la foto de entrevista',
        'agreement_required' => 'Debe aceptar este acuerdo para continuar',
    ],
];