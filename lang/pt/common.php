<?php

return [
    'enums' => require_once __DIR__ . '/enums.php',
    'forms' => require_once __DIR__ . '/forms.php',
    'messages' => require_once __DIR__ . '/messages.php',
    'stepper' => require_once __DIR__ . '/stepper.php',

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
            'country' => 'País',
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

        'program_description' => [
            'title' => 'Você está procurando emprego ou conhece alguém que precisa?',

            'description' => 'A Funval oferece a oportunidade perfeita para você se preparar e se destacar no mercado de trabalho. Nossos cursos intensivos, com duração a partir de apenas 5 semanas, são projetados para fornecer as competências necessárias para conseguir um emprego formal. Com uma abordagem prática e acompanhamento constante, você aumentará suas chances de crescer no mundo do trabalho.<br>
            <span class="text-xl font-bold ">Venha transformar o futuro com a Funval!</span>'
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
            'description' => 'Compartilhe essa oportunidade e ajude outra pessoa a dar o primeiro passo rumo à capacitação profissional.',
        ],
        'pre_inscription' => [
            'title' => 'Pré-inscrever-me no curso',
            'description' => 'Dê o primeiro passo e inscreva-se para ter a chance de participar dos nossos programas de capacitação profissional.',
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
