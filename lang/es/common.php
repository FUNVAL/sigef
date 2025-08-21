<?php

return [
    'enums' => require_once __DIR__ . '/enums.php',
    'forms' => require_once __DIR__ . '/forms.php',
    'messages' => require_once __DIR__ . '/messages.php',
    'stepper' => require_once __DIR__ . '/stepper.php',

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
            'country' => 'País',
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

        'program_description' => [
            'title' => '¿Estas buscando empleo?&nbsp;&nbsp;¡Este Programa es para Ti! ',

            'description' => 'Este programa está dirigido a personas que buscan empleo y están dispuestas a comprometerse con un proceso intensivo de formación, dedicando entre <span class="font-bold text-blue-700">10 y 12 horas diarias de lunes a viernes.<span>'
        ],

        'motivation' => 'Si tú o la persona referida tienen la motivación y el compromiso para alcanzar este objetivo, ¡adelante! Estamos entusiasmados por acompañarlos en la búsqueda de empleo.',

        'privacy' => [
            'title' => 'Privacidad y Confidencialidad',
            'description' => 'Queremos asegurarte que toda la información personal será tratada con estricta confidencialidad y <span class="font-bold text-red-500">no será compartida con terceros sin consentimiento previo.</span>',
        ],

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
