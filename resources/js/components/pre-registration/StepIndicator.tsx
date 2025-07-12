import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export function StepIndicator({ currentStep, totalSteps, stepTitles }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-4">
      <div className="flex flex-wrap justify-center gap-y-6">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => (
          <div key={step} className="flex items-center relative">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors z-10 bg-white",
                  step < currentStep
                    ? "border-funval-blue bg-[rgb(46_131_242_/_1)] text-white"
                    : step === currentStep
                      ? "border-funval-blue bg-[rgb(46_131_242_/_1)] text-white"
                      : "border-muted-foreground/30 bg-background text-muted-foreground"
                )}
              >
                {step < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step
                )}
              </div>
              <p className={cn(
                "mt-2 text-xs font-medium text-center w-20",
                step <= currentStep ? "text-[rgb(46_131_242_/_1)]" : "text-muted-foreground"
              )}>
                {stepTitles[index]}
              </p>
            </div>
            
            {index < totalSteps - 1 && (
              <>
                {/* Línea horizontal - visible en pantallas medianas y grandes */}
                <div
                  className={cn(
                    "hidden md:block mx-2 h-0.5 w-12 transition-colors",
                    step < currentStep
                      ? "bg-[rgb(46_131_242_/_1)]"
                      : "bg-muted-foreground/30"
                  )}
                />
                
                {/* Línea para pantallas pequeñas (se adapta al flujo) */}
                <div
                  className={cn(
                    "md:hidden absolute h-0.5 w-6 top-5 -right-3 transition-colors",
                    step < currentStep
                      ? "bg-[rgb(46_131_242_/_1)]"
                      : "bg-muted-foreground/30"
                  )}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}