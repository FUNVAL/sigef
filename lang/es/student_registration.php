<?php

return [
    'form' => [
        'title' => 'Formulario de Registro de Estudiante',
        'subtitle' => 'Complete todos los pasos para completar su registro',
    ],
    'steps' => [
        'personal_information' => [
            'title' => 'Información Personal',
            'subtitle' => 'Complete sus datos personales básicos',
        ],
        'religious_information' => [
            'title' => 'Información Eclesiástica',
            'subtitle' => 'Complete su información religiosa y eclesiástica',
        ],
        'required_documents' => [
            'title' => 'Documentos Requeridos',
            'subtitle' => 'Suba los documentos necesarios para su registro',
        ],
        'agreements' => [
            'title' => 'Acuerdos y Términos',
            'subtitle' => 'Lea y acepte los términos y condiciones',
        ],
        'overview' => [
            'title' => 'Resumen de Inscripción',
            'subtitle' => 'Revise su información antes de enviar',
        ],
    ],
    'sections' => [
        'names_surnames' => 'Nombres y Apellidos',
        'birth_gender' => 'Fecha de Nacimiento y Género',
        'location' => 'Ubicación',
        'contact_info' => 'Información de Contacto',
        
        // Required Documents
        'document_info' => 'Información del Documento',
        'document_photos' => 'Fotos de Documentos',
        'additional_documents' => 'Documentos Adicionales',
        'formal_photo' => 'Foto Formal',
        
        // Religious Information
        'church_membership' => 'Membresía de la Iglesia',
        'missionary_service' => 'Servicio Misional',
        'temple_ordinances' => 'Ordenanzas del Templo',
        'ecclesiastical_info' => 'Información Eclesiástica',
        
        // Academic Information
        'education_background' => 'Antecedentes Educativos',
        'course_selection' => 'Selección de Curso',
        'english_proficiency' => 'Competencia en Inglés',
    ],
    'fields' => [
        'first_name' => 'Primer Nombre',
        'middle_name' => 'Segundo Nombre',
        'last_name' => 'Primer Apellido',
        'second_last_name' => 'Segundo Apellido',
        'birth_date' => 'Fecha de Nacimiento',
        'age' => 'Edad',
        'gender' => 'Género',
        'country' => 'País',
        'marital_status' => 'Estado Civil',
        'email' => 'Correo Electrónico',
        'phone' => 'Teléfono de Contacto',
        'address' => 'Dirección',
        'province_state' => 'Estado/Departamento/Provincia',
        'recruiter_name' => 'Reclutador/Responsable',
        'home_location_link' => 'Ubicación de su Casa',
        'facebook_profile' => 'Perfil de Facebook (URL)',
        'pathway_level' => '¿Está estudiando en Pathway?',
        'college_status' => '¿Está estudiando en BYU o Ensign College?',
        
        // Required Documents
        'document_type' => 'Tipo de Documento',
        'document_number' => 'Número de Documento',
        'id_front_photo' => 'Foto Frontal del Documento',
        'id_back_photo' => 'Foto Posterior del Documento',
        'driver_license' => 'Licencia de Conducir',
        'utility_bill_photo' => 'Recibo de Servicios Públicos',
        'formal_photo' => 'Foto Formal (Fondo Blanco)',
        
        // Religious Information
        'is_active_member' => 'Miembro Activo de la Iglesia',
        'member_certificate_number' => 'Número de Certificado de Miembro',
        'baptism_year' => 'Año de Bautismo',
        'is_returned_missionary' => 'Misionero Retornado',
        'mission_served' => 'Misión Servida',
        'mission_end_year' => 'Año de Finalización de Misión',
        'temple_status' => 'Estado del Templo',
        'current_calling' => 'Llamamiento Actual',
        'stake' => 'Estaca',
        'ward_branch' => 'Barrio/Rama',
        'auxiliar_president' => 'Nombre Presidente(a) de Cuorum / SOC',
        'auxiliary_president_phone' => 'Teléfono del Presidente Auxiliar',
        
        // Academic Information
        'education_level' => 'Nivel Educativo',
        'course' => 'Curso',
        'english_connect_level' => 'Nivel de English Connect',
        
        // Additional Fields
        'province_state' => 'Estado/Departamento/Provincia',
        'address' => 'Dirección',
        'home_location_link' => 'Ubicación de su Casa',
        'facebook_profile' => 'Perfil de Facebook (URL)',
        'pathway_level' => '¿Está estudiando en Pathway?',
        'college_status' => '¿Está estudiando en BYU o Ensign College?',
    ],
    'placeholders' => [
        'first_name' => 'Ingrese su primer nombre',
        'middle_name' => 'Ingrese su segundo nombre (opcional)',
        'last_name' => 'Ingrese su primer apellido',
        'second_last_name' => 'Ingrese su segundo apellido (opcional)',
        'select_gender' => 'Seleccione su género',
        'select_country' => 'Seleccione su país',
        'select_marital_status' => 'Seleccione su estado civil',
        'email' => 'ejemplo@correo.com',
        'phone' => 'Ingrese su número de teléfono',
        'recruiter_name' => 'Nombre del reclutador (opcional)',
        'address' => 'Ingrese su dirección completa',
        'province_state' => 'Ingrese su estado, departamento o provincia',
        'home_location_link' => 'https://maps.google.com/... (opcional)',
        'facebook_profile' => 'https://www.facebook.com/tu.nombre.usuario',
        'age_automatic' => 'Se calcula automáticamente',
        
        // Required Documents
        'select_document_type' => 'Seleccione el tipo de documento',
        'document_number' => 'Ingrese el número de documento',
        'upload_id_front' => 'Suba la foto frontal de su documento',
        'upload_id_back' => 'Suba la foto posterior de su documento',
        'upload_driver_license' => 'Suba su licencia de conducir (opcional)',
        'upload_utility_bill' => 'Suba el recibo de servicios públicos',
        'upload_formal_photo' => 'Suba su foto formal con fondo blanco',
        
        // Religious Information
        'member_certificate_number' => 'Número de certificado (opcional)',
        'baptism_year' => 'Año de bautismo (opcional)',
        'mission_served' => 'Nombre de la misión servida (opcional)',
        'mission_end_year' => 'Año de finalización (opcional)',
        'select_temple_status' => 'Seleccione su estado del templo',
        'current_calling' => 'Su llamamiento actual (opcional)',
        'select_stake' => 'Seleccione su estaca',
        'ward_branch' => 'Nombre del barrio o rama (opcional)',
        'auxiliar_president' => 'Nombre del Presidente(a) de Cuorum / SOC',
        'auxiliary_president_phone' => 'Tu número de teléfono',
        
        // Academic Information
        'select_education_level' => 'Seleccione su nivel educativo',
        'select_course' => 'Seleccione el curso',
        'select_english_level' => 'Seleccione su nivel de English Connect',
    ],
    'validation' => [
        'first_name_required' => 'El nombre es obligatorio',
        'last_name_required' => 'El apellido es obligatorio',
        'birth_date_required' => 'La fecha de nacimiento es obligatoria',
        'gender_required' => 'El género es obligatorio',
        'country_required' => 'El país es obligatorio',
        'marital_status_required' => 'El estado civil es obligatorio',
        'email_required' => 'El correo electrónico es obligatorio',
        'phone_required' => 'El teléfono es obligatorio',
        
        // Required Documents
        'document_type_required' => 'El tipo de documento es obligatorio',
        'document_number_required' => 'El número de documento es obligatorio',
        'id_front_photo_required' => 'La foto frontal del documento es obligatoria',
        'id_back_photo_required' => 'La foto posterior del documento es obligatoria',
        'utility_bill_photo_required' => 'El recibo de servicios públicos es obligatorio',
        'formal_photo_required' => 'La foto formal es obligatoria',
        
        // Religious Information
        'is_active_member_required' => 'Debe especificar si es miembro activo',
        'is_returned_missionary_required' => 'Debe especificar si es misionero retornado',
        'temple_status_required' => 'El estado del templo es obligatorio',
        'stake_required' => 'La estaca es obligatoria',
        
        // Academic Information
        'education_level_required' => 'El nivel educativo es obligatorio',
        'course_required' => 'El curso es obligatorio',
        'english_connect_level_required' => 'El nivel de English Connect es obligatorio',
        
        // Religious Information - Additional
        'member_number_required' => 'El número de cédula de miembro es obligatorio',
        'member_number_format' => 'El número de cédula debe tener el formato completo: XXX-XXXX-XXXX (3-4-4 caracteres)',
        'mission_served_required' => 'Debe especificar en qué misión sirvió',
        'mission_end_year_required' => 'Debe especificar el año en que finalizó la misión',
    ],
    'labels' => [
        'not_member' => 'Aún no soy miembro',
        'location_obtained' => '✓ Ubicación obtenida',
        'location_registered' => '✓ Ubicación registrada correctamente',
        'location_capture' => 'Has clic en el "Icono" para mandar tu ubicación actual',
        'pathway_no' => 'No estoy estudiando en Pathway',
        'pathway_current' => 'Sí estoy cursando Pathway',
        'pathway_completed' => 'He completado Pathway',
        'college_none' => 'Ninguno de los dos',
        'college_byu' => 'Sí, estoy estudiando en BYU',
        'college_ensign' => 'Sí, estoy estudiando en Ensign College',
    ],
    'required' => 'obligatorio',
    'optional' => 'opcional',
    
    'info_text' => [
        'upload_requirements' => 'Formatos permitidos: JPEG, PNG. Tamaño máximo: 5MB',
        'formal_photo_requirements' => 'La foto debe tener fondo blanco y mostrar claramente su rostro',
        'document_security' => 'Sus documentos están seguros y solo serán utilizados para verificación',
        'age_calculation' => 'La edad se calcula automáticamente basada en su fecha de nacimiento',
        'optional_fields' => 'Los campos marcados como opcionales pueden dejarse en blanco',
    ],
    
    'file_upload' => [
        'drag_drop' => 'Arrastra y suelta el archivo aquí, o haz clic para seleccionar',
        'browse_files' => 'Examinar archivos',
        'file_selected' => 'Archivo seleccionado',
        'remove_file' => 'Remover archivo',
        'upload_progress' => 'Subiendo archivo...',
        'upload_success' => 'Archivo subido correctamente',
        'upload_error' => 'Error al subir el archivo',
    ],
    
    'confirmation' => [
        'verify_info' => 'Verifique que toda la información esté correcta antes de enviar',
        'terms_acceptance' => 'Al enviar este formulario, acepto los términos y condiciones',
        'submit_form' => 'Enviar Registro',
        'processing' => 'Procesando...',
    ],

    // Agreements Section
    'agreements' => [
        'title_prefix' => 'Acuerdo',
        'title_suffix' => 'de',
        'read_timer' => 'Comenzar Lectura',
        'timer_seconds' => 's',
        'reading_progress' => 'Leyendo...',
        'seconds_remaining' => 's restantes',
        'accept_checkbox' => 'He leído y acepto este acuerdo',
        'next_agreement' => 'Siguiente Acuerdo',
        'previous_agreement' => 'Acuerdo Anterior',
        'finalize_registration' => 'Finalizar Inscripción',
        'all_agreements_accepted' => '✅ Todos los acuerdos han sido aceptados',
        'progress_status' => 'Progreso:',
        'agreements_accepted' => 'acuerdos aceptados',

        'terms_title' => 'Términos y Condiciones de Inscripción',
        'privacy_title' => 'Política de Privacidad y Uso de Datos', 
        'conduct_title' => 'Código de Conducta y Valores Institucionales',
        'health_title' => 'Declaración de Salud y Compromiso Académico',

        'health_form' => [
            'title' => 'Declaración de Salud',
            'main_question' => '¿Tiene en la actualidad o ha tenido alguna vez enfermedades físicas, mentales o emocionales que le dificultarían mantener un horario intensivo de estudio, que requiere entre 8 y 10 horas diarias de concentración, lectura, análisis, trabajo en computadora y otras actividades similares?',
            'yes' => 'Sí',
            'no' => 'No',
            'medication_info' => 'Información sobre Medicamentos',
            'medication_question' => '¿Actualmente toma algún tipo de medicamento relacionado con alguna de las siguientes condiciones?',
            'medication_none' => 'No tomo ningún medicamento actualmente',
            'medication_physical' => 'Sí, para una condición física crónica (ej. diabetes, hipertensión, epilepsia, problemas respiratorios, etc.)',
            'medication_emotional' => 'Sí, para una condición emocional (ej. ansiedad, depresión, trastornos del estado de ánimo, etc.)',
            'medication_mental' => 'Sí, para una condición mental o neurológica (ej. TDAH, trastornos del sueño, bipolaridad, etc.)',
            'medication_other' => 'Sí, pero no relacionada con ninguna de las categorías anteriores',
            'medication_specify' => 'Especifique el tipo de medicamento',
            'medication_frequency' => '¿Con qué frecuencia toma el medicamento?',
            'frequency_daily' => 'Diariamente',
            'frequency_weekly' => 'Semanal',
            'frequency_biweekly' => 'Quincenal',
            'frequency_monthly' => 'Mensual',
            'frequency_quarterly' => 'Cada 3 meses',
            'frequency_biannual' => 'Cada 6 meses',
            'frequency_as_needed' => 'Solo cuando es necesario',
        ],
    ],

    // Overview Section
    'overview' => [
        'title' => 'Resumen de Inscripción',
        'subtitle' => 'Revise su información antes de enviar',
        'personal_info' => 'Información Personal',
        'religious_info' => 'Información Religiosa',
        'documents_info' => 'Documentos',
        'agreements_info' => 'Acuerdos',
        'submit_button' => 'Finalizar Inscripción',
        'previous_button' => 'Anterior',
        'submitting' => 'Enviando...',
        'edit' => 'Editar',
    ],

    // Additional Labels
    'labels' => [
        'required_field' => 'Campo obligatorio',
        'optional_field' => 'Campo opcional',
        'location_obtained' => '✓ Ubicación obtenida',
        'location_capture' => 'Has clic en el "Icono" para mandar tu ubicación actual',
        'location_registered' => '✓ Ubicación registrada correctamente',
        'pathway_no' => 'No estoy estudiando en Pathway',
        'pathway_current' => 'Sí estoy cursando Pathway',
        'pathway_completed' => 'He completado Pathway',
        'college_none' => 'Ninguno de los dos',
        'college_byu' => 'Sí, estoy estudiando en BYU',
        'college_ensign' => 'Sí, estoy estudiando en Ensign College',
        'take_photo' => 'Tomar Foto con Cámara',
        'change_file' => 'Cambiar archivo',
        'file_selected' => 'Archivo seleccionado',
        'file_name' => 'Nombre:',
        'file_size' => 'Tamaño:',
        'mb_unit' => 'MB',
    ],
];