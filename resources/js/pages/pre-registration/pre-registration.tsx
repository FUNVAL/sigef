import React, { useState, useEffect } from 'react'
import { Header } from '../../components/pre-registration/Header'
import { StepIndicator } from '../../components/pre-registration/StepIndicator'
import { DisclaimerStep } from '../../components/pre-registration/steps/DisclaimerStep'
import { ActionSelectionStep } from '../../components/pre-registration/steps/ActionSelectionStep'
import { ReferralFormStep } from '../../components/pre-registration/steps/ReferralFormStep'
import { PreRegistrationFormStep } from '../../components/pre-registration/steps/PreRegistrationFormStep'
import { FemaleFilterStep } from '../../components/pre-registration/steps/FemaleFilterStep'
import { CourseSelectionStep } from '../../components/pre-registration/steps/CourseSelectionStep'
import { MessageStep } from '../../components/pre-registration/steps/MessageStep'
import { Stake } from '@/types/stake'
import { Country } from '@/types/country'
import { Course } from '@/types/course'
import { useForm } from '@inertiajs/react'
import { OverviewStep } from '@/components/pre-registration/steps/OverviewStep'
import { PreRegistrationFormData } from '@/types/pre-inscription'


type MessageData = {
  message: string;
  type: 'success' | 'warning' | 'info';
  title?: string;
}

type PreRegistrationProps = {
  countries: Country[];
  stakes: Stake[];
  courses: Course[];
}

type Stepper = {
  title: string;
  component: React.ComponentType<any>;
}


export default function PreRegistration({ countries, stakes, courses }: PreRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepper, setStepper] = useState<Stepper[]>(initialSteps);
  const [selectedAction, setSelectedAction] = useState<'referral' | 'preregistration' | ''>('');
  const request = useForm<PreRegistrationFormData>(initialData);

  const nextStep = () => {
    if (currentStep < stepper.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  const handleActionSelection = (action: 'referral' | 'preregistration') => {
    setSelectedAction(action);
    setStepper([
      ...initialSteps,
      ...actions[action]
    ]);
  }

  useEffect(() => {
    // Solo aplica para preregistration
    if (selectedAction !== 'preregistration') return;

    const baseSteps = [
      ...initialSteps,
      ...actions.preregistration
    ];

    // Si es mujer, insertar Evaluación después de Datos
    if (Number(request.data.gender) === 2) {
      const dataStepIndex = baseSteps.findIndex(step => step.title === 'Datos');
      if (dataStepIndex !== -1) {
        baseSteps.splice(dataStepIndex + 1, 0, { title: 'Evaluación', component: FemaleFilterStep });
      }
    }

    setStepper(baseSteps);
  }, [request.data.gender, selectedAction]);

  const CurrentStepComponent = stepper[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <StepIndicator
          currentStep={currentStep + 1}
          totalSteps={stepper.length}
          stepTitles={stepper.map(step => step.title)}
        />

        <div className="mt-8">
          <CurrentStepComponent
            countries={countries}
            stakes={stakes}
            courses={courses}
            onAction={handleActionSelection}
            action={selectedAction}
            onNext={nextStep}
            onBack={previousStep}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            request={request}
          />
        </div>
      </main>

      <footer className="border-t border-border/40 mt-16 dark:bg-gray-950">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 FUNVAL Internacional. Todos los derechos reservados.</p>
            <p className="mt-1">
              Organización dedicada al desarrollo técnico profesional en Latinoamérica
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}




const initialSteps: Stepper[] =
  [
    { title: 'Términos', component: DisclaimerStep },
    { title: 'Acción', component: ActionSelectionStep },
  ]

const actions: { referral: Stepper[]; preregistration: Stepper[]; } =
{
  referral: [
    { title: 'Formulario', component: ReferralFormStep },
    { title: 'Confirmación', component: MessageStep }
  ],

  preregistration: [
    { title: 'Datos', component: PreRegistrationFormStep },
    { title: 'Cursos', component: CourseSelectionStep },
    { title: 'Resumen', component: OverviewStep },
    { title: 'Confirmación', component: MessageStep }
  ]
}

const initialData: PreRegistrationFormData = {
  first_name: '',
  middle_name: '',
  last_name: '',
  second_last_name: '',
  gender: 0,
  age: 0,
  phone: '',
  email: '',
  marital_status: 0,
  served_mission: null,
  country_id: 0,
  stake_id: 0,
  course_id: 0,

  currently_working: null,
  job_type_preference: null,
  available_full_time: null,
}