<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RequestNotification extends Notification
{
    use Queueable;

    protected  $atributes = [
        'greeting' => null,
        'subject' => null,
        'mensaje' => null,
        'salutation' => null,
        'action' => [
            'text' => null,
            'url' => null,
        ],
    ];

    /**
     * Create a new notification instance.
     */
    public function __construct(array $atributes)
    {
        $this->atributes = $atributes;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $mail = (new MailMessage)
            ->subject($this->atributes['subject'] ?? 'Notificación del Sistema')
            ->greeting($this->atributes['greeting'] ?? 'Hola!')
            ->line($this->atributes['mensaje'] ?? 'Tienes tareas pendientes de revisión.');


        if (isset($this->atributes['action']['text']) && isset($this->atributes['action']['url'])) {
            $mail->action(
                $this->atributes['action']['text'],
                $this->atributes['action']['url']
            );
        }

        return $mail->salutation('Atentamente, Sistema Integral de Gestión Educativa FUNVAL');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
