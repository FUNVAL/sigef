<?php

return [
    // Enums
    'gender' => [
        'male' => 'Gason',
        'female' => 'Fi',
    ],
    'marital_status' => [
        'single' => 'Selibatè',
        'married' => 'Marye',
        'divorced' => 'Divòse',
        'widowed' => 'Vèv',
        'separated' => 'Separe',
    ],
    'course_modality' => [
        'online' => 'Sou Entènèt',
        'in_person' => 'Nan Pèsòn',
        'hybrid' => 'Melanje',
    ],
    'job_type' => [
        'online' => 'Sou Entènèt',
        'in_person' => 'Nan Pèsòn',
        'own_boss' => 'Antreprenè',
    ],
    'status' => [
        'active' => 'Aktif',
        'inactive' => 'Inaktif',
        'deleted' => 'Efase',
    ],
    'user_status' => [
        'active' => 'Aktif',
        'inactive' => 'Inaktif',
    ],
    'request_status' => [
        'pending' => 'K ap Tann',
        'approved' => 'Aksepte',
        'rejected' => 'Rejte',
    ],
    'reference_status' => [
        'pending' => 'K ap Tann',
        'approved' => 'Aksepte',
        'rejected' => 'Rejte',
        'filtered' => 'Filtre',
        'incorrect_number' => 'Nimewo ki pa kòrèk',
        'work' => 'Travay',
        'studies' => 'Etid',
        'not_church_member' => 'Se pa manm legliz',
        'future_missionary' => 'Misyonè nan lavni',
        'health' => 'Sante',
        'graduate' => 'Diplome',
        'duplicate' => 'Doub',
    ],
    'document_type' => [
        'identity_card' => 'Kat Idantite',
        'passport' => 'Paspò',
        'driver_license' => 'Lisans Kondwi',
    ],
    'attendance_status' => [
        'present' => 'Prezan',
        'absent' => 'Absan',
        'late' => 'An Reta',
        'justified' => 'Jistifye',
    ],
    'related_reference' => [
        'family' => 'Fanmi',
        'friend' => 'Zanmi',
        'church_member' => 'Manm Legliz',
        'work_colleague' => 'Kòlèg Travay',
        'other' => 'Lòt',
    ],

    // Forms
    'forms' => [
        'pre_inscription' => [
            'title' => 'Fòm Pré-enskripsyon',
            'description' => 'Ranpli enfòmasyon pèsonèl ou yo pou w kontinye ak pré-enskripsyon ou an',
            'fields' => [
                'first_name' => 'Premye Non',
                'middle_name' => 'Dezyèm Non',
                'last_name' => 'Siyati',
                'second_last_name' => 'Dezyèm Siyati',
                'gender' => 'Sèks',
                'age' => 'Laj',
                'phone' => 'Telefòn',
                'email' => 'Imel',
                'marital_status' => 'Estati Sivil',
                'served_mission' => 'Ou te sèvi yon misyon?',
                'country' => 'Peyi',
                'stake' => 'Poto/Distri/Misyon',
                'currently_working' => 'K ap travay kounye a?',
                'job_type_preference' => 'Preferans Kalite Travay',
                'available_full_time' => 'Disponibilite Tout Tan',
                'course' => 'Kou ki Enterese',
            ],
            'validation' => [
                'required' => 'Jaden sa a obligatwa',
                'email' => 'Tanpri antre yon imel ki valab',
                'min_age' => 'Dwe pi gran pase :min ane',
                'max_age' => 'Dwe pi piti pase :max ane',
                'unique' => 'Imel sa a deja anrejistre',
            ],
        ],
        'referral' => [
            'title' => 'Fòm Referans',
            'description' => 'Pataje done moun ou vle rekòmande a',
            'fields' => [
                'name' => 'Non konplè moun yo rekòmande a',
                'name_placeholder' => 'Non konplè',
                'gender' => 'Sèks',
                'gender_placeholder' => 'Chwazi sèks',
                'gender_select' => 'Chwazi yon sèks',
                'age' => 'Laj',
                'country' => 'Peyi',
                'phone' => 'Telefòn',
                'stake' => 'Poto/Distri/Misyon',
                'referrer_name' => 'Non Ou',
                'referrer_phone' => 'Telefòn Ou',
                'relationship' => 'Relasyon ak Moun nan',
            ],
        ],
    ],

    // Messages
    'messages' => [
        'success' => [
            'pre_inscription_created' => 'Mèsi pou aplikasyon ou! Youn nan reprezantan nou yo ap kontakte ou nan 72 è k ap vini yo.',
            'reference_created' => 'Mèsi pou referans ou! Nou apresye anpil ke ou te panse nan yon moun pou pataje opòtinite sa a.',
            'updated' => 'Mete ajou ak siksè',
            'deleted' => 'Efase ak siksè',
        ],
        'error' => [
            'loading_failed' => 'Erè nan chaje done yo',
            'creation_failed' => 'Erè nan kreye dosye a',
            'update_failed' => 'Erè nan mete ajou',
            'delete_failed' => 'Erè nan efase',
            'email_exists' => 'Gen yon demann ki deja egziste ak imel sa a',
        ],
        'rejection' => [
            'working' => 'Akòz pwogram entansif Funval yo, pwogram nan vize moun ki pa gen travay.',
            'entrepreneur' => 'Ekselan, ou ap resevwa plis enfòmasyon nan òganizasyon ki alye ak FUNVAL yo ki ekspè nan antreprenè.',
            'online_part_time' => 'FUNVAL gen patnèrya ak konpayi ki mande moun yo travay nan pèsòn.',
            'part_time' => 'FUNVAL mande disponibilite tout tan pou pwogram li yo.',
        ],
    ],

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
        ],
        'labels' => [
            'yes' => 'Wi',
            'no' => 'Non',
            'not_specified' => 'Pa presize',
            'full_time' => 'Tout tan',
            'part_time' => 'Tan pasyèl',
            'years' => 'ane',
        ],
        'titles' => [
            'dashboard' => 'Tablo Kòmand',
            'pre_inscriptions' => 'Pré-enskripsyon',
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
        'pre_inscriptions' => 'Pré-enskripsyon',
        'settings' => 'Paramèt',
        'profile' => 'Profil',
        'password' => 'Modpas',
        'appearance' => 'Aparans',
    ],
];
