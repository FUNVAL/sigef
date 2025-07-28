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
            'overview' => [
                'title' => 'Revise seus dados',
                'subtitle' => 'Verifique se todas as informações estão corretas antes de enviar',
                'fields' => [
                    'first_name' => 'Primeiro Nome:',
                    'middle_name' => 'Segundo Nome:',
                    'last_name' => 'Sobrenome:',
                    'second_last_name' => 'Segundo Sobrenome:',
                    'gender' => 'Gênero:',
                    'age' => 'Idade:',
                    'country' => 'País:',
                    'phone' => 'Telefone:',
                    'stake' => 'Estaca/Distrito/Missão:',
                    'email' => 'Email:',
                    'marital_status' => 'Estado Civil:',
                    'served_mission' => 'Serviu uma missão?:',
                    'currently_working' => 'Você está trabalhando atualmente?:',
                    'job_type_preference' => 'Tipo de emprego que você está procurando:',
                    'available_full_time' => 'Disponibilidade para trabalhar em tempo integral:',
                ],
                'buttons' => [
                    'sending' => 'Enviando...',
                    'submit' => 'Enviar',
                ],
            ],
            'course_selection' => [
                'title' => 'Selecione seu Curso',
                'description' => 'Escolha o programa de treinamento que melhor se adapte aos seus interesses e objetivos profissionais',
                'selected_course' => 'Curso selecionado:',
                'selection_confirmation' => 'Você selecionou este curso para seu processo de pré-inscrição. Ao continuar, você confirma seu interesse em participar deste programa.',
                'duration' => 'semanas',
            ],
            'female_filter' => [
                'title' => 'Questões de Avaliação',
                'description' => 'Essas perguntas nos ajudam a determinar se nossos programas são adequados para você',
                'currently_working' => 'Você está trabalhando atualmente?',
                'job_type_preference' => 'Que tipo de emprego você está procurando?',
                'available_full_time' => 'Você tem disponibilidade para estudar em um horário de aulas estendido de 10-12 horas diárias de segunda a sexta-feira?',
                'answers' => [
                    'working_yes' => 'Sim, estou trabalhando atualmente',
                    'working_no' => 'Não, não estou trabalhando',
                    'availability_yes' => 'Sim, tenho disponibilidade completa',
                    'availability_no' => 'Não, não tenho essa disponibilidade',
                ],
            ],
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
            'referrer_info' => 'Informações de quem indica',
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
            'overview' => [
                'title' => 'Revise os dados da referência',
                'fields' => [
                    'full_name' => 'Nome completo:',
                    'gender' => 'Gênero:',
                    'age' => 'Idade:',
                    'country' => 'País:',
                    'phone' => 'Telefone:',
                    'stake' => 'Estaca/Distrito/Missão:',
                    'referrer_name' => 'Seu nome:',
                    'referrer_phone' => 'Seu telefone:',
                    'relationship' => 'Relacionamento com a pessoa indicada:',
                ],
                'buttons' => [
                    'sending' => 'Enviando...',
                    'submit' => 'Enviar referência',
                ],
            ],
        ],
    ],

    // Messages
    'messages' => [
        'success' => [
            'pre_inscription_created' => 'Obrigado pela sua candidatura! Um de nossos representantes entrará em contato em até 72 horas.',
            'pre_inscription_success' => '<strong>Obrigado pela sua candidatura!</strong><br/>Um de nossos representantes entrará em contato nas próximas 72 horas para fornecer todas as informações sobre o programa e resolver qualquer dúvida que você possa ter.<br/><br/>Agradecemos seu interesse e estamos animados para acompanhá-lo neste processo.',
            'reference_created' => '<strong>Obrigado pela sua indicação!</strong><br/>Valorizamos muito você ter pensado em alguém para compartilhar esta oportunidade. Queremos que saiba que um de nossos representantes entrará em contato diretamente com a pessoa indicada nas próximas 72 horas para fornecer todas as informações sobre o programa e acompanhá-la neste processo.',
            'updated' => 'Atualizado com sucesso',
            'deleted' => 'Excluído com sucesso',
        ],
        'error' => [
            'loading_failed' => 'Erro ao carregar dados',
            'creation_failed' => 'Erro ao criar registro',
            'update_failed' => 'Erro ao atualizar',
            'delete_failed' => 'Erro ao excluir',
            'email_exists' => 'Já existe uma solicitação com este email',
            'email_exists_pending' => '<strong>Já existe uma solicitação pendente associada a este endereço de email.</strong><br/>Por favor, aguarde que um de nossos representantes entre em contato. O tempo estimado de contato é de até 72 horas.<br/><br/>Se esse tempo já passou e você ainda não recebeu resposta, pode nos escrever no seguinte número: {phone}.<br/><br/>Agradecemos sua paciência e seu interesse no programa.',
            'email_exists_previous' => '<strong>Este email já foi registrado anteriormente.</strong><br/>Identificamos que já existe uma solicitação associada a este endereço de email, que foi avaliada anteriormente com o seguinte resultado:<br/><br/>{message}',
        ],
        'rejection' => [
            'working' => '<strong>Obrigado pelo seu interesse no programa FUNVAL.</strong><br/>Devido à natureza intensiva de nossos treinamentos, este programa é direcionado a pessoas que atualmente estão desempregadas.<br/><br/>Se no futuro você se encontrar procurando emprego, não hesite em nos contatar novamente.<br/><br/>Além disso, compartilhamos os seguintes links sobre organizações aliadas à Funval que podem ser do seu interesse: <a href="https://www.the-academy.org/contact/" target="_blank" class="text-blue-600 underline">A Academia</a> e <a href="https://mentorseducation.org/" target="_blank" class="text-blue-600 underline">Mentors</a>.',
            'entrepreneur' => '<strong>Excelente!</strong><br/>Em breve você receberá informações de nossas organizações aliadas especializadas em empreendedorismo, que compartilham com a FUNVAL o compromisso de impulsionar novas oportunidades para pessoas como você.<br/><br/>Visite os seguintes links para obter mais informações sobre essas organizações: <a href="https://www.the-academy.org/contact/" target="_blank" class="text-blue-600 underline">A Academia</a> e <a href="https://mentorseducation.org/" target="_blank" class="text-blue-600 underline">Mentors</a>.',
            'online_part_time' => '<strong>A FUNVAL mantém parcerias com empresas que exigem modalidade de trabalho presencial.</strong><br/>Se no futuro esta opção se adequar à sua situação, não hesite em nos contatar novamente. Ficaremos felizes em apoiá-lo em seu processo de busca de emprego.<br/><br/>Além disso, compartilhamos os seguintes links sobre organizações aliadas à Funval que podem ser do seu interesse: <a href="https://www.the-academy.org/contact/" target="_blank" class="text-blue-600 underline">A Academia</a> e <a href="https://mentorseducation.org/" target="_blank" class="text-blue-600 underline">Mentors</a>.',
            'part_time' => '<strong>Devido à intensidade dos programas da FUNVAL</strong>, é necessário que os participantes tenham uma conexão contínua e estejam disponíveis sem realizar outras atividades em paralelo durante o horário de treinamento.<br/><br/>Se no futuro esta opção se adequar à sua situação, não hesite em nos contatar novamente. Ficaremos felizes em apoiá-lo em seu processo de busca de emprego.<br/><br/>Além disso, compartilhamos as seguintes informações sobre organizações aliadas à FUNVAL que podem ser do seu interesse: <a href="https://www.the-academy.org/contact/" target="_blank" class="text-blue-600 underline">A Academia</a> e <a href="https://mentorseducation.org/" target="_blank" class="text-blue-600 underline">Mentors</a>.',
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
