<?php

namespace App\Http\Controllers;

use App\Models\Recruitment;
use App\Enums\FamilyRelationshipEnum;
use App\Enums\DeviceTypeEnum;
use App\Enums\HousingTypeEnum;
use App\Enums\EmploymentTypeEnum;
use App\Enums\JobPositionEnum;
use App\Enums\BonusCategoryEnum;
use App\Enums\ExpenseTypeEnum;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class RecruitmentController extends Controller
{
    /**
     * Show the form for creating a new recruitment application.
     */
    public function create()
    {
        try {
            return inertia('forms/recruitment-form/index', [
                'step' => request()->input('step', 0),
                'enums' => [
                    'familyRelationship' => FamilyRelationshipEnum::toArray(),
                    'deviceType' => DeviceTypeEnum::toArray(),
                    'housingType' => HousingTypeEnum::toArray(),
                    'employmentType' => EmploymentTypeEnum::toArray(),
                    'jobPosition' => JobPositionEnum::toArray(),
                    'bonusCategory' => BonusCategoryEnum::toArray(),
                    'expenseType' => ExpenseTypeEnum::toArray(),
                ],
                'translations' => [
                    'recruitment_form' => __('recruitment_form'),
                ]
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Error loading recruitment form',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created recruitment application in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                // Socio-económico
                'household_members' => 'required|array',
                'household_members.*.name' => 'required|string|max:255',
                'household_members.*.phone' => 'nullable|string|max:20',
                'household_members.*.relationship' => 'required|integer',
                'monthly_income' => 'required|numeric|min:0',
                'has_residential_internet' => 'required|boolean',
                'device_type' => 'required|integer',
                'housing_type' => 'required|integer',
                'has_employment' => 'required|boolean',
                'employment_type' => 'nullable|integer',
                'company_name' => 'nullable|string|max:255',
                'job_position' => 'nullable|integer',
                'employment_income' => 'nullable|numeric|min:0',
                'needs_bonus' => 'required|boolean',
                'bonus_categories' => 'nullable|array',
                'bonus_amounts' => 'nullable|array',
                
                // Salud
                'has_health_insurance' => 'required|boolean',
                'has_illness' => 'required|boolean',
                'illness_description' => 'nullable|string|max:500',
                'takes_medication' => 'nullable|boolean',
                'medical_visit_frequency' => 'nullable|string|max:255',
                'health_declaration_accepted' => 'required|boolean',
                
                // Información adicional
                'start_month' => 'required|integer|min:1|max:12',
                'start_year' => 'required|integer|min:2024',
                'interview_photo' => 'required|file|image|max:2048',
                
                // Acuerdos
                'mutual_understanding_accepted' => 'required|boolean',
                'work_commitment_accepted' => 'required|boolean',
                'data_authorization_accepted' => 'required|boolean',
                'scholarship_agreement_accepted' => 'required|boolean',
                'religious_institute_accepted' => 'required|boolean',
            ]);

            // Handle file upload
            if ($request->hasFile('interview_photo')) {
                $file = $request->file('interview_photo');
                $filename = 'interview_' . time() . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('recruitment/interview_photos', $filename, 'public');
                $validatedData['interview_photo'] = $path;
            }

            $recruitment = Recruitment::create($validatedData);

            return redirect()->route('recruitment-form')
                ->with('success', __('recruitment_form.success_message'));

        } catch (ValidationException $e) {
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput();
        } catch (Exception $e) {
            return redirect()->back()
                ->with('error', __('recruitment_form.error_message'))
                ->withInput();
        }
    }

    /**
     * Display the specified recruitment application.
     */
    public function show(Recruitment $recruitment)
    {
        return inertia('recruitment/show', [
            'recruitment' => $recruitment
        ]);
    }

    /**
     * Show the form for editing the specified recruitment application.
     */
    public function edit(Recruitment $recruitment)
    {
        return inertia('forms/recruitment-form/edit', [
            'recruitment' => $recruitment,
            'enums' => [
                'familyRelationship' => FamilyRelationshipEnum::toArray(),
                'deviceType' => DeviceTypeEnum::toArray(),
                'housingType' => HousingTypeEnum::toArray(),
                'employmentType' => EmploymentTypeEnum::toArray(),
                'jobPosition' => JobPositionEnum::toArray(),
                'bonusCategory' => BonusCategoryEnum::toArray(),
                'expenseType' => ExpenseTypeEnum::toArray(),
            ]
        ]);
    }

    /**
     * Update the specified recruitment application in storage.
     */
    public function update(Request $request, Recruitment $recruitment)
    {
        try {
            $validatedData = $request->validate([
                // Same validation rules as store method
                'household_members' => 'required|array',
                'household_members.*.name' => 'required|string|max:255',
                'household_members.*.phone' => 'nullable|string|max:20',
                'household_members.*.relationship' => 'required|integer',
                'monthly_income' => 'required|numeric|min:0',
                'has_residential_internet' => 'required|boolean',
                'device_type' => 'required|integer',
                'housing_type' => 'required|integer',
                'has_employment' => 'required|boolean',
                'employment_type' => 'nullable|integer',
                'company_name' => 'nullable|string|max:255',
                'job_position' => 'nullable|integer',
                'employment_income' => 'nullable|numeric|min:0',
                'needs_bonus' => 'required|boolean',
                'bonus_categories' => 'nullable|array',
                'bonus_amounts' => 'nullable|array',
                'has_health_insurance' => 'required|boolean',
                'has_illness' => 'required|boolean',
                'illness_description' => 'nullable|string|max:500',
                'takes_medication' => 'nullable|boolean',
                'medical_visit_frequency' => 'nullable|string|max:255',
                'health_declaration_accepted' => 'required|boolean',
                'start_month' => 'required|integer|min:1|max:12',
                'start_year' => 'required|integer|min:2024',
                'interview_photo' => 'nullable|file|image|max:2048',
                'mutual_understanding_accepted' => 'required|boolean',
                'work_commitment_accepted' => 'required|boolean',
                'data_authorization_accepted' => 'required|boolean',
                'scholarship_agreement_accepted' => 'required|boolean',
                'religious_institute_accepted' => 'required|boolean',
            ]);

            // Handle file upload if new file is provided
            if ($request->hasFile('interview_photo')) {
                // Delete old file if exists
                if ($recruitment->interview_photo) {
                    Storage::disk('public')->delete($recruitment->interview_photo);
                }
                
                $file = $request->file('interview_photo');
                $filename = 'interview_' . time() . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('recruitment/interview_photos', $filename, 'public');
                $validatedData['interview_photo'] = $path;
            }

            $recruitment->update($validatedData);

            return redirect()->route('recruitment.show', $recruitment)
                ->with('success', __('recruitment_form.update_success_message'));

        } catch (ValidationException $e) {
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput();
        } catch (Exception $e) {
            return redirect()->back()
                ->with('error', __('recruitment_form.update_error_message'))
                ->withInput();
        }
    }

    /**
     * Remove the specified recruitment application from storage.
     */
    public function destroy(Recruitment $recruitment)
    {
        try {
            // Delete associated file
            if ($recruitment->interview_photo) {
                Storage::disk('public')->delete($recruitment->interview_photo);
            }

            $recruitment->delete();

            return redirect()->route('recruitment.index')
                ->with('success', __('recruitment_form.delete_success_message'));

        } catch (Exception $e) {
            return redirect()->back()
                ->with('error', __('recruitment_form.delete_error_message'));
        }
    }
}