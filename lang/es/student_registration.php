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
        'required_documents' => [
            'title' => 'Documentos Requeridos',
            'subtitle' => 'Suba los documentos necesarios para su registro',
        ],
        'religious_information' => [
            'title' => 'Información Religiosa/Eclesiástica',
            'subtitle' => 'Complete su información religiosa y eclesiástica',
        ],
        'academic_information' => [
            'title' => 'Información Académica y Profesional',
            'subtitle' => 'Complete su formación académica y experiencia profesional',
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
        'recruiter_name' => 'Reclutador/Responsable',
        'home_location_link' => 'Link de Ubicación de Casa',
        
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
        
        // Academic Information
        'education_level' => 'Nivel Educativo',
        'course' => 'Curso',
        'english_connect_level' => 'Nivel de English Connect',
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
        'home_location_link' => 'https://maps.google.com/... (opcional)',
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
];