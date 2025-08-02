<?php

return [
    'enums' => require_once __DIR__ . '/enums.php',
    'forms' => require_once __DIR__ . '/forms.php',
    'messages' => require_once __DIR__ . '/messages.php',

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
        'subtitle' => 'Ficamos felizes em receber sua inscrição ou a referência de seu amigo.',
        #'title' => '¿Estas buscando empleo? ¡Este Programa es para Ti! ',
        'program_description' => [
            'title' => 'Você está procurando emprego?&nbsp;&nbsp;Este Programa é para Você!',

            'description' => 'Este programa é destinado a candidatos a emprego que estejam dispostos a se comprometer com um processo de treinamento intensivo, dedicando de <span class="font-bold text-blue-700">10 a 12 horas por dia, de segunda a sexta-feira.</span>'
        ],

        'motivation' => 'Se você ou a pessoa indicada tiver a motivação e o compromisso de atingir essa meta, vá em frente! Estamos entusiasmados em acompanhá-los em sua busca de emprego.',
        'privacy' => [
            'title' => 'Privacidade e Confidencialidade',
            'description' => 'Queremos assegurar que todas as informações pessoais serão tratadas comestrita confidencialidade e  <span class="font-bold text-red-500">não serão compartilhadas com terceiros sem consentimento prévio.</span>',
        ],
        'accept_terms' => 'Eu li e aceito os termos e condições mencionados acima. Confirmo que as informações que fornecerei são verdadeiras e completas.',
    ],

    // Action Selection
    'action_selection' => [
        'title' => 'Qual ação deseja realizar?',
        'subtitle' => 'Selecione uma das seguintes opções para continuar',
        'referral' => [
            'title' => 'Indicar um amigo',
            'description' => 'Recomende alguém que você conhece para participar dos nossos programas de capacitação para o emprego.',
        ],
        'pre_inscription' => [
            'title' => 'Pré-inscrever-me no curso',
            'description' => 'Complete sua pré-inscrição para participar dos nossos programas de capacitação para o emprego.',
        ],
    ],

    // Message Step
    'message_step' => [
        'redirecting' => 'Redirecionando...',
        'confirmation_title' => 'Confirmação de Solicitação',
        'confirmation_subtitle' => 'Recebemos suas informações corretamente.',
        'back_to_home' => 'Voltar ao Início',
    ],
];
