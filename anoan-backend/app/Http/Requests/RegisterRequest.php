<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:shop_customers,email',
            ],
            'phone' => [
                'required',
                'string',
                'max:20',
                'regex:/^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/',
            ],
            'gender' => ['required', 'string', 'in:male,female,other'],
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Numele este obligatoriu',
            'email.required' => 'Email-ul este obligatoriu',
            'email.email' => 'Email-ul trebuie să fie valid',
            'email.unique' => 'Acest email este deja înregistrat',
            'phone.required' => 'Telefonul este obligatoriu',
            'phone.regex' => 'Numărul de telefon nu este valid',
            'gender.required' => 'Genul este obligatoriu',
            'gender.in' => 'Genul trebuie să fie male, female sau other',
            'password.required' => 'Parola este obligatorie',
            'password.confirmed' => 'Parolele nu coincid',
            'password.min' => 'Parola trebuie să aibă cel puțin 8 caractere',
        ];
    }
} 