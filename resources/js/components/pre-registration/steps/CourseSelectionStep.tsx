import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PreRegistrationFormData } from '../../../types/forms'
import { GraduationCap, Clock, Globe, ArrowLeft } from "lucide-react"
import { router } from "@inertiajs/react"

interface CourseSelectionStepProps {
  formData: PreRegistrationFormData;
  onNext: (data: PreRegistrationFormData) => void;
  onBack: () => void;
  courses: { id: number; name: string; duration: number; modality: { id: number; name: string }; status: { id: number; name: string } }[];
}

export function CourseSelectionStep({ formData, onNext, onBack, courses }: CourseSelectionStepProps) {
  const [selectedCourse, setSelectedCourse] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Función auxiliar para mapear estado civil
  const getMaritalStatusId = (status: string) => {
    switch (status) {
      case 'single': return 1;
      case 'married': return 2;
      case 'divorced': return 3;
      case 'widowed': return 4;
      default: return 1;
    }
  }

  // Función auxiliar para mapear tipo de empleo a job_type_preference
  const getJobTypePreference = (tipoEmpleo: string) => {
    switch (tipoEmpleo) {
      case 'trabajo_fuera_casa': return 2; // Presencial (IN_PERSON)
      case 'trabajo_en_casa': return 1; // Remoto (ONLINE)
      case 'emprendimiento': return 3; // Híbrido (HYBRID) - o el que más se adapte
      default: return null;
    }
  }

  // Función para mapear los datos del frontend al formato del backend
  const mapFormDataToBackend = (data: PreRegistrationFormData, course: string) => {
    return {
      first_name: data.first_name,
      middle_name: data.middle_name || '',
      last_name: data.last_name,
      second_last_name: data.second_last_name || '',
      gender: data.gender === 'male' ? 1 : (data.gender === 'female' ? 2 : 1), // Mapear a los valores del enum
      age: parseInt(data.age) || 18,
      phone: data.phone,
      email: data.email,
      marital_status: getMaritalStatusId(data.marital_status),
      served_mission: data.served_mission === 'yes' || data.served_mission === 'true',
      // Mapear datos del filtro anterior
      currently_working: data.estaTrabajando === 'si',
      job_type_preference: data.tipoEmpleoDeseado ? getJobTypePreference(data.tipoEmpleoDeseado) : null,
      available_full_time: data.disponibilidadHorario === 'si',
      status: 1, // Por defecto, nuevo
      comments: `Curso seleccionado: ${course}`,
      // El backend manejará la conversión de nombres a IDs
      country_id: data.country_id,
      stake_id: data.stake_id,
    }
  }

  const handleSubmit = () => {
    if (selectedCourse && !isSubmitting) {
      setIsSubmitting(true)

      const updatedData = {
        ...formData,
        cursoSeleccionado: selectedCourse
      }

      // Mapear los datos al formato que espera el backend
      const backendData = mapFormDataToBackend(updatedData, selectedCourse)

      console.log('Datos del filtro recibidos:', {
        estaTrabajando: updatedData.estaTrabajando,
        tipoEmpleoDeseado: updatedData.tipoEmpleoDeseado,
        disponibilidadHorario: updatedData.disponibilidadHorario
      })
      console.log('Enviando datos al backend:', backendData)

      // Enviar al backend usando Inertia router
      router.post(route('pre-inscription.store'), backendData, {
        onSuccess: () => {
          console.log('Pre-inscripción guardada exitosamente')
          setIsSubmitting(false)
          onNext(updatedData)
        },
        onError: (errors) => {
          console.error('Error al guardar la pre-inscripción:', errors)
          setIsSubmitting(false)
          alert('Error al guardar la pre-inscripción. Por favor, revisa los datos e intenta nuevamente.')
        },
      })
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
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
        <CardContent className="space-y-6">
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
                <RadioGroup
                  value={selectedCourse}
                  onValueChange={setSelectedCourse}
                  asChild
                >
                  <>
                    {courses.map((course, index) => (
                      <TableRow key={index} className="hover:bg-muted/50 ">
                        <TableCell>
                          <RadioGroupItem
                            value={course.name}
                            id={`course-${index}`}
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
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.modality.name === "En Línea"
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {course.modality.name}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                </RadioGroup>
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
              onClick={handleSubmit}
              disabled={!selectedCourse || isSubmitting}
              variant="default"
              size="lg"
              className="min-w-[200px] bg-[rgb(46_131_242_/_1)] text-white hover:shadow-lg hover:bg-[rgb(46_131_242_/_1)]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Guardando...' : 'Finalizar Pre-inscripción'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
