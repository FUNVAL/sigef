<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RequestNotification extends Notification
{
    use Queueable;

    protected  $attributes = [
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
    public function __construct(array $attributes)
    {
        $this->attributes = $attributes;
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
            ->subject($this->attributes['subject'] ?? 'Notificación del Sistema')
            ->greeting($this->attributes['greeting'] ?? 'Hola!')
            ->line($this->attributes['mensaje'] ?? 'Tienes tareas pendientes de revisión.');


        if (isset($this->attributes['action']['text']) && isset($this->attributes['action']['url'])) {
            $mail->action(
                $this->attributes['action']['text'],
                $this->attributes['action']['url']
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
