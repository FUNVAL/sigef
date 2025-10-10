<?php

return [
    'enums' => require_once __DIR__ . '/enums.php',
    'forms' => require_once __DIR__ . '/forms.php',
    'messages' => require_once __DIR__ . '/messages.php',
    'stepper' => require_once __DIR__ . '/stepper.php',

    // UI Elements
    'ui' => [
        'buttons' => [
            'save' => 'Sove',
            'cancel' => 'Anile',
            'submit' => 'Soumèt',
            'edit' => 'Modifye',
            'delete' => 'Efase',
            'view' => 'Gade',
            'next' => 'Swivan',
            'previous' => 'Anvan',
            'finish' => 'Fini',
            'continue' => 'Kontinye',
        ],
        'labels' => [
            'yes' => 'Wi',
            'no' => 'Non',
            'not_specified' => 'Pa presize',
            'full_time' => 'Tout tan',
            'part_time' => 'Tan pasyèl',
            'years' => 'ane',
            'country' => 'Peyi'
        ],
        'titles' => [
            'dashboard' => 'Tablo Kòmand',
            'pre_inscriptions' => 'Enskripsyon davans',
            'references' => 'Referans',
            'personal_info' => 'Enfòmasyon Pèsonèl',
            'location' => 'Kote ou ye',
            'work_info' => 'Enfòmasyon Travay ak Sèvis',
            'status_tracking' => 'Estati ak Swivi',
            'details' => 'Detay',
            'summary' => 'Rezime',
            'confirmation' => 'Konfìmasyon',
        ],
    ],

    // Navigation
    'navigation' => [
        'dashboard' => 'Tablo Kòmand',
        'access_control' => 'Kontwòl Aksè',
        'courses' => 'Kou',
        'references' => 'Referans',
        'pre_inscriptions' => 'Enskripsyon davans',
        'settings' => 'Paramèt',
        'profile' => 'Profil',
        'password' => 'Modpas',
        'appearance' => 'Aparans',
    ],

    // Welcome Disclaimer
    'welcome_disclaimer' => [
        'title' => 'Byenveni nan FUNVAL Entènasyonal!',

        'subtitle' => 'Nou kontan resevwa aplikasyon ou an oswa rekòmandasyon zanmi ou a.',

        'program_description' => [
            'title' => 'Vous cherchez un emploi ou connaissez quelqu\'un qui en a besoin ? ',

            'description' => 'Funval vous offre l\'opportunité idéale de vous préparer et d\'exceller sur le marché du travail. Nos formations intensives, à partir de 5 semaines seulement, sont conçues pour vous permettre d\'acquérir les compétences nécessaires à l\'obtention d\'un emploi. Grâce à une approche pratique et un accompagnement continu, vous augmenterez vos chances d\'évoluer sur le marché du travail.<br>
            <span class="text-xl font-bold ">Venez transformer l\'avenir avec Funval ! </span>'
        ],

        'motivation' => 'Si oumenm oswa moun nan refere a gen motivasyon ak angajman pou reyalize objektif sa a, eben vanse! Nou kontan sipòte yo nan rechèch travay yo. ',

        'privacy' => [
            'title' => 'Konfidansyalite ak Konfidansyalite',

            'description' => 'Nou vle asire ou ke tout enfòmasyon pèsonèl yo ap trete ak konfidansyalite estrikt epi <span class="font-bold text-red-500">yo p ap pataje yo ak tyès pati san konsantman anvan.</span>'
        ],

        'accept_terms' => 'Nou vle asire ou ke tout enfòmasyon pèsonèl yo pral trete ak konfidansyalite estrik epi yo pa pral pataje ak okenn pati san konsantman ou anvan.',
    ],

    // Action Selection
    'action_selection' => [
        'title' => 'Ki aksyon ou ta renmen fè?',
        'subtitle' => 'Chwazi youn nan opsyon sa yo pou kontinye',
        'referral' => [
            'title' => 'Refere yon zanmi',
            'description' => 'Partagez cette opportunité et aidez quelqu\'un à faire ses premiers pas vers la formation professionnelle. ',
        ],
        'pre_inscription' => [
            'title' => 'Pre-enskri pou kou a',
            'description' => 'Faites le premier pas et inscrivez-vous pour participer à nos programmes de formation professionnelle.',
        ],
    ],

    // Message Step
    'message_step' => [
        'redirecting' => 'Redireksyon...',
        'confirmation_title' => 'Konfimasyon Demann',
        'confirmation_subtitle' => 'Nou resevwa enfòmasyon ou yo kòrèkteman.',
        'back_to_home' => 'Retounen nan Akèy',
    ],
];
