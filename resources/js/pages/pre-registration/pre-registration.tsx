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
import { ReferralFormData, PreRegistrationFormData } from '../../types/forms'

type Step =
  | 'disclaimer'
  | 'action-selection'
  | 'referral-form'
  | 'preregistration-form'
  | 'female-filter'
  | 'course-selection'
  | 'success-message'
  | 'info-message'

type MessageData = {
  message: string;
  type: 'success' | 'warning' | 'info';
  title?: string;
}
/* {
    "id": 2,
    "name": "Aire Acondicionado y Linea Blanca",
    "duration": 8,
    "modality": {
        "id": 3,
        "name": "Semipresencial"
    },
    "status": {
        "id": 1,
        "name": "Activo"
    }
} */
type PreRegistrationProps = {
  countries: { id: number; name: string, code: string }[];
  stakes: { id: number; name: string, country_id: number }[];
  courses: { id: number; name: string; duration: number; modality: { id: number; name: string }; status: { id: number; name: string } }[];
}

function PreRegistration({ countries, stakes , courses}: PreRegistrationProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentStep, setCurrentStep] = useState<Step>('disclaimer')
  const [selectedAction, setSelectedAction] = useState<'referral' | 'preregistration' | null>(null)
  const [preRegistrationData, setPreRegistrationData] = useState<PreRegistrationFormData | null>(null)
  const [messageData, setMessageData] = useState<MessageData>({ message: '', type: 'success' })
  console.log({ courses })
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const resetForm = () => {
    setCurrentStep('disclaimer')
    setSelectedAction(null)
    setPreRegistrationData(null)
    setMessageData({ message: '', type: 'success' })
  }

  const goBack = () => {
    switch (currentStep) {
      case 'action-selection':
        setCurrentStep('disclaimer')
        break
      case 'referral-form':
        setCurrentStep('action-selection')
        break
      case 'preregistration-form':
        setCurrentStep('action-selection')
        break
      case 'female-filter':
        setCurrentStep('preregistration-form')
        break
      case 'course-selection':
        if (preRegistrationData?.genero === 'femenino') {
          setCurrentStep('female-filter')
        } else {
          setCurrentStep('preregistration-form')
        }
        break
      default:
        break
    }
  }

  const getStepTitles = () => {
    if (selectedAction === 'referral') {
      return ['Términos', 'Acción', 'Formulario', 'Confirmación']
    } else if (selectedAction === 'preregistration') {
      return ['Términos', 'Acción', 'Datos', 'Evaluación', 'Cursos', 'Confirmación']
    }
    return ['Términos', 'Acción', 'Formulario', 'Confirmación']
  }

  const getCurrentStepNumber = (): number => {
    switch (currentStep) {
      case 'disclaimer': return 1
      case 'action-selection': return 2
      case 'referral-form': return 3
      case 'preregistration-form': return 3
      case 'female-filter': return 4
      case 'course-selection': return 5
      case 'success-message':
      case 'info-message':
        return selectedAction === 'referral' ? 4 : 6
      default: return 1
    }
  }

  const getTotalSteps = (): number => {
    if (selectedAction === 'referral') return 4
    if (selectedAction === 'preregistration') return 6
    return 4
  }

  const handleDisclaimerNext = () => {
    setCurrentStep('action-selection')
  }

  const handleActionSelection = (action: 'referral' | 'preregistration') => {
    setSelectedAction(action)
    if (action === 'referral') {
      setCurrentStep('referral-form')
    } else {
      setCurrentStep('preregistration-form')
    }
  }

  const handleReferralSubmit = (data: ReferenceFormData) => {
    console.log('Referral data:', data)
    setMessageData({
      message: 'Gracias por tu referencia. Hemos recibido la información y nos pondremos en contacto con la persona referida en las próximas 24-72 horas.',
      type: 'success',
      title: '¡Referencia Enviada!'
    })
    setCurrentStep('success-message')
  }

  const handlePreRegistrationSubmit = (data: PreRegistrationFormData) => {
    setPreRegistrationData(data)

    if (data.genero === 'masculino') {
      setCurrentStep('course-selection')
    } else {
      setCurrentStep('female-filter')
    }
  }

  const handleFemaleFilterNext = (data: PreRegistrationFormData) => {
    setPreRegistrationData(data)
    setCurrentStep('course-selection')
  }

  const handleFemaleFilterMessage = (message: string, type: 'success' | 'warning' | 'info') => {
    setMessageData({ message, type })
    setCurrentStep('info-message')
  }

  const handleCourseSelection = (data: PreRegistrationFormData) => {
    console.log('Final pre-registration data:', data)
    setMessageData({
      message: `Gracias por completar tu pre-inscripción al curso de ${data.cursoSeleccionado}. Hemos recibido tu información y pronto te contactaremos para continuar con el proceso.`,
      type: 'success',
      title: '¡Pre-inscripción Completada!'
    })
    setCurrentStep('success-message')
  }

  const shouldShowStepIndicator = !['success-message', 'info-message'].includes(currentStep)

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'disclaimer':
        return <DisclaimerStep onNext={handleDisclaimerNext} />

      case 'action-selection':
        return <ActionSelectionStep onNext={handleActionSelection} onBack={goBack} />

      case 'referral-form':
        return <ReferralFormStep
          onNext={handleReferralSubmit}
          onBack={goBack}
          countries={countries}
          stakes={stakes}
        />

      case 'preregistration-form':
        return <PreRegistrationFormStep onNext={handlePreRegistrationSubmit} onBack={goBack} courses={courses} />

      case 'female-filter':
        return (
          <FemaleFilterStep
            formData={preRegistrationData!}
            onNext={handleFemaleFilterNext}
            onShowMessage={handleFemaleFilterMessage}
            onBack={goBack}
          />
        )

      case 'course-selection':
        return (
          <CourseSelectionStep
            formData={preRegistrationData!}
            onNext={handleCourseSelection}
            onBack={goBack}
            courses={courses}
          />
        )

      case 'success-message':
        return (
          <MessageStep
            message={messageData.message}
            type={messageData.type}
            title={messageData.title}
            onRestart={resetForm}
          />
        )

      case 'info-message':
        return (
          <MessageStep
            message={messageData.message}
            type={messageData.type}
            title={messageData.title}
            onRestart={resetForm}
          />
        )

      default:
        return <DisclaimerStep onNext={handleDisclaimerNext} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="container mx-auto px-4 py-8">
        {shouldShowStepIndicator && (
          <StepIndicator
            currentStep={getCurrentStepNumber()}
            totalSteps={getTotalSteps()}
            stepTitles={getStepTitles()}
          />
        )}

        <div className="mt-8">
          {renderCurrentStep()}
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

export default PreRegistration
