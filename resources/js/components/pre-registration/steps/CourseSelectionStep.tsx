import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PreRegistrationFormData } from '../../../types/forms'
import { GraduationCap, Clock, Globe, ArrowLeft } from "lucide-react"
import { Course } from "@/types/course"
import { PreRegistrationRequest } from "@/types/pre-inscription"

interface CourseSelectionStepProps {
  formData: PreRegistrationFormData;
  onNext: () => void;
  onBack: () => void;
  courses: Course[];
  request: PreRegistrationRequest;
}

export function CourseSelectionStep({ onNext, onBack, courses, request }: CourseSelectionStepProps) {
  const { data: formData, setData } = request;

  const selectedCourse = courses.find(course => course.id === formData.course_id)?.name || '';
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
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
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="font-semibold text-funval-darkBlue">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-4 w-4" />
                      <span>Nombre del Curso</span>
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-funval-darkBlue">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Duración</span>
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-funval-darkBlue">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>Modalidad</span>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course, index) => (
                  <TableRow key={index} className="hover:bg-muted/50" onClick={() => setData('course_id', course.id)}>
                    <TableCell>
                      <input
                        id={`course-${index}`}
                        name="course_id"
                        type="radio"
                        value={course.id}
                        className="size-5"
                        defaultChecked={formData.course_id === course.id}
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <Label
                        htmlFor={`course-${index}`}
                        className="cursor-pointer font-medium"
                      >
                        {course.name}
                      </Label>
                    </TableCell>
                    <TableCell>
                      <span className="text-[rgb(46_131_242_/_1)] font-medium">
                        {course.duration}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.modality.name === "En Línea"
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                        {course.modality.name}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

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
              onClick={onBack}
              variant="outline"
              size="lg"
              className="min-w-[120px]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>

            <Button
              // onClick={handleSubmit}
              // disabled={!selectedCourse || isSubmitting}
              variant="default"
              size="lg"
              className="min-w-[200px] bg-[rgb(46_131_242_/_1)] text-white hover:shadow-lg hover:bg-[rgb(46_131_242_/_1)]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
