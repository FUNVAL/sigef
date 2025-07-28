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
            'overview' => [
                'title' => 'Revize done ou yo',
                'subtitle' => 'Verifye ke tout enfòmasyon yo kòrèk anvan ou voye yo',
                'fields' => [
                    'first_name' => 'Premye Non:',
                    'middle_name' => 'Dezyèm Non:',
                    'last_name' => 'Siyati:',
                    'second_last_name' => 'Dezyèm Siyati:',
                    'gender' => 'Sèks:',
                    'age' => 'Laj:',
                    'country' => 'Peyi:',
                    'phone' => 'Telefòn:',
                    'stake' => 'Poto/Distri/Misyon:',
                    'email' => 'Imel:',
                    'marital_status' => 'Estati Sivil:',
                    'served_mission' => 'Ou te sèvi yon misyon?:',
                    'currently_working' => 'Èske w ap travay kounye a?:',
                    'job_type_preference' => 'Ki kalite travay w ap chèche:',
                    'available_full_time' => 'Disponibilite pou travay tout tan:',
                ],
                'buttons' => [
                    'sending' => 'Voye...',
                    'submit' => 'Voye',
                ],
            ],
            'course_selection' => [
                'title' => 'Chwazi Kou Ou',
                'description' => 'Chwazi pwogram fòmasyon ki pi bon pou enterè ak objektif pwofesyonèl ou yo',
                'selected_course' => 'Kou ki chwazi:',
                'selection_confirmation' => 'Ou chwazi kou sa a pou pwosesis pré-enskripsyon ou. Lè w kontinye, w konfime enterè w nan patisipe nan pwogram sa a.',
                'duration' => 'semèn',
            ],
            'female_filter' => [
                'title' => 'Kesyon Evalyasyon',
                'description' => 'Kesyon sa yo ede nou detèmine si pwogram nou yo bon pou ou',
                'currently_working' => 'Èske w ap travay kounye a?',
                'job_type_preference' => 'Ki kalite travay w ap chèche?',
                'available_full_time' => 'Èske ou gen disponibilite pou w etidye nan yon orè klas ki long 10-12 èdtan chak jou soti lendi rive vandredi?',
                'answers' => [
                    'working_yes' => 'Wi, m ap travay kounye a',
                    'working_no' => 'Non, m pa ap travay',
                    'availability_yes' => 'Wi, mwen gen disponibilite konplè',
                    'availability_no' => 'Non, mwen pa gen disponibilite sa a',
                ],
            ],
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
            'referrer_info' => 'Enfòmasyon moun ki rekòmande',
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
            'overview' => [
                'title' => 'Revize done referans yo',
                'fields' => [
                    'full_name' => 'Non konplè:',
                    'gender' => 'Sèks:',
                    'age' => 'Laj:',
                    'country' => 'Peyi:',
                    'phone' => 'Telefòn:',
                    'stake' => 'Poto/Distri/Misyon:',
                    'referrer_name' => 'Non ou:',
                    'referrer_phone' => 'Telefòn ou:',
                    'relationship' => 'Relasyon ak moun ki refere a:',
                ],
                'buttons' => [
                    'sending' => 'Voye...',
                    'submit' => 'Voye referans',
                ],
            ],
        ],
    ],

    // Messages
    'messages' => [
        'success' => [
            'pre_inscription_created' => 'Mèsi pou aplikasyon ou! Youn nan reprezantan nou yo ap kontakte ou nan 72 è k ap vini yo.',
            'reference_created' => '<strong>Mèsi pou referans ou!</strong><br/>Nou apresye anpil ke ou te panse nan yon moun pou pataje opòtinite sa a. Nou vle ou konnen ke youn nan reprezantan nou yo pral kontakte moun ou refere a direkteman nan pwochen 72 èdtan yo pou bay yo tout enfòmasyon sou pwogram nan epi gide yo nan pwosesis sa a.',
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
            'continue' => 'Kontinye',
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

    // Welcome Disclaimer
    'welcome_disclaimer' => [
        'title' => 'Byenveni nan FUNVAL Entènasyonal!',
        'subtitle' => 'Nou kontan resevwa aplikasyon oswa referans ou.',
        'program_description' => 'Pwogram sa a vize moun k ap chèche travay epi ki vle angaje yo nan yon pwosesis fòmasyon entansif, ki dedike ant 10 ak 12 èdtan pa jou soti lendi rive vandredi.',
        'motivation' => 'Si ou menm oswa moun ou rekòmande a gen motivasyon ak angajman pou atenn objektif sa a, ale devan! Nou kontan akonpanye nou nan rechèch travay la.',
        'privacy' => 'Nou vle asire ou ke tout enfòmasyon pèsonèl yo ap trete ak konfidansyalite estrikt epi yo p ap pataje yo ak tyès pati san konsantman anvan.',
        'accept_terms' => 'Mwen li epi aksepte tèm ak kondisyon yo mansyone anwo a. Mwen konfime ke enfòmasyon mwen pral bay yo se verite epi konplè.',
    ],

    // Action Selection
    'action_selection' => [
        'title' => 'Ki aksyon ou ta renmen fè?',
        'subtitle' => 'Chwazi youn nan opsyon sa yo pou kontinye',
        'referral' => [
            'title' => 'Refere yon zanmi',
            'description' => 'Rekòmande yon moun ou konnen pou patisipe nan pwogram fòmasyon travay nou yo.',
        ],
        'pre_inscription' => [
            'title' => 'Pre-enskri pou kou a',
            'description' => 'Konplete pre-enskripsyon ou pou patisipe nan pwogram fòmasyon travay nou yo.',
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
