<?php

return [
    // Enums
    'gender' => [
        'male' => 'Male',
        'female' => 'Female',
    ],
    'marital_status' => [
        'single' => 'Single',
        'married' => 'Married',
        'divorced' => 'Divorced',
        'widowed' => 'Widowed',
        'separated' => 'Separated',
    ],
    'course_modality' => [
        'online' => 'Online',
        'in_person' => 'In Person',
        'hybrid' => 'Hybrid',
    ],
    'job_type' => [
        'online' => 'Online',
        'in_person' => 'In Person',
        'own_boss' => 'Entrepreneurship',
    ],
    'status' => [
        'active' => 'Active',
        'inactive' => 'Inactive',
        'deleted' => 'Deleted',
    ],
    'user_status' => [
        'active' => 'Active',
        'inactive' => 'Inactive',
    ],
    'request_status' => [
        'pending' => 'Pending',
        'approved' => 'Approved',
        'rejected' => 'Rejected',
    ],
    'reference_status' => [
        'pending' => 'Pending',
        'approved' => 'Approved',
        'rejected' => 'Rejected',
        'filtered' => 'Filtered',
        'incorrect_number' => 'Incorrect number',
        'work' => 'Work',
        'studies' => 'Studies',
        'not_church_member' => 'Not a church member',
        'future_missionary' => 'Future missionary',
        'health' => 'Health',
        'graduate' => 'Graduate',
        'duplicate' => 'Duplicate',
    ],
    'document_type' => [
        'identity_card' => 'Identity Card',
        'passport' => 'Passport',
        'driver_license' => 'Driver\'s License',
    ],
    'attendance_status' => [
        'present' => 'Present',
        'absent' => 'Absent',
        'late' => 'Late',
        'justified' => 'Justified',
    ],
    'related_reference' => [
        'family' => 'Family',
        'friend' => 'Friend',
        'church_member' => 'Church Member',
        'work_colleague' => 'Work Colleague',
        'other' => 'Other',
    ],

    // Forms
    'forms' => [
        'pre_inscription' => [
            'title' => 'Pre-registration Form',
            'description' => 'Complete your personal information to proceed with your pre-registration',
            'fields' => [
                'first_name' => 'First Name',
                'middle_name' => 'Middle Name',
                'last_name' => 'Last Name',
                'second_last_name' => 'Second Last Name',
                'gender' => 'Gender',
                'age' => 'Age',
                'phone' => 'Phone',
                'email' => 'Email',
                'marital_status' => 'Marital Status',
                'served_mission' => 'Have you served a mission?',
                'country' => 'Country',
                'stake' => 'Stake/District/Mission',
                'currently_working' => 'Currently working?',
                'job_type_preference' => 'Job Type Preference',
                'available_full_time' => 'Full-time Availability',
                'course' => 'Course of Interest',
            ],
            'validation' => [
                'required' => 'This field is required',
                'email' => 'Please enter a valid email',
                'min_age' => 'Must be older than :min years',
                'max_age' => 'Must be younger than :max years',
                'unique' => 'This email is already registered',
            ],
        ],
        'referral' => [
            'title' => 'Reference Form',
            'description' => 'Share the details of the person you want to refer',
            'referrer_info' => 'Referrer Information',
            'fields' => [
                'name' => 'Full name of the referred person',
                'name_placeholder' => 'Full name',
                'gender' => 'Gender',
                'gender_placeholder' => 'Select gender',
                'gender_select' => 'Select a gender',
                'age' => 'Age',
                'country' => 'Country',
                'phone' => 'Phone',
                'stake' => 'Stake/District/Mission',
                'referrer_name' => 'Your Name',
                'referrer_phone' => 'Your Phone',
                'relationship' => 'Relationship with Referred Person',
            ],
            'overview' => [
                'title' => 'Review reference data',
                'fields' => [
                    'full_name' => 'Full name:',
                    'gender' => 'Gender:',
                    'age' => 'Age:',
                    'country' => 'Country:',
                    'phone' => 'Phone:',
                    'stake' => 'Stake/District/Mission:',
                    'referrer_name' => 'Your name:',
                    'referrer_phone' => 'Your phone:',
                    'relationship' => 'Relationship with referred person:',
                ],
                'buttons' => [
                    'sending' => 'Sending...',
                    'submit' => 'Submit reference',
                ],
            ],
        ],

    ],

    // Messages
    'messages' => [
        'success' => [
            'pre_inscription_created' => 'Thank you for your application! One of our representatives will contact you within 72 hours.',
            'reference_created' => 'Thank you for your reference! We really appreciate you thinking of someone to share this opportunity.',
            'updated' => 'Successfully updated',
            'deleted' => 'Successfully deleted',
        ],
        'error' => [
            'loading_failed' => 'Error loading data',
            'creation_failed' => 'Error creating record',
            'update_failed' => 'Error updating',
            'delete_failed' => 'Error deleting',
            'email_exists' => 'A request with this email already exists',
        ],
        'rejection' => [
            'working' => 'Due to Funval\'s intensive training programs, the program is aimed at unemployed people.',
            'entrepreneur' => 'Excellent, you will soon receive more information from organizations allied with FUNVAL that are experts in entrepreneurship.',
            'online_part_time' => 'FUNVAL has partnerships with companies that require people to work in person.',
            'part_time' => 'FUNVAL requires full-time availability for its programs.',
        ],
    ],

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
        'subtitle' => 'We are pleased to receive your application or reference.',
        'program_description' => 'This program is aimed at people who are looking for employment and are willing to commit to an intensive training process, dedicating between 10 and 12 hours daily from Monday to Friday.',
        'motivation' => 'If you or the person you are referring have the motivation and commitment to achieve this goal, go ahead! We are excited to accompany you in your job search.',
        'privacy' => 'We want to assure you that all personal information will be treated with strict confidentiality and will not be shared with third parties without prior consent.',
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
];
