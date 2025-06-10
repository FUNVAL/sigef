<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\DocumentTypeEnum;
use App\Enums\GenderEnum;
use App\Enums\MaritalStatusEnum;
use App\Enums\UserStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'firstname',
        'middle_name',
        'lastname',
        'second_lastname',
        'email',
        'password',
        'gender',
        'document_type',
        'document_number',
        'birth_date',
        'marital_status',
        'address',
        'contact_phone_1',
        'contact_phone_2',
        'status'
    ];

    protected $cast = [
        'status' =>  UserStatusEnum::class,
        'document_type' => DocumentTypeEnum::class,
        'gender' => GenderEnum::class,
        'marital_status' => MaritalStatusEnum::class,
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be automatically appended to the model's array 
     * and JSON representations.
     *
     * @var array
     */
    protected $appends = [
        'fullname',
        'user_roles',
        'user_permissions',
        'gender',
        'status',
        'document_type',
        'marital_status',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the user's full name.
     *
     * @return string
     */
    public function getFullNameAttribute(): string
    {
        return $this->firstname . ' ' . $this->lastname;
    }

    /**
     * Get the user's permissions.
     *
     * @return array
     */
    public function getUserPermissionsAttribute(): array
    {
        return $this->getAllPermissions()->pluck('name')->toArray();
    }

    /**
     * Get the user's roles using the new attribute.
     *
     * @return array
     */
    public function getUserRolesAttribute(): array
    {
        return $this->getRoleNames()->toArray();
    }

    /**
     * Get the gender as an array with both id and name.
     *
     * @return array|null
     */

    public function getGenderAttribute(): ?array
    {
        return GenderEnum::fromId($this->attributes['gender']);
    }

    /**
     * Get the status as an array with both id and name.
     *
     * @return array|null
     */
    public function getStatusAttribute(): ?array
    {
        return UserStatusEnum::fromId($this->attributes['status']);
    }

    /**
     * Get the document type as an array with both id and name.
     *
     * @return array|null
     */
    public function getDocumentTypeAttribute(): ?array
    {
        return DocumentTypeEnum::fromId($this->attributes['document_type']);
    }

    //marital status
    public function getMaritalStatusAttribute(): ?array
    {
        return MaritalStatusEnum::fromId($this->attributes['marital_status']);
    }
}
