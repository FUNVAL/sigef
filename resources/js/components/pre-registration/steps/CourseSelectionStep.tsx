import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { GraduationCap, Clock, Globe, ArrowLeft } from "lucide-react"
import { Course } from "@/types/course"
import { PreRegistrationFormData, PreRegistrationRequest } from "@/types/pre-inscription"
import { useContext } from "react"
import { StepperContext } from "@/pages/forms/stepper-provider"

interface CourseSelectionStepProps {
  courses: Course[];
  request: {
    data: PreRegistrationFormData;
    setData: (field: keyof PreRegistrationFormData, value: any) => void;
    errors: Record<string, string>;
  };
}

export function CourseSelectionStep({ courses, request }: CourseSelectionStepProps) {
  const { data, setData } = request;
  const { nextStep, previousStep } = useContext(StepperContext);

  const selectedCourse = courses.find(course => course.id === data.course_id)?.name || '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  }

  return (
    <form className="max-w-5xl mx-auto" onSubmit={handleSubmit}>
      <Card className="border-2">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-[rgb(46_131_242_/_1)]/10 flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-[rgb(46_131_242_/_1)]" />
          </div>
          <CardTitle className="text-2xl font-bold text-[rgb(46_131_242_/_1)]">
            Selecciona tu Curso
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Elige el programa de capacitación que más se adapte a tus intereses y objetivos profesionales
          </p>
        </CardHeader>
        <CardContent className="space-y-6 ">

          <RadioGroup
            name="course_id"
            value={data.course_id?.toString()}
            onValueChange={val => setData('course_id', Number(val))}
            className="space-y-4"
          >
            {courses.map((course, index) => (
              <label
                key={course.id}
                htmlFor={`course-${index}`}
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg cursor-pointer transition hover:bg-muted/50 select-none ${data.course_id === course.id ? 'ring-2 ring-[rgb(46_131_242_/_1)] bg-[rgb(46_131_242_/_1)]/5' : ''}`}
                tabIndex={0}
              >


                <div className="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-2 w-full">
                  <div className="flex items-center col-span-3 text-sm md:text-base gap-2">
                    <RadioGroupItem
                      value={course.id.toString()}
                      id={`course-${index}`}
                      className="size-5 mt-1"
                      checked={data.course_id === course.id}
                      aria-label={course.name}
                      tabIndex={-1}
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{course.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:text-[16px]">
                    <Clock className="h-4 w-4 text-[rgb(46_131_242_/_1)]" />
                    <span className="text-[rgb(46_131_242_/_1)] font-medium">
                      {course.duration} semanas
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-[rgb(46_131_242_/_1)]" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.modality.name === "En Línea"
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                      {course.modality.name}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </RadioGroup>

          {selectedCourse && (
            <div className="mt-6 p-4 bg-[rgb(46_131_242_/_1)]/5 border border-[rgb(46_131_242_/_1)]/20 rounded-lg">
              <h3 className="font-semibold text-funval-darkBlue mb-2">
                Curso seleccionado: {selectedCourse}
              </h3>
              <p className="text-sm text-muted-foreground">
                Has seleccionado este curso para tu proceso de pre-inscripción.
                Al continuar confirmas tu interés en participar en este programa.
              </p>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button
              onClick={previousStep}
              variant="outline"
              size="lg"
              className="min-w-[120px]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>

            <Button
              type="submit"
              disabled={!data.course_id}
              variant="default"
              size="lg"
              className="min-w-[140px] bg-[rgb(46_131_242_/_1)] text-white hover:shadow-lg hover:bg-[rgb(46_131_242_/_1)]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
