import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { Course } from '@/types/course';
import { Enums, Translation } from '@/types/global';
import { StudentRegistrationRequest } from '@/types/student-registration';
import { usePage } from '@inertiajs/react';
import { ArrowLeft, BookOpen, Globe, GraduationCap } from 'lucide-react';
import { useContext, useState } from 'react';
import { StepsHeader } from '../../pre-registration/steps-header';
import { Input } from '@/components/ui/input';

interface AcademicInformationStepProps {
    courses: Course[];
    request: StudentRegistrationRequest;
}

export function AcademicInformationStep({ courses, request }: AcademicInformationStepProps) {
    const { nextStep, previousStep } = useContext(StepperContext);
    const { data, setData } = request;
    const { enums } = usePage<{ enums: Enums }>().props;
    const { ui } = usePage<Translation>().props;
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación básica
        const validationErrors: Record<string, string> = {};

        if (!data.education_level) validationErrors.education_level = 'El grado académico es obligatorio';
        if (!data.course_id) validationErrors.course_id = 'Debe seleccionar un curso';
        if (!data.english_connect_level) validationErrors.english_connect_level = 'Debe especificar su nivel de English Connect';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        nextStep();
    };

    const selectedCourse = courses.find((course) => course.id === data.course_id);

    return (
        <Card className="mx-auto w-full max-w-4xl overflow-hidden border-0 pt-0 shadow-2xl">
            <StepsHeader title="Información Adicional" subtitle="Complete su información educativa" />

            <CardContent className="space-y-6 p-3 sm:space-y-8 sm:p-6 md:p-8">
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    {/* Nivel educativo */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">Nivel Educativo</h3>
                        </div>

                        <div>
                            <Label htmlFor="education_level">Grado Académico Alcanzado</Label>
                            <Select
                                value={data.education_level?.toString() || ''}
                                onValueChange={(value) => setData('education_level', Number(value))}
                                name="education_level"
                                required
                            >
                                <SelectTrigger id="education_level">
                                    <SelectValue placeholder="Seleccione su nivel educativo más alto" />
                                </SelectTrigger>
                                <SelectContent>
                                    {enums.educationLevel?.map((level: any) => (
                                        <SelectItem key={level.id} value={level.id.toString()}>
                                            {level.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.education_level && <p className="text-sm text-red-500">{errors.education_level}</p>}
                        </div>
                    </div>

                    {/* Curso de inscripción */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">Curso de Inscripción</h3>
                        </div>

                        <div>
                            <Label htmlFor="course_id">Curso al que se Inscribe</Label>
                            <Select
                                value={data.course_id?.toString() || ''}
                                onValueChange={(value) => setData('course_id', Number(value))}
                                name="course_id"
                                required
                            >
                                <SelectTrigger id="course_id">
                                    <SelectValue placeholder="Seleccione el curso de su interés" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((course) => (
                                        <SelectItem key={course.id} value={course.id.toString()}>
                                            <div className="flex gap-2">
                                                <span className="font-medium">{course.name}</span>
                                                <span className="text-sm text-gray-500">
                                                    {`${course.duration} semanas • ${course.modality?.name}`}
                                                </span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.course_id && <p className="text-sm text-red-500">{errors.course_id}</p>}
                        </div>


                        {/* Información del curso seleccionado */}
                       {/*  {selectedCourse && (
                            <div className="mt-4 rounded-lg border border-[rgb(46_131_242_/_1)]/20 bg-[rgb(46_131_242_/_1)]/5 p-4">
                                <h4 className="mb-2 font-semibold text-[rgb(46_131_242_/_1)]">Curso Seleccionado: {selectedCourse.name}</h4>
                                <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">Duración:</span>
                                        <span>{selectedCourse.duration} Semanas</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">Modalidad:</span>
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium ${selectedCourse.modality?.name === 'En Línea'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                }`}
                                        >
                                            {selectedCourse.modality?.name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )} */}

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Reclutador/responsable */}
                            <div>
                                <Label htmlFor="recruiter_name">Reclutador/Responsable</Label>
                                <Input
                                    id="recruiter_name"
                                    name="recruiter_name"
                                    value={data.recruiter_name || ''}
                                    onChange={(e) => setData('recruiter_name', e.target.value)}
                                    placeholder="Nombre del reclutador (opcional)"
                                />
                            </div>


                        </div>
                    </div>

                    {/* Nivel de English Connect */}
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center gap-2">
                            <Globe className="h-5 w-5 text-[rgb(46_131_242_/_1)]" />
                            <h3 className="text-lg font-semibold text-[rgb(46_131_242_/_1)]">Nivel de Inglés</h3>
                        </div>

                        <div>
                            <Label htmlFor="english_connect_level">¿Hasta qué nivel de English Connect ha estudiado?</Label>
                            <Select
                                value={data.english_connect_level?.toString() || ''}
                                onValueChange={(value) => setData('english_connect_level', Number(value))}
                                name="english_connect_level"
                                required
                            >
                                <SelectTrigger id="english_connect_level">
                                    <SelectValue placeholder="Seleccione su nivel de English Connect" />
                                </SelectTrigger>
                                <SelectContent>
                                    {enums.englishConnectLevel?.map((level: any) => (
                                        <SelectItem key={level.id} value={level.id.toString()}>
                                            {level.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.english_connect_level && <p className="text-sm text-red-500">{errors.english_connect_level}</p>}

                            {/*  <div className="mt-2 text-sm text-gray-600">
                                <p className="mb-1">Información sobre English Connect:</p>
                                <ul className="list-inside list-disc space-y-1 text-xs">
                                    <li>Ninguno: No ha participado en English Connect</li>
                                    <li>Nivel 1: Inglés básico - principiante</li>
                                    <li>Nivel 2: Inglés intermedio</li>
                                    <li>Nivel 3: Inglés intermedio-avanzado</li>
                                    <li>Completado: Ha terminado todos los niveles de English Connect</li>
                                </ul>
                            </div> */}
                        </div>
                    </div>

                    {/* Información adicional */}
                    {/* <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                <span className="text-xs font-bold text-white">i</span>
                            </div>
                            <div>
                                <h4 className="mb-2 font-semibold text-blue-900">Información Importante:</h4>
                                <ul className="space-y-1 text-sm text-blue-800">
                                    <li>• Su nivel educativo nos ayuda a adaptar el contenido del curso</li>
                                    <li>• El curso seleccionado determinará el programa de estudios</li>
                                    <li>• Su nivel de English Connect nos permite evaluar sus habilidades en inglés</li>
                                    <li>• Esta información es confidencial y solo se usa para fines educativos</li>
                                </ul>
                            </div>
                        </div>
                    </div> */}

                    {/* Botones */}
                    <div className="flex justify-between pt-4">
                        <Button type="button" onClick={previousStep} variant="outline" size="lg" className="min-w-[120px]">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {ui.buttons.previous || 'Anterior'}
                        </Button>

                        <Button
                            type="submit"
                            size="lg"
                            className="min-w-[140px] bg-[rgb(46_131_242_/1)] text-white transition-colors hover:bg-[rgb(46_131_242/_1)]/90"
                        >
                            {ui.buttons.continue || 'Continuar'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
