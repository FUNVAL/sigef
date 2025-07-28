<?php

return [
    // Enums
    'gender' => [
        'male' => 'Masculino',
        'female' => 'Femenino',
    ],
    'marital_status' => [
        'single' => 'Soltero',
        'married' => 'Casado',
        'divorced' => 'Divorciado',
        'widowed' => 'Viudo',
        'separated' => 'Separado',
    ],
    'course_modality' => [
        'online' => 'En Línea',
        'in_person' => 'Presencial',
        'hybrid' => 'Semipresencial',
    ],
    'job_type' => [
        'online' => 'En Línea',
        'in_person' => 'Presencial',
        'own_boss' => 'Emprendimiento',
    ],
    'status' => [
        'active' => 'Activo',
        'inactive' => 'Inactivo',
        'deleted' => 'Eliminado',
    ],
    'user_status' => [
        'active' => 'Activo',
        'inactive' => 'Inactivo',
    ],
    'request_status' => [
        'pending' => 'Pendiente',
        'approved' => 'Aprobado',
        'rejected' => 'Rechazado',
    ],
    'reference_status' => [
        'pending' => 'Pendiente',
        'approved' => 'Aprobado',
        'rejected' => 'Rechazado',
        'filtered' => 'Filtrada',
        'incorrect_number' => 'Número incorrecto',
        'work' => 'Trabajo',
        'studies' => 'Estudios',
        'not_church_member' => 'No es miembro de la iglesia',
        'future_missionary' => 'Futuro misionero',
        'health' => 'Salud',
        'graduate' => 'Es egresado',
        'duplicate' => 'Duplicado',
    ],
    'document_type' => [
        'identity_card' => 'Cédula de Identidad',
        'passport' => 'Pasaporte',
        'driver_license' => 'Licencia de Conducir',
    ],
    'attendance_status' => [
        'present' => 'Presente',
        'absent' => 'Ausente',
        'late' => 'Tardanza',
        'justified' => 'Justificado',
    ],
    'related_reference' => [
        'family' => 'Familia',
        'friend' => 'Amigo',
        'church_member' => 'Miembro de Iglesia',
        'work_colleague' => 'Compañero de Trabajo',
        'other' => 'Otro',
    ],

    // Forms
    'forms' => [
        'pre_inscription' => [
            'title' => 'Formulario de Pre-inscripción',
            'description' => 'Complete la información personal para proceder con su pre-inscripción',
            'overview' => [
                'title' => 'Revisa tus datos',
                'subtitle' => 'Verifica que toda la información sea correcta antes de enviar',
                'fields' => [
                    'first_name' => 'Primer Nombre:',
                    'middle_name' => 'Segundo Nombre:',
                    'last_name' => 'Apellido:',
                    'second_last_name' => 'Segundo Apellido:',
                    'gender' => 'Género:',
                    'age' => 'Edad:',
                    'country' => 'País:',
                    'phone' => 'Teléfono:',
                    'stake' => 'Estaca/Distrito/Misión:',
                    'email' => 'Email:',
                    'marital_status' => 'Estado Civil:',
                    'served_mission' => '¿Ha servido una misión?:',
                    'currently_working' => '¿Estás trabajando actualmente?:',
                    'job_type_preference' => 'Tipo de empleo que buscas:',
                    'available_full_time' => 'Disponibilidad para trabajar a tiempo completo:',
                ],
                'buttons' => [
                    'sending' => 'Enviando...',
                    'submit' => 'Enviar',
                ],
            ],
            'course_selection' => [
                'title' => 'Selecciona tu Curso',
                'description' => 'Elige el programa de capacitación que más se adapte a tus intereses y objetivos profesionales',
                'selected_course' => 'Curso seleccionado:',
                'selection_confirmation' => 'Has seleccionado este curso para tu proceso de pre-inscripción. Al continuar confirmas tu interés en participar en este programa.',
                'duration' => 'semanas',
            ],
            'female_filter' => [
                'title' => 'Preguntas de Evaluación',
                'description' => 'Estas preguntas nos ayudan a determinar si nuestros programas son adecuados para ti',
                'currently_working' => '¿Estás trabajando actualmente?',
                'job_type_preference' => '¿Qué tipo de empleo buscas?',
                'available_full_time' => '¿Tienes disponibilidad para estudiar en un horario de clases extendido de 10-12 horas diarias de lunes a viernes?',
                'answers' => [
                    'working_yes' => 'Sí, actualmente trabajo',
                    'working_no' => 'No, no estoy trabajando',
                    'availability_yes' => 'Sí, tengo disponibilidad completa',
                    'availability_no' => 'No, no tengo esa disponibilidad',
                ],
            ],
            'fields' => [
                'first_name' => 'Nombre',
                'middle_name' => 'Segundo Nombre',
                'last_name' => 'Apellido',
                'second_last_name' => 'Segundo Apellido',
                'gender' => 'Género',
                'age' => 'Edad',
                'phone' => 'Teléfono',
                'email' => 'Correo Electrónico',
                'marital_status' => 'Estado Civil',
                'served_mission' => '¿Ha servido una misión?',
                'country' => 'País',
                'stake' => 'Estaca/Distrito/Misión',
                'currently_working' => '¿Trabajando actualmente?',
                'job_type_preference' => 'Preferencia de Trabajo',
                'available_full_time' => 'Disponibilidad de Tiempo Completo',
                'course' => 'Curso de Interés',
            ],
            'validation' => [
                'required' => 'Este campo es obligatorio',
                'email' => 'Ingrese un correo válido',
                'min_age' => 'Debe ser mayor de :min años',
                'max_age' => 'Debe ser menor de :max años',
                'unique' => 'Este correo ya está registrado',
            ],
        ],
        'referral' => [
            'title' => 'Formulario de Referencia',
            'description' => 'Comparte los datos de la persona que deseas referir',
            'referrer_info' => 'Información de quien refiere',
            'fields' => [
                'name' => 'Nombre completo de la persona referida',
                'name_placeholder' => 'Nombre completo',
                'gender' => 'Género',
                'gender_placeholder' => 'Seleccionar género',
                'gender_select' => 'Selecciona un género',
                'age' => 'Edad',
                'country' => 'País',
                'phone' => 'Teléfono',
                'stake' => 'Estaca/Distrito/Misión',
                'referrer_name' => 'Su Nombre',
                'referrer_phone' => 'Su Teléfono',
                'relationship' => 'Relación con el Referido',
            ],
            'overview' => [
                'title' => 'Revisa los datos de la referencia',
                'fields' => [
                    'full_name' => 'Nombre completo:',
                    'gender' => 'Género:',
                    'age' => 'Edad:',
                    'country' => 'País:',
                    'phone' => 'Teléfono:',
                    'stake' => 'Estaca/Distrito/Misión:',
                    'referrer_name' => 'Tu nombre:',
                    'referrer_phone' => 'Tu teléfono:',
                    'relationship' => 'Relación con la persona referida:',
                ],
                'buttons' => [
                    'sending' => 'Enviando...',
                    'submit' => 'Enviar referencia',
                ],
            ],
        ],
    ],

    // Messages
    'messages' => [
        'success' => [
            'pre_inscription_created' => '¡Gracias por tu aplicación! Uno de nuestros representantes se pondrá en contacto contigo en las próximas 72 horas.',
            'pre_inscription_success' => '<strong>¡Gracias por tu aplicación!</strong><br/>Uno de nuestros representantes se pondrá en contacto contigo en las próximas 72 horas para brindarte toda la información sobre el programa y resolver cualquier duda que puedas tener.<br/><br/>Agradecemos tu interés y estamos emocionados de acompañarte en este proceso.',
            'reference_created' => '<strong>¡Gracias por tu referencia!</strong><br/>Valoramos mucho que hayas pensado en alguien para compartir esta oportunidad. Queremos que sepas que uno de nuestros representantes se comunicará directamente con tu referido en las próximas 72 horas para brindarle toda la información sobre el programa y acompañarlo en este proceso.',
            'updated' => 'Actualizado exitosamente',
            'deleted' => 'Eliminado exitosamente',
        ],
        'error' => [
            'loading_failed' => 'Error al cargar los datos',
            'creation_failed' => 'Error al crear el registro',
            'update_failed' => 'Error al actualizar',
            'delete_failed' => 'Error al eliminar',
            'email_exists' => 'Ya existe una solicitud con este correo electrónico',
            'email_exists_pending' => '<strong>Ya existe una solicitud pendiente asociada a este correo electrónico.</strong><br/>Por favor, espera a que uno de nuestros representantes se comunique contigo. El plazo estimado de contacto es de hasta 72 horas.<br/><br/>Si ya ha transcurrido ese tiempo y aún no has recibido respuesta, puedes escribirnos al siguiente número: {phone}.<br/><br/>Agradecemos tu paciencia y tu interés en el programa.',
            'email_exists_previous' => '<strong>Este correo ya ha sido registrado previamente.</strong><br/>Hemos identificado que ya existe una solicitud asociada a este correo electrónico, la cual fue evaluada anteriormente con el siguiente resultado:<br/><br/>{message}',
        ],
        'rejection' => [
            'working' => '<strong>Gracias por tu interés en el programa de FUNVAL.</strong><br/>Debido a la naturaleza intensiva de nuestras capacitaciones, este programa está dirigido a personas que actualmente no tienen empleo.<br/><br/>Si en el futuro te encuentras en búsqueda de un empleo, no dudes en contactarnos nuevamente.<br/><br/>Además, te compartimos los siguientes enlaces sobre organizaciones aliadas a Funval que podrían ser de tu interés: <a href="https://www.the-academy.org/contact/" target="_blank" class="text-blue-600 underline">La Academia</a> y <a href="https://mentorseducation.org/" target="_blank" class="text-blue-600 underline">Mentors</a>.',
            'entrepreneur' => '<strong>¡Excelente!</strong><br/>Muy pronto recibirás información de nuestras organizaciones aliadas especializadas en emprendimiento, quienes comparten con FUNVAL el compromiso de impulsar nuevas oportunidades para personas como tú.<br/><br/>Visita los siguientes enlaces para obtener más información sobre dichas organizaciones: <a href="https://www.the-academy.org/contact/" target="_blank" class="text-blue-600 underline">La Academia</a> y <a href="https://mentorseducation.org/" target="_blank" class="text-blue-600 underline">Mentors</a>.',
            'online_part_time' => '<strong>FUNVAL mantiene alianzas con empresas que requieren modalidad de trabajo presencial.</strong><br/>Si en el futuro esta opción se ajusta a tu situación, no dudes en contactarnos nuevamente. Estaremos encantados de apoyarte en tu proceso de búsqueda laboral.<br/><br/>Además, te compartimos los siguientes enlaces sobre organizaciones aliadas a Funval que podrían ser de tu interés: <a href="https://www.the-academy.org/contact/" target="_blank" class="text-blue-600 underline">La Academia</a> y <a href="https://mentorseducation.org/" target="_blank" class="text-blue-600 underline">Mentors</a>.',
            'part_time' => '<strong>Debido a la intensidad de los programas de FUNVAL</strong>, se requiere que los participantes cuenten con una conexión continua y estén disponibles sin realizar otras actividades en paralelo durante el horario de capacitación.<br/><br/>Si en el futuro esta opción se ajusta a tu situación, no dudes en contactarnos nuevamente. Estaremos encantados de apoyarte en tu proceso de búsqueda laboral.<br/><br/>Además, te compartimos la siguiente información sobre organizaciones aliadas a FUNVAL que pueden ser de tu interés: <a href="https://www.the-academy.org/contact/" target="_blank" class="text-blue-600 underline">La Academia</a> y <a href="https://mentorseducation.org/" target="_blank" class="text-blue-600 underline">Mentors</a>.',
        ],
    ],

    // UI Elements
    'ui' => [
        'buttons' => [
            'save' => 'Guardar',
            'cancel' => 'Cancelar',
            'submit' => 'Enviar',
            'edit' => 'Editar',
            'delete' => 'Eliminar',
            'view' => 'Ver',
            'next' => 'Siguiente',
            'previous' => 'Anterior',
            'finish' => 'Finalizar',
            'continue' => 'Continuar',
        ],
        'labels' => [
            'yes' => 'Sí',
            'no' => 'No',
            'not_specified' => 'No especificado',
            'full_time' => 'Tiempo completo',
            'part_time' => 'Tiempo parcial',
            'years' => 'años',
        ],
        'titles' => [
            'dashboard' => 'Dashboard',
            'pre_inscriptions' => 'Pre-inscripciones',
            'references' => 'Referencias',
            'personal_info' => 'Información Personal',
            'location' => 'Ubicación',
            'work_info' => 'Información Laboral y de Servicio',
            'status_tracking' => 'Estado y Seguimiento',
            'details' => 'Detalles',
            'summary' => 'Resumen',
            'confirmation' => 'Confirmación',
        ],
    ],

    // Navigation
    'navigation' => [
        'dashboard' => 'Dashboard',
        'access_control' => 'Control de Acceso',
        'courses' => 'Cursos',
        'references' => 'Referencias',
        'pre_inscriptions' => 'Pre-Inscripciones',
        'settings' => 'Configuración',
        'profile' => 'Perfil',
        'password' => 'Contraseña',
        'appearance' => 'Apariencia',
    ],

    // Welcome Disclaimer
    'welcome_disclaimer' => [
        'title' => '¡Bienvenido a FUNVAL Internacional!',
        'subtitle' => 'Nos complace recibir tu aplicación o referencia.',
        'program_description' => 'Este programa está dirigido a personas que buscan empleo y están dispuestas a comprometerse con un proceso intensivo de formación, dedicando entre 10 y 12 horas diarias de lunes a viernes.',
        'motivation' => 'Si tú o la persona referida tienen la motivación y el compromiso para alcanzar este objetivo, ¡adelante! Estamos entusiasmados por acompañarlos en la búsqueda de empleo.',
        'privacy' => 'Queremos asegurarte de que toda la información personal será tratada con estricta confidencialidad y no será compartida con terceros sin consentimiento previo.',
        'accept_terms' => 'He leído y acepto los términos y condiciones mencionados anteriormente. Confirmo que la información que proporcionaré es verídica y completa.',
    ],

    // Action Selection
    'action_selection' => [
        'title' => '¿Qué acción deseas realizar?',
        'subtitle' => 'Selecciona una de las siguientes opciones para continuar',
        'referral' => [
            'title' => 'Referir a un amigo',
            'description' => 'Recomienda a alguien que conozcas para que participe de nuestros programas de capacitación para el empleo.',
        ],
        'pre_inscription' => [
            'title' => 'Preinscribirme al curso',
            'description' => 'Completa tu preinscripción para participar en nuestros programas de capacitación para el empleo.',
        ],
    ],

    // Message Step
    'message_step' => [
        'redirecting' => 'Redirigiendo...',
        'confirmation_title' => 'Confirmación de Solicitud',
        'confirmation_subtitle' => 'Hemos recibido tu información correctamente.',
        'back_to_home' => 'Volver al Inicio',
    ],
];
