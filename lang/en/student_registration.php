<?php

return [
    'form' => [
        'title' => 'Student Registration Form',
        'subtitle' => 'Complete all steps to finish your registration',
    ],
    'steps' => [
        'personal_information' => [
            'title' => 'Personal Information',
            'subtitle' => 'Complete your basic personal information',
        ],
        'required_documents' => [
            'title' => 'Required Documents',
            'subtitle' => 'Upload the necessary documents for your registration',
        ],
        'religious_information' => [
            'title' => 'Religious/Ecclesiastical Information',
            'subtitle' => 'Complete your religious and ecclesiastical information',
        ],
        'academic_information' => [
            'title' => 'Academic and Professional Information',
            'subtitle' => 'Complete your academic background and professional experience',
        ],
    ],
    'sections' => [
        'names_surnames' => 'Names and Surnames',
        'birth_gender' => 'Birth Date and Gender',
        'location' => 'Location',
        'contact_info' => 'Contact Information',
        
        // Required Documents
        'document_info' => 'Document Information',
        'document_photos' => 'Document Photos',
        'additional_documents' => 'Additional Documents',
        'formal_photo' => 'Formal Photo',
        
        // Religious Information
        'church_membership' => 'Church Membership',
        'missionary_service' => 'Missionary Service',
        'temple_ordinances' => 'Temple Ordinances',
        'ecclesiastical_info' => 'Ecclesiastical Information',
        
        // Academic Information
        'education_background' => 'Educational Background',
        'course_selection' => 'Course Selection',
        'english_proficiency' => 'English Proficiency',
    ],
    'fields' => [
        'first_name' => 'First Name',
        'middle_name' => 'Middle Name',
        'last_name' => 'Last Name',
        'second_last_name' => 'Second Last Name',
        'birth_date' => 'Birth Date',
        'age' => 'Age',
        'gender' => 'Gender',
        'country' => 'Country',
        'marital_status' => 'Marital Status',
        'email' => 'Email Address',
        'phone' => 'Contact Phone',
        'recruiter_name' => 'Recruiter/Responsible',
        'home_location_link' => 'Home Location Link',
        
        // Required Documents
        'document_type' => 'Document Type',
        'document_number' => 'Document Number',
        'id_front_photo' => 'Document Front Photo',
        'id_back_photo' => 'Document Back Photo',
        'driver_license' => 'Driver License',
        'utility_bill_photo' => 'Utility Bill',
        'formal_photo' => 'Formal Photo (White Background)',
        
        // Religious Information
        'is_active_member' => 'Active Church Member',
        'member_certificate_number' => 'Member Certificate Number',
        'baptism_year' => 'Baptism Year',
        'is_returned_missionary' => 'Returned Missionary',
        'mission_served' => 'Mission Served',
        'mission_end_year' => 'Mission End Year',
        'temple_status' => 'Temple Status',
        'current_calling' => 'Current Calling',
        'stake' => 'Stake',
        'ward_branch' => 'Ward/Branch',
        
        // Academic Information
        'education_level' => 'Education Level',
        'course' => 'Course',
        'english_connect_level' => 'English Connect Level',
    ],
    'placeholders' => [
        'first_name' => 'Enter your first name',
        'middle_name' => 'Enter your middle name (optional)',
        'last_name' => 'Enter your last name',
        'second_last_name' => 'Enter your second last name (optional)',
        'select_gender' => 'Select your gender',
        'select_country' => 'Select your country',
        'select_marital_status' => 'Select your marital status',
        'email' => 'example@email.com',
        'phone' => 'Enter your phone number',
        'recruiter_name' => 'Recruiter name (optional)',
        'home_location_link' => 'https://maps.google.com/... (optional)',
        'age_automatic' => 'Calculated automatically',
    ],
    'validation' => [
        'first_name_required' => 'First name is required',
        'last_name_required' => 'Last name is required',
        'birth_date_required' => 'Birth date is required',
        'gender_required' => 'Gender is required',
        'country_required' => 'Country is required',
        'marital_status_required' => 'Marital status is required',
        'email_required' => 'Email address is required',
        'phone_required' => 'Phone number is required',
    ],
    'required' => 'required',
    'optional' => 'optional',
    
    'info_text' => [
        'upload_requirements' => 'Allowed formats: JPEG, PNG. Maximum size: 5MB',
        'formal_photo_requirements' => 'Photo must have white background and clearly show your face',
        'document_security' => 'Your documents are secure and will only be used for verification',
        'age_calculation' => 'Age is automatically calculated based on your birth date',
        'optional_fields' => 'Fields marked as optional can be left blank',
    ],
    
    'file_upload' => [
        'drag_drop' => 'Drag and drop file here, or click to select',
        'browse_files' => 'Browse files',
        'file_selected' => 'File selected',
        'remove_file' => 'Remove file',
        'upload_progress' => 'Uploading file...',
        'upload_success' => 'File uploaded successfully',
        'upload_error' => 'Error uploading file',
    ],
    
    'confirmation' => [
        'verify_info' => 'Please verify all information is correct before submitting',
        'terms_acceptance' => 'By submitting this form, I accept the terms and conditions',
        'submit_form' => 'Submit Registration',
        'processing' => 'Processing...',
    ],
];