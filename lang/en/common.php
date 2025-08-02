<?php

return [
    'enums' => require_once __DIR__ . '/enums.php',
    'forms' => require_once __DIR__ . '/forms.php',
    'messages' => require_once __DIR__ . '/messages.php',

    // UI Elements
    'ui' => [
        'buttons' => [
            'save' => 'Save',
            'cancel' => 'Cancel',
            'submit' => 'Submit',
            'edit' => 'Edit',
            'delete' => 'Delete',
            'view' => 'View',
            'next' => 'Next',
            'previous' => 'Previous',
            'finish' => 'Finish',
            'continue' => 'Continue',
        ],
        'labels' => [
            'yes' => 'Yes',
            'no' => 'No',
            'not_specified' => 'Not specified',
            'full_time' => 'Full time',
            'part_time' => 'Part time',
            'years' => 'years',
        ],
        'titles' => [
            'dashboard' => 'Dashboard',
            'pre_inscriptions' => 'Pre-registrations',
            'references' => 'References',
            'personal_info' => 'Personal Information',
            'location' => 'Location',
            'work_info' => 'Work and Service Information',
            'status_tracking' => 'Status and Tracking',
            'details' => 'Details',
            'summary' => 'Summary',
            'confirmation' => 'Confirmation',
        ],
    ],

    // Navigation
    'navigation' => [
        'dashboard' => 'Dashboard',
        'access_control' => 'Access Control',
        'courses' => 'Courses',
        'references' => 'References',
        'pre_inscriptions' => 'Pre-registrations',
        'settings' => 'Settings',
        'profile' => 'Profile',
        'password' => 'Password',
        'appearance' => 'Appearance',
    ],

    // Welcome Disclaimer
    'welcome_disclaimer' => [
        'title' => 'Welcome to FUNVAL International!',
        'subtitle' => 'We\'re pleased to receive your application or your friend\'s referral.',

        'program_description' => [
            'title' => 'Are you looking for a job?&nbsp;&nbsp;This Program is for You!',
            'description' => 'This program is designed for individuals who are seeking employment and are willing to commit to an intensive learning process, dedicating <span class="font-bold text-blue-700">10 to 12 hours a day, Monday through Friday.</span>'
        ],

        'motivation' => 'If you or the person referred have the motivation and commitment to reach this goal, let\'s get started! We are excited to guide you through your job search journey.',

        'privacy' => [
            'title' => 'Privacy and Confidentiality',

            'description' => 'Rest assured that all of your personal information will be handled with strict confidentiality and <span class="font-bold text-red-500">will not be shared with third parties without your prior consent.</span>'
        ],

        'accept_terms' => 'I have read and accept the terms and conditions mentioned above. I confirm that the information I will provide is truthful and complete.',
    ],

    // Action Selection
    'action_selection' => [
        'title' => 'What action would you like to perform?',
        'subtitle' => 'Select one of the following options to continue',
        'referral' => [
            'title' => 'Refer a friend',
            'description' => 'Recommend someone you know to participate in our job training programs.',
        ],
        'pre_inscription' => [
            'title' => 'Pre-register for the course',
            'description' => 'Complete your pre-registration to participate in our job training programs.',
        ],
    ],

    // Message Step
    'message_step' => [
        'redirecting' => 'Redirecting...',
        'confirmation_title' => 'Request Confirmation',
        'confirmation_subtitle' => 'We have received your information correctly.',
        'back_to_home' => 'Back to Home',
    ],
];
