<?php

return [
    'form' => [
        'title' => 'Formulário de Registro de Estudante',
        'subtitle' => 'Complete todas as etapas para finalizar seu registro',
    ],
    'steps' => [
        'personal_information' => [
            'title' => 'Informações Pessoais',
            'subtitle' => 'Complete suas informações pessoais básicas',
        ],
        'required_documents' => [
            'title' => 'Documentos Obrigatórios',
            'subtitle' => 'Faça upload dos documentos necessários para seu registro',
        ],
        'religious_information' => [
            'title' => 'Informações Religiosas/Eclesiásticas',
            'subtitle' => 'Complete suas informações religiosas e eclesiásticas',
        ],
        'academic_information' => [
            'title' => 'Informações Acadêmicas e Profissionais',
            'subtitle' => 'Complete sua formação acadêmica e experiência profissional',
        ],
    ],
    'sections' => [
        'names_surnames' => 'Nomes e Sobrenomes',
        'birth_gender' => 'Data de Nascimento e Gênero',
        'location' => 'Localização',
        'contact_info' => 'Informações de Contato',
        
        // Required Documents
        'document_info' => 'Informações do Documento',
        'document_photos' => 'Fotos dos Documentos',
        'additional_documents' => 'Documentos Adicionais',
        'formal_photo' => 'Foto Formal',
        
        // Religious Information
        'church_membership' => 'Membresía da Igreja',
        'missionary_service' => 'Serviço Missionário',
        'temple_ordinances' => 'Ordenanças do Templo',
        'ecclesiastical_info' => 'Informações Eclesiásticas',
        
        // Academic Information
        'education_background' => 'Formação Educacional',
        'course_selection' => 'Seleção de Curso',
        'english_proficiency' => 'Proficiência em Inglês',
    ],
    'fields' => [
        'first_name' => 'Primeiro Nome',
        'middle_name' => 'Nome do Meio',
        'last_name' => 'Sobrenome',
        'second_last_name' => 'Segundo Sobrenome',
        'birth_date' => 'Data de Nascimento',
        'age' => 'Idade',
        'gender' => 'Gênero',
        'country' => 'País',
        'marital_status' => 'Estado Civil',
        'email' => 'Endereço de Email',
        'phone' => 'Telefone de Contato',
        'recruiter_name' => 'Recrutador/Responsável',
        'home_location_link' => 'Link da Localização da Casa',
    ],
    'placeholders' => [
        'first_name' => 'Digite seu primeiro nome',
        'middle_name' => 'Digite seu nome do meio (opcional)',
        'last_name' => 'Digite seu sobrenome',
        'second_last_name' => 'Digite seu segundo sobrenome (opcional)',
        'select_gender' => 'Selecione seu gênero',
        'select_country' => 'Selecione seu país',
        'select_marital_status' => 'Selecione seu estado civil',
        'email' => 'exemplo@email.com',
        'phone' => 'Digite seu número de telefone',
        'recruiter_name' => 'Nome do recrutador (opcional)',
        'home_location_link' => 'https://maps.google.com/... (opcional)',
        'age_automatic' => 'Calculado automaticamente',
    ],
    'validation' => [
        'first_name_required' => 'O primeiro nome é obrigatório',
        'last_name_required' => 'O sobrenome é obrigatório',
        'birth_date_required' => 'A data de nascimento é obrigatória',
        'gender_required' => 'O gênero é obrigatório',
        'country_required' => 'O país é obrigatório',
        'marital_status_required' => 'O estado civil é obrigatório',
        'email_required' => 'O endereço de email é obrigatório',
        'phone_required' => 'O número de telefone é obrigatório',
    ],
    'required' => 'obrigatório',
    'optional' => 'opcional',
];