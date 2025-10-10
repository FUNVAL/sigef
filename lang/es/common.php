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
            'pre_inscriptions' => 'Preinscripciones',
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
        'pre_inscriptions' => 'Preinscripciones',
        'settings' => 'Configuración',
        'profile' => 'Perfil',
        'password' => 'Contraseña',
        'appearance' => 'Apariencia',
    ],

    // Welcome Disclaimer
    'welcome_disclaimer' => [
        'title' => '¡Bienvenido a FUNVAL Internacional!',

        'subtitle' => 'Nos alegra recibir tu aplicación o la referencia de tu amigo(a).',

        'program_description' => [
            'title' => '¿Estás buscando trabajo o conoces a alguien que lo necesite?',

            'description' => 'Funval, proporciona la oportunidad perfecta para prepararte y destacar en el mercado laboral. Nuestros cursos intensivos, a partir de solo 5 semanas, están diseñados para brindar las competencias necesarias para obtener un empleo formal. Con un enfoque práctico y un acompañamiento constante, aumentarás tus posibilidades de crecer en el mundo laboral.<br>
            <span class="text-xl font-bold ">¡Ven y transforma el futuro con Funval!</span> '
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
            'description' => 'Comparte esta oportunidad y ayuda a que alguien más pueda dar su primer paso hacia la capacitación para el empleo.',
        ],
        'pre_inscription' => [
            'title' => 'Preinscribirme al curso',
            'description' => 'Da tu primer paso y regístrate para acceder a la posibilidad de participar en nuestros programas de capacitación para el empleo.',
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
