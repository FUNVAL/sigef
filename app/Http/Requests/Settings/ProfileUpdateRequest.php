<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'firstname' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'second_lastname' => ['nullable', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'gender' => ['required', 'integer'],
            'document_type' => ['required', 'integer'],
            'document_number' => ['required', 'string', 'max:255'],
            'birth_date' => ['required', 'date'],
            'marital_status' => ['required', 'integer'],
            'address' => ['required', 'string', 'max:500'],
            'contact_phone_1' => ['required', 'string', 'max:255'],
            'contact_phone_2' => ['nullable', 'string', 'max:255'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'firstname.required' => 'El primer nombre es obligatorio.',
            'firstname.max' => 'El primer nombre no puede exceder 255 caracteres.',
            'lastname.required' => 'El primer apellido es obligatorio.',
            'lastname.max' => 'El primer apellido no puede exceder 255 caracteres.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser válido.',
            'email.unique' => 'Este correo electrónico ya está en uso.',
            'gender.required' => 'El género es obligatorio.',
            'document_type.required' => 'El tipo de documento es obligatorio.',
            'document_number.required' => 'El número de documento es obligatorio.',
            'birth_date.required' => 'La fecha de nacimiento es obligatoria.',
            'birth_date.date' => 'La fecha de nacimiento debe ser una fecha válida.',
            'marital_status.required' => 'El estado civil es obligatorio.',
            'address.required' => 'La dirección es obligatoria.',
            'contact_phone_1.required' => 'El teléfono principal es obligatorio.',
        ];
    }
}
