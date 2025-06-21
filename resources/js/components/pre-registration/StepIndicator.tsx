import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export function StepIndicator({ currentStep, totalSteps, stepTitles }: StepIndicatorProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
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
                "mt-2 text-xs font-medium text-center max-w-[80px]",
                step <= currentStep ? "text-[rgb(46_131_242_/_1)]" : "text-muted-foreground"
              )}>
                {stepTitles[index]}
              </p>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "mx-4 h-0.5 w-16 transition-colors",
                  step < currentStep
                    ? "bg-[rgb(46_131_242_/_1)]"
                    : "bg-muted-foreground/30"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}