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
            'overview' => [
                'title' => 'Review your data',
                'subtitle' => 'Verify that all information is correct before submitting',
                'fields' => [
                    'first_name' => 'First Name:',
                    'middle_name' => 'Middle Name:',
                    'last_name' => 'Last Name:',
                    'second_last_name' => 'Second Last Name:',
                    'gender' => 'Gender:',
                    'age' => 'Age:',
                    'country' => 'Country:',
                    'phone' => 'Phone:',
                    'stake' => 'Stake/District/Mission:',
                    'email' => 'Email:',
                    'marital_status' => 'Marital Status:',
                    'served_mission' => 'Have you served a mission?:',
                    'currently_working' => 'Are you currently working?:',
                    'job_type_preference' => 'Type of employment you are looking for:',
                    'available_full_time' => 'Availability to work full time:',
                ],
                'buttons' => [
                    'sending' => 'Sending...',
                    'submit' => 'Submit',
                ],
            ],
            'course_selection' => [
                'title' => 'Select Your Course',
                'description' => 'Choose the training program that best fits your interests and professional goals',
                'selected_course' => 'Selected course:',
                'selection_confirmation' => 'You have selected this course for your pre-registration process. By continuing, you confirm your interest in participating in this program.',
                'duration' => 'weeks',
            ],
            'female_filter' => [
                'title' => 'Evaluation Questions',
                'description' => 'These questions help us determine if our programs are suitable for you',
                'currently_working' => 'Are you currently working?',
                'job_type_preference' => 'What type of employment are you looking for?',
                'available_full_time' => 'Do you have availability to study in an extended class schedule of 10-12 hours daily from Monday to Friday?',
                'answers' => [
                    'working_yes' => 'Yes, I am currently working',
                    'working_no' => 'No, I am not working',
                    'availability_yes' => 'Yes, I have full availability',
                    'availability_no' => 'No, I do not have that availability',
                ],
            ],
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
            'pre_inscription_success' => '<strong>Thank you for your application!</strong><br/>One of our representatives will contact you within the next 72 hours to provide you with all the information about the program and resolve any questions you may have.<br/><br/>We appreciate your interest and are excited to accompany you in this process.',
            'reference_created' => '<strong>Thank you for your reference!</strong><br/>We really appreciate you thinking of someone to share this opportunity. We want you to know that one of our representatives will contact your referred person directly within the next 72 hours to provide them with all the information about the program and guide them through this process.',
            'updated' => 'Successfully updated',
            'deleted' => 'Successfully deleted',
        ],
        'error' => [
            'loading_failed' => 'Error loading data',
            'creation_failed' => 'Error creating record',
            'update_failed' => 'Error updating',
            'delete_failed' => 'Error deleting',
            'email_exists' => 'A request with this email already exists',
            'email_exists_pending' => '<strong>There is already a pending request associated with this email address.</strong><br/>Please wait for one of our representatives to contact you. The estimated contact time is up to 72 hours.<br/><br/>If that time has already passed and you still haven\'t received a response, you can write to us at the following number: {phone}.<br/><br/>We appreciate your patience and your interest in the program.',
            'email_exists_previous' => '<strong>This email has been previously registered.</strong><br/>We have identified that there is already a request associated with this email address, which was previously evaluated with the following result:<br/><br/>{message}',
        ],
        'rejection' => [
            'working' => '<strong>Thank you for your interest in the FUNVAL program.</strong><br/>Due to the intensive nature of our training, this program is aimed at people who are currently unemployed.<br/><br/>If in the future you find yourself looking for employment, please don\'t hesitate to contact us again.<br/><br/>Additionally, we share the following links about organizations allied with Funval that might be of interest to you: <a href="https://www.the-academy.org/contact/" target="_blank" class="text-blue-600 underline">The Academy</a> and <a href="https://mentorseducation.org/" target="_blank" class="text-blue-600 underline">Mentors</a>.',
            'entrepreneur' => '<strong>Excellent!</strong><br/>You will soon receive information from our allied organizations specialized in entrepreneurship, who share with FUNVAL the commitment to promote new opportunities for people like you.<br/><br/>Visit the following links to get more information about these organizations: <a href="https://www.the-academy.org/contact/" target="_blank" class="text-blue-600 underline">The Academy</a> and <a href="https://mentorseducation.org/" target="_blank" class="text-blue-600 underline">Mentors</a>.',
            'online_part_time' => '<strong>FUNVAL maintains partnerships with companies that require in-person work modality.</strong><br/>If in the future this option fits your situation, please don\'t hesitate to contact us again. We will be delighted to support you in your job search process.<br/><br/>Additionally, we share the following links about organizations allied with Funval that might be of interest to you: <a href="https://www.the-academy.org/contact/" target="_blank" class="text-blue-600 underline">The Academy</a> and <a href="https://mentorseducation.org/" target="_blank" class="text-blue-600 underline">Mentors</a>.',
            'part_time' => '<strong>Due to the intensity of FUNVAL programs</strong>, participants are required to have a continuous connection and be available without performing other activities in parallel during training hours.<br/><br/>If in the future this option fits your situation, please don\'t hesitate to contact us again. We will be delighted to support you in your job search process.<br/><br/>Additionally, we share the following information about organizations allied with FUNVAL that may be of interest to you: <a href="https://www.the-academy.org/contact/" target="_blank" class="text-blue-600 underline">The Academy</a> and <a href="https://mentorseducation.org/" target="_blank" class="text-blue-600 underline">Mentors</a>.',
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

    // Message Step
    'message_step' => [
        'redirecting' => 'Redirecting...',
        'confirmation_title' => 'Request Confirmation',
        'confirmation_subtitle' => 'We have received your information correctly.',
        'back_to_home' => 'Back to Home',
    ],
];
