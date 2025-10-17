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
        'religious_information' => [
            'title' => 'Informações Eclesiásticas',
            'subtitle' => 'Complete suas informações religiosas e eclesiásticas',
        ],
        'required_documents' => [
            'title' => 'Documentos Obrigatórios',
            'subtitle' => 'Faça upload dos documentos necessários para seu registro',
        ],
        'agreements' => [
            'title' => 'Acordos e Termos',
            'subtitle' => 'Leia e aceite os termos e condições',
        ],
        'overview' => [
            'title' => 'Resumo da Inscrição',
            'subtitle' => 'Revise suas informações antes de enviar',
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
        'church_membership' => 'Membresia da Igreja',
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
        'address' => 'Endereço',
        'province_state' => 'Estado/Departamento/Província',
        'recruiter_name' => 'Recrutador/Responsável',
        'home_location_link' => 'Localização da Casa',
        'facebook_profile' => 'Perfil do Facebook (URL)',
        'pathway_level' => 'Está estudando Pathway?',
        'college_status' => 'Está estudando na BYU ou Ensign College?',
        
        // Required Documents
        'document_type' => 'Tipo de Documento',
        'document_number' => 'Número do Documento',
        'id_front_photo' => 'Foto Frontal do Documento',
        'id_back_photo' => 'Foto Traseira do Documento',
        'driver_license' => 'Carteira de Motorista',
        'utility_bill_photo' => 'Conta de Serviços Públicos',
        'formal_photo' => 'Foto Formal (Fundo Branco)',
        
        // Religious Information
        'is_active_member' => 'Membro Ativo da Igreja',
        'member_certificate_number' => 'Número do Certificado de Membro',
        'baptism_year' => 'Ano do Batismo',
        'is_returned_missionary' => 'Missionário de Retorno',
        'mission_served' => 'Missão Servida',
        'mission_end_year' => 'Ano de Término da Missão',
        'temple_status' => 'Status do Templo',
        'current_calling' => 'Chamado Atual',
        'stake' => 'Estaca',
        'ward_branch' => 'Ala/Ramo',
        'auxiliar_president' => 'Nome Presidente(a) de Quórum / AUX',
        'auxiliary_president_phone' => 'Telefone do Presidente Auxiliar',
        
        // Academic Information
        'education_level' => 'Nível Educacional',
        'course' => 'Curso',
        'english_connect_level' => 'Nível English Connect',
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
        'address' => 'Digite seu endereço completo',
        'province_state' => 'Digite seu estado, departamento ou província',
        'recruiter_name' => 'Nome do recrutador (opcional)',
        'home_location_link' => 'https://maps.google.com/... (opcional)',
        'facebook_profile' => 'https://www.facebook.com/seu.nome.usuario',
        'age_automatic' => 'Calculado automaticamente',
        
        // Required Documents
        'select_document_type' => 'Selecione o tipo de documento',
        'document_number' => 'Digite o número do documento',
        'upload_id_front' => 'Faça upload da foto frontal do seu documento',
        'upload_id_back' => 'Faça upload da foto traseira do seu documento',
        'upload_driver_license' => 'Faça upload da sua carteira de motorista (opcional)',
        'upload_utility_bill' => 'Faça upload da conta de serviços públicos',
        'upload_formal_photo' => 'Faça upload da sua foto formal com fundo branco',
        
        // Religious Information
        'member_certificate_number' => 'Número do certificado (opcional)',
        'baptism_year' => 'Ano do batismo (opcional)',
        'mission_served' => 'Nome da missão servida (opcional)',
        'mission_end_year' => 'Ano de término (opcional)',
        'select_temple_status' => 'Selecione seu status do templo',
        'current_calling' => 'Seu chamado atual (opcional)',
        'select_stake' => 'Selecione sua estaca',
        'ward_branch' => 'Nome da ala ou ramo (opcional)',
        'auxiliar_president' => 'Nome do Presidente(a) de Quórum / AUX',
        'auxiliary_president_phone' => 'Seu número de telefone',
        
        // Academic Information
        'select_education_level' => 'Selecione seu nível educacional',
        'select_course' => 'Selecione o curso',
        'select_english_level' => 'Selecione seu nível English Connect',
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
        
        // Required Documents
        'document_type_required' => 'O tipo de documento é obrigatório',
        'document_number_required' => 'O número do documento é obrigatório',
        'id_front_photo_required' => 'A foto frontal do documento é obrigatória',
        'id_back_photo_required' => 'A foto traseira do documento é obrigatória',
        'utility_bill_photo_required' => 'A conta de serviços públicos é obrigatória',
        'formal_photo_required' => 'A foto formal é obrigatória',
        
        // Religious Information
        'is_active_member_required' => 'Deve especificar se é membro ativo',
        'is_returned_missionary_required' => 'Deve especificar se é missionário de retorno',
        'temple_status_required' => 'O status do templo é obrigatório',
        'stake_required' => 'A estaca é obrigatória',
        
        // Academic Information
        'education_level_required' => 'O nível educacional é obrigatório',
        'course_required' => 'O curso é obrigatório',
        'english_connect_level_required' => 'O nível English Connect é obrigatório',
        
        // Religious Information - Additional
        'member_number_required' => 'O número do certificado de membro é obrigatório',
        'member_number_format' => 'O número do certificado deve ter o formato completo: XXX-XXXX-XXXX (3-4-4 caracteres)',
        'mission_served_required' => 'Deve especificar em qual missão serviu',
        'mission_end_year_required' => 'Deve especificar o ano em que terminou a missão',
    ],
    'labels' => [
        'not_member' => 'Ainda não sou membro',
    ],
    'required' => 'obrigatório',
    'optional' => 'opcional',
    
    'info_text' => [
        'upload_requirements' => 'Formatos permitidos: JPEG, PNG. Tamanho máximo: 5MB',
        'formal_photo_requirements' => 'A foto deve ter fundo branco e mostrar claramente seu rosto',
        'document_security' => 'Seus documentos estão seguros e serão usados apenas para verificação',
        'age_calculation' => 'A idade é calculada automaticamente baseada na sua data de nascimento',
        'optional_fields' => 'Campos marcados como opcionais podem ser deixados em branco',
    ],
    
    'file_upload' => [
        'drag_drop' => 'Arraste e solte o arquivo aqui, ou clique para selecionar',
        'browse_files' => 'Procurar arquivos',
        'file_selected' => 'Arquivo selecionado',
        'remove_file' => 'Remover arquivo',
        'upload_progress' => 'Carregando arquivo...',
        'upload_success' => 'Arquivo carregado com sucesso',
        'upload_error' => 'Erro ao carregar arquivo',
    ],
    
    'confirmation' => [
        'verify_info' => 'Verifique se todas as informações estão corretas antes de enviar',
        'terms_acceptance' => 'Ao enviar este formulário, aceito os termos e condições',
        'submit_form' => 'Enviar Registro',
        'processing' => 'Processando...',
    ],

    // Agreements Section
    'agreements' => [
        'title_prefix' => 'Acordo',
        'title_suffix' => 'de',
        'read_timer' => 'Começar Leitura',
        'timer_seconds' => 's',
        'reading_progress' => 'Lendo...',
        'seconds_remaining' => 's restantes',
        'accept_checkbox' => 'Li e aceito este acordo',
        'next_agreement' => 'Próximo Acordo',
        'previous_agreement' => 'Acordo Anterior',
        'finalize_registration' => 'Finalizar Inscrição',
        'all_agreements_accepted' => '✅ Todos os acordos foram aceitos',
        'progress_status' => 'Progresso:',
        'agreements_accepted' => 'acordos aceitos',

        'terms_title' => 'Termos e Condições de Inscrição',
        'privacy_title' => 'Política de Privacidade e Uso de Dados',
        'conduct_title' => 'Código de Conduta e Valores Institucionais',
        'health_title' => 'Declaração de Saúde e Compromisso Acadêmico',

        'health_form' => [
            'title' => 'Declaração de Saúde',
            'main_question' => 'Você tem atualmente ou já teve alguma vez doenças físicas, mentais ou emocionais que dificultariam manter um horário intensivo de estudo, que requer entre 8 e 10 horas diárias de concentração, leitura, análise, trabalho no computador e outras atividades similares?',
            'yes' => 'Sim',
            'no' => 'Não',
            'medication_info' => 'Informações sobre Medicamentos',
            'medication_question' => 'Atualmente você toma algum tipo de medicamento relacionado a alguma das seguintes condições?',
            'medication_none' => 'Não tomo nenhum medicamento atualmente',
            'medication_physical' => 'Sim, para uma condição física crônica (ex. diabetes, hipertensão, epilepsia, problemas respiratórios, etc.)',
            'medication_emotional' => 'Sim, para uma condição emocional (ex. ansiedade, depressão, transtornos do humor, etc.)',
            'medication_mental' => 'Sim, para uma condição mental ou neurológica (ex. TDAH, transtornos do sono, bipolaridade, etc.)',
            'medication_other' => 'Sim, mas não relacionado a nenhuma das categorias anteriores',
            'medication_specify' => 'Especifique o tipo de medicamento',
            'medication_frequency' => 'Com que frequência você toma o medicamento?',
            'frequency_daily' => 'Diariamente',
            'frequency_weekly' => 'Semanal',
            'frequency_biweekly' => 'Quinzenal',
            'frequency_monthly' => 'Mensal',
            'frequency_quarterly' => 'A cada 3 meses',
            'frequency_biannual' => 'A cada 6 meses',
            'frequency_as_needed' => 'Apenas quando necessário',
        ],
    ],

    // Overview Section
    'overview' => [
        'title' => 'Resumo da Inscrição',
        'subtitle' => 'Revise suas informações antes de enviar',
        'personal_info' => 'Informações Pessoais',
        'religious_info' => 'Informações Religiosas',
        'documents_info' => 'Documentos',
        'agreements_info' => 'Acordos',
        'submit_button' => 'Finalizar Inscrição',
        'previous_button' => 'Anterior',
        'submitting' => 'Enviando...',
        'edit' => 'Editar',
    ],

    // Additional Labels
    'labels' => [
        'required_field' => 'Campo obrigatório',
        'optional_field' => 'Campo opcional',
        'location_obtained' => '✓ Localização obtida',
        'location_capture' => 'Clique no "Ícone" para enviar sua localização atual',
        'location_registered' => '✓ Localização registrada com sucesso',
        'pathway_no' => 'Não estou estudando Pathway',
        'pathway_current' => 'Sim, estou cursando Pathway',
        'pathway_completed' => 'Completei Pathway',
        'college_none' => 'Nenhum dos dois',
        'college_byu' => 'Sim, estou estudando na BYU',
        'college_ensign' => 'Sim, estou estudando no Ensign College',
        'take_photo' => 'Tirar Foto com Câmera',
        'change_file' => 'Alterar arquivo',
        'file_selected' => 'Arquivo selecionado',
        'file_name' => 'Nome:',
        'file_size' => 'Tamanho:',
        'mb_unit' => 'MB',
    ],
];