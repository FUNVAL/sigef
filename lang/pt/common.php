<?php

return [
    // Enums
    'gender' => [
        'male' => 'Masculino',
        'female' => 'Feminino',
    ],
    'marital_status' => [
        'single' => 'Solteiro',
        'married' => 'Casado',
        'divorced' => 'Divorciado',
        'widowed' => 'Viúvo',
        'separated' => 'Separado',
    ],
    'course_modality' => [
        'online' => 'Online',
        'in_person' => 'Presencial',
        'hybrid' => 'Híbrido',
    ],
    'job_type' => [
        'online' => 'Online',
        'in_person' => 'Presencial',
        'own_boss' => 'Empreendedorismo',
    ],
    'status' => [
        'active' => 'Ativo',
        'inactive' => 'Inativo',
        'deleted' => 'Excluído',
    ],
    'user_status' => [
        'active' => 'Ativo',
        'inactive' => 'Inativo',
    ],
    'request_status' => [
        'pending' => 'Pendente',
        'approved' => 'Aprovado',
        'rejected' => 'Rejeitado',
    ],
    'reference_status' => [
        'pending' => 'Pendente',
        'approved' => 'Aprovado',
        'rejected' => 'Rejeitado',
        'filtered' => 'Filtrado',
        'incorrect_number' => 'Número incorreto',
        'work' => 'Trabalho',
        'studies' => 'Estudos',
        'not_church_member' => 'Não é membro da igreja',
        'future_missionary' => 'Futuro missionário',
        'health' => 'Saúde',
        'graduate' => 'Graduado',
        'duplicate' => 'Duplicado',
    ],
    'document_type' => [
        'identity_card' => 'Carteira de Identidade',
        'passport' => 'Passaporte',
        'driver_license' => 'Carteira de Motorista',
    ],
    'attendance_status' => [
        'present' => 'Presente',
        'absent' => 'Ausente',
        'late' => 'Atrasado',
        'justified' => 'Justificado',
    ],
    'related_reference' => [
        'family' => 'Família',
        'friend' => 'Amigo',
        'church_member' => 'Membro da Igreja',
        'work_colleague' => 'Colega de Trabalho',
        'other' => 'Outro',
    ],

    // Forms
    'forms' => [
        'pre_inscription' => [
            'title' => 'Formulário de Pré-inscrição',
            'description' => 'Complete suas informações pessoais para prosseguir com sua pré-inscrição',
            'fields' => [
                'first_name' => 'Primeiro Nome',
                'middle_name' => 'Segundo Nome',
                'last_name' => 'Sobrenome',
                'second_last_name' => 'Segundo Sobrenome',
                'gender' => 'Gênero',
                'age' => 'Idade',
                'phone' => 'Telefone',
                'email' => 'Email',
                'marital_status' => 'Estado Civil',
                'served_mission' => 'Serviu uma missão?',
                'country' => 'País',
                'stake' => 'Estaca/Distrito/Missão',
                'currently_working' => 'Trabalhando atualmente?',
                'job_type_preference' => 'Preferência de Trabalho',
                'available_full_time' => 'Disponibilidade em Tempo Integral',
                'course' => 'Curso de Interesse',
            ],
            'validation' => [
                'required' => 'Este campo é obrigatório',
                'email' => 'Digite um email válido',
                'min_age' => 'Deve ser maior que :min anos',
                'max_age' => 'Deve ser menor que :max anos',
                'unique' => 'Este email já está registrado',
            ],
        ],
        'referral' => [
            'title' => 'Formulário de Referência',
            'description' => 'Compartilhe os dados da pessoa que deseja indicar',
            'fields' => [
                'name' => 'Nome completo da pessoa indicada',
                'name_placeholder' => 'Nome completo',
                'gender' => 'Gênero',
                'gender_placeholder' => 'Selecionar gênero',
                'gender_select' => 'Selecione um gênero',
                'age' => 'Idade',
                'country' => 'País',
                'phone' => 'Telefone',
                'stake' => 'Estaca/Distrito/Missão',
                'referrer_name' => 'Seu Nome',
                'referrer_phone' => 'Seu Telefone',
                'relationship' => 'Relacionamento com a Pessoa Indicada',
            ],
        ],
    ],

    // Messages
    'messages' => [
        'success' => [
            'pre_inscription_created' => 'Obrigado pela sua candidatura! Um de nossos representantes entrará em contato em até 72 horas.',
            'reference_created' => 'Obrigado pela sua indicação! Valorizamos muito você ter pensado em alguém para compartilhar esta oportunidade.',
            'updated' => 'Atualizado com sucesso',
            'deleted' => 'Excluído com sucesso',
        ],
        'error' => [
            'loading_failed' => 'Erro ao carregar dados',
            'creation_failed' => 'Erro ao criar registro',
            'update_failed' => 'Erro ao atualizar',
            'delete_failed' => 'Erro ao excluir',
            'email_exists' => 'Já existe uma solicitação com este email',
        ],
        'rejection' => [
            'working' => 'Devido aos programas de treinamento intensivo da Funval, o programa é direcionado a pessoas desempregadas.',
            'entrepreneur' => 'Excelente, em breve você receberá mais informações de organizações parceiras da FUNVAL especialistas em empreendedorismo.',
            'online_part_time' => 'FUNVAL tem parcerias com empresas que exigem que as pessoas trabalhem presencialmente.',
            'part_time' => 'FUNVAL requer disponibilidade em tempo integral para seus programas.',
        ],
    ],

    // UI Elements
    'ui' => [
        'buttons' => [
            'save' => 'Salvar',
            'cancel' => 'Cancelar',
            'submit' => 'Enviar',
            'edit' => 'Editar',
            'delete' => 'Excluir',
            'view' => 'Ver',
            'next' => 'Próximo',
            'previous' => 'Anterior',
            'finish' => 'Finalizar',
            'continue' => 'Continuar',
        ],
        'labels' => [
            'yes' => 'Sim',
            'no' => 'Não',
            'not_specified' => 'Não especificado',
            'full_time' => 'Tempo integral',
            'part_time' => 'Meio período',
            'years' => 'anos',
        ],
        'titles' => [
            'dashboard' => 'Dashboard',
            'pre_inscriptions' => 'Pré-inscrições',
            'references' => 'Referências',
            'personal_info' => 'Informações Pessoais',
            'location' => 'Localização',
            'work_info' => 'Informações de Trabalho e Serviço',
            'status_tracking' => 'Status e Acompanhamento',
            'details' => 'Detalhes',
            'summary' => 'Resumo',
            'confirmation' => 'Confirmação',
        ],
    ],

    // Navigation
    'navigation' => [
        'dashboard' => 'Dashboard',
        'access_control' => 'Controle de Acesso',
        'courses' => 'Cursos',
        'references' => 'Referências',
        'pre_inscriptions' => 'Pré-inscrições',
        'settings' => 'Configurações',
        'profile' => 'Perfil',
        'password' => 'Senha',
        'appearance' => 'Aparência',
    ],

    // Welcome Disclaimer
    'welcome_disclaimer' => [
        'title' => 'Bem-vindo à FUNVAL Internacional!',
        'subtitle' => 'Temos o prazer de receber sua inscrição ou referência.',
        'program_description' => 'Este programa é dirigido a pessoas que procuram emprego e estão dispostas a comprometer-se com um processo intensivo de formação, dedicando entre 10 e 12 horas diárias de segunda a sexta-feira.',
        'motivation' => 'Se você ou a pessoa indicada têm motivação e compromisso para alcançar este objetivo, vamos em frente! Estamos entusiasmados para acompanhá-los na busca de emprego.',
        'privacy' => 'Queremos assegurar que todas as informações pessoais serão tratadas com estrita confidencialidade e não serão compartilhadas com terceiros sem consentimento prévio.',
        'accept_terms' => 'Eu li e aceito os termos e condições mencionados acima. Confirmo que as informações que fornecerei são verdadeiras e completas.',
    ],
];
