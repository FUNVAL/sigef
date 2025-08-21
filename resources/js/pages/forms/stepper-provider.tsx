import React, { useState, useEffect, useCallback, useRef } from 'react'; // 1. Importar useRef
import { router } from '@inertiajs/react';
import { Header } from '../../components/pre-registration/Header';
import { StepIndicator } from '../../components/pre-registration/StepIndicator';
import FormFooter from '@/components/form-footer';
import { Stepper } from '@/types/global';
import { useAppearance } from '@/hooks/use-appearance';

export const StepperContext = React.createContext<{
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  nextStep: () => void;
  previousStep: () => void;
}>({
  setCurrentStep: () => { },
  nextStep: () => { },
  previousStep: () => { },
});

export default function StepperProvider({ steps }: { steps: Stepper[] }) {
  const getStepFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const step = parseInt(params.get('step') || '1', 10);
    if (!isNaN(step) && step > 0 && step <= steps.length) {
      return step - 1;
    }
    return 0;
  };
  const { updateAppearance } = useAppearance();
  const [currentStep, setCurrentStep] = useState<number>(getStepFromUrl);
  const isInitialMount = useRef(true);
  const component = steps[currentStep]?.component;

  // Listen for URL changes to sync step state
  useEffect(() => {
    const urlStep = getStepFromUrl();
    if (currentStep !== urlStep) {
      setCurrentStep(urlStep);
    }
  }, [window.location.search]);

  // Update URL when step changes from component
  useEffect(() => {
    // Skip URL update on initial mount to prevent unnecessary navigation
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const url = new URL(window.location.href);
    const urlStep = parseInt(url.searchParams.get('step') || '1', 10) - 1;

    // Only update URL if the step has actually changed from component state
    if (urlStep !== currentStep) {
      url.searchParams.set('step', String(currentStep + 1));

      router.get(url.pathname + url.search, {}, {
        replace: true,
        preserveState: true,
        preserveScroll: true,
      });
    }
  }, [currentStep]);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, steps.length]);

  const previousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  useEffect(() => {
    updateAppearance('light');
  }, [])

  return (
    <StepperContext.Provider value={{ setCurrentStep, nextStep, previousStep }}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <StepIndicator
            currentStep={currentStep + 1}
            totalSteps={steps.length}
            stepTitles={steps.map(step => step.title)}
          />
          <div className="mt-8">
            {component}
          </div>
        </main>
        <FormFooter />
      </div>
    </StepperContext.Provider>
  );
}