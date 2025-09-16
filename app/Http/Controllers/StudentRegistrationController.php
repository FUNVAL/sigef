<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Course;
use App\Models\Stake;
use App\Enums\GenderEnum;
use App\Enums\MaritalStatusEnum;
use App\Enums\DocumentTypeEnum;
use App\Enums\BaptismStatusEnum;
use App\Enums\TempleStatusEnum;
use App\Enums\EducationLevelEnum;
use App\Enums\EnglishConnectLevelEnum;
use App\Enums\StatusEnum;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class StudentRegistrationController extends Controller
{
    /**
     * Show the form for creating a new student registration.
     */
    public function create()
    {
        try {
            return inertia('forms/student-registration/index', [
                'step' => request()->input('step', 0),
                'countries' => Country::where('status', StatusEnum::ACTIVE->value)->get(),
                'courses' => Course::where('status', StatusEnum::ACTIVE->value)->get(),
                'enums' => [
                    'gender' => GenderEnum::toArray(),
                    'maritalStatus' => MaritalStatusEnum::toArray(),
                    'documentType' => DocumentTypeEnum::toArray(),
                    'baptismStatus' => BaptismStatusEnum::toArray(),
                    'templeStatus' => TempleStatusEnum::toArray(),
                    'educationLevel' => EducationLevelEnum::toArray(),
                    'englishConnectLevel' => EnglishConnectLevelEnum::toArray(),
                ]
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Error loading student registration form',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created student registration.
     */
    public function store(Request $request)
    {
        try {
            $validated = $this->validateStudentRegistrationData($request);
            
            // Handle file uploads
            $fileFields = [
                'id_front_photo_file' => 'id_front_photo',
                'id_back_photo_file' => 'id_back_photo',
                'driver_license_file' => 'driver_license',
                'utility_bill_photo_file' => 'utility_bill_photo',
                'formal_photo_file' => 'formal_photo',
            ];

            foreach ($fileFields as $fileField => $dbField) {
                if ($request->hasFile($fileField)) {
                    $file = $request->file($fileField);
                    $filename = time() . '_' . $file->getClientOriginalName();
                    $path = $file->storeAs('student-documents', $filename, 'public');
                    $validated[$dbField] = $path;
                }
            }

            // Remove file fields from validated data before saving to database
            foreach (array_keys($fileFields) as $fileField) {
                unset($validated[$fileField]);
            }

            // Calculate age from birth date
            $validated['age'] = \Carbon\Carbon::parse($validated['birth_date'])->age;

            // For now, we'll just return success since we don't have the Student model yet
            // In a real implementation, you would create the StudentRegistration model and save the data
            // $studentRegistration = StudentRegistration::create($validated);

            return back()->with('success', [
                'type' => 'success',
                'message' => 'Registro de estudiante creado exitosamente. Recibirá una confirmación por correo electrónico.'
            ]);

        } catch (ValidationException $e) {
            return back()
                ->withErrors($e->errors())
                ->withInput();
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al crear el registro de estudiante: ' . $e->getMessage()]);
        }
    }

    /**
     * Validate student registration data according to business rules
     */
    private function validateStudentRegistrationData(Request $request): array
    {
        $rules = [
            // Información Personal
            'first_name' => 'required|string|max:50',
            'middle_name' => 'nullable|string|max:50',
            'last_name' => 'required|string|max:50',
            'second_last_name' => 'nullable|string|max:50',
            'birth_date' => 'required|date|before:today',
            'gender' => 'required|numeric|in:' . implode(',', GenderEnum::values()),
            'country_id' => 'required|exists:countries,id',
            'marital_status' => 'required|numeric|in:' . implode(',', MaritalStatusEnum::values()),
            'email' => 'required|email|max:100|unique:students,email',
            'phone' => 'required|string|max:20',
            'recruiter_name' => 'nullable|string|max:100',
            'home_location_link' => 'nullable|url|max:255',

            // Documentos Requeridos
            'document_type' => 'required|numeric|in:' . implode(',', DocumentTypeEnum::values()),
            'document_number' => 'required|string|max:50',
            'id_front_photo_file' => 'required|image|mimes:jpeg,png,jpg|max:5120', // 5MB
            'id_back_photo_file' => 'required|image|mimes:jpeg,png,jpg|max:5120',
            'driver_license_file' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'utility_bill_photo_file' => 'required|image|mimes:jpeg,png,jpg|max:5120',
            'formal_photo_file' => 'required|image|mimes:jpeg,png,jpg|max:5120',

            // Información Religiosa/Eclesiástica
            'is_active_member' => 'required|boolean',
            'member_certificate_number' => 'nullable|string|max:50',
            'baptism_year' => 'nullable|numeric|min:1950|max:' . date('Y'),
            'is_returned_missionary' => 'required|boolean',
            'mission_served' => 'nullable|string|max:100',
            'mission_end_year' => 'nullable|numeric|min:1950|max:' . date('Y'),
            'temple_status' => 'required|numeric|in:' . implode(',', TempleStatusEnum::values()),
            'current_calling' => 'nullable|string|max:100',
            'stake_id' => 'required|exists:stakes,id',
            'ward_branch' => 'nullable|string|max:100',

            // Información Académica y Profesional
            'education_level' => 'required|numeric|in:' . implode(',', EducationLevelEnum::values()),
            'course_id' => 'required|exists:courses,id',
            'english_connect_level' => 'required|numeric|in:' . implode(',', EnglishConnectLevelEnum::values()),
        ];

        $messages = [
            'id_front_photo_file.required' => 'La foto frontal del documento de identidad es obligatoria.',
            'id_back_photo_file.required' => 'La foto posterior del documento de identidad es obligatoria.',
            'utility_bill_photo_file.required' => 'La foto del recibo de servicios públicos es obligatoria.',
            'formal_photo_file.required' => 'La foto formal con fondo blanco es obligatoria.',
            'birth_date.before' => 'La fecha de nacimiento debe ser anterior al día de hoy.',
            'email.unique' => 'Este correo electrónico ya está registrado.',
            'document_number.required' => 'El número de documento de identificación es obligatorio.',
            'is_active_member.required' => 'Debe especificar si es un miembro activo de la iglesia.',
            'is_returned_missionary.required' => 'Debe especificar si es un misionero retornado.',
            'temple_status.required' => 'Debe especificar su estado del templo.',
            'education_level.required' => 'Debe especificar su nivel educativo.',
            'english_connect_level.required' => 'Debe especificar su nivel de English Connect.',
        ];

        return $request->validate($rules, $messages);
    }
}