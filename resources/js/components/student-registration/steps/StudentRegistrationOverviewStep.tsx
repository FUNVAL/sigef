import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { Country } from '@/types/country';
import { Course } from '@/types/course';
import { Enums } from '@/types/global';
import { StudentRegistrationFormData } from '@/types/student-registration';
import { ArrowLeft, CheckCircle2, FileText, Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { StepsHeader } from '../../pre-registration/steps-header';

interface StudentRegistrationOverviewStepProps {
    data: StudentRegistrationFormData;
    countries: Country[];
    courses: Course[];
    enums: Enums;
    onSubmit: () => void;
    processing: boolean;
}

export function StudentRegistrationOverviewStep({ data, countries, courses, enums, onSubmit, processing }: StudentRegistrationOverviewStepProps) {
    const { previousStep } = useContext(StepperContext);

    const getCountryName = (id: number | undefined) => {
        if (!id || id === 0) return 'No especificado';
        const country = countries.find((c) => c.id === id);
        return country?.name || 'No especificado';
    };

    const getCourseName = (id: number | undefined) => {
        if (!id || id === 0) return 'No especificado';
        const course = courses.find((c) => c.id === id);
        return course?.name || 'No especificado';
    };

    const getEnumName = (enumArray: any[] | undefined, id: number | undefined) => {
        if (!id || id === 0 || !enumArray) return 'No especificado';
        const enumItem = enumArray.find((e) => e.id === id);
        return enumItem?.name || 'No especificado';
    };

    const getMedicalFrequencyName = (frequency: string | undefined) => {
        if (!frequency) return 'No especificado';
        const frequencies: Record<string, string> = {
            semanal: 'Semanal',
            quincenal: 'Quincenal',
            mensual: 'Mensual',
            trimestral: 'Cada 3 meses',
            semestral: 'Cada 6 meses',
            anual: 'Anualmente',
            cuando_necesario: 'Solo cuando es necesario',
        };
        return frequencies[frequency] || frequency;
    };

    const InfoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div className="space-y-3">
            <h3 className="border-b border-gray-200 pb-2 text-lg font-semibold text-[rgb(46_131_242_/_1)]">{title}</h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{children}</div>
        </div>
    );

    const InfoItem = ({ label, value }: { label: string; value: string | number | undefined }) => (
        <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600">{label}:</span>
            <span className="text-gray-900">{value || 'No especificado'}</span>
        </div>
    );

    const FileItem = ({ label, file }: { label: string; file: File | undefined }) => (
        <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600">{label}:</span>
            <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="text-gray-900">{file ? `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)` : 'No seleccionado'}</span>
            </div>
        </div>
    );

    return (
        <Card className="mx-auto w-full max-w-4xl overflow-hidden border-0 pt-0 shadow-2xl">
            <StepsHeader title="Resumen de Inscripción" subtitle="Revise su información antes de enviar el registro" />

            <CardContent className="space-y-8 p-8">
                <div className="space-y-6">
                    {/* Información Personal */}
                    <InfoSection title="Información Personal">
                        <InfoItem label="Nombres" value={`${data.first_name || ''} ${data.middle_name || ''}`.trim()} />
                        <InfoItem label="Apellidos" value={`${data.last_name || ''} ${data.second_last_name || ''}`.trim()} />
                        <InfoItem label="Fecha de Nacimiento" value={data.birth_date} />
                        <InfoItem label="Edad" value={data.age && data.age > 0 ? data.age : 'No calculada'} />
                        <InfoItem label="Género" value={getEnumName(enums.gender, data.gender)} />
                        <InfoItem label="País" value={getCountryName(data.country_id)} />
                        <InfoItem label="Estado Civil" value={getEnumName(enums.maritalStatus, data.marital_status)} />
                        <InfoItem label="Correo Electrónico" value={data.email} />
                        <InfoItem label="Teléfono" value={data.phone} />
                        <InfoItem label="Reclutador" value={data.recruiter_name} />
                        <InfoItem label="Ubicación de Casa" value={data.home_location_link} />
                    </InfoSection>

                    {/* Documentos */}
                    <InfoSection title="Documentos Requeridos">
                        <InfoItem label="Tipo de Documento" value={getEnumName(enums.documentType, data.document_type)} />
                        <InfoItem label="Número de Documento" value={data.document_number} />
                        <FileItem label="Foto Frontal ID" file={data.id_front_photo_file as File} />
                        <FileItem label="Foto Posterior ID" file={data.id_back_photo_file as File} />
                        <FileItem label="Licencia de Conducir" file={data.driver_license_file as File} />
                        <FileItem label="Recibo de Servicios" file={data.utility_bill_photo_file as File} />
                        <FileItem label="Foto Formal" file={data.formal_photo_file as File} />
                    </InfoSection>

                    {/* Información Eclesiástica */}
                    <InfoSection title="Información Eclesiástica">
                        <InfoItem label="Miembro Activo" value={data.is_active_member ? 'Sí' : 'No'} />
                        <InfoItem label="Número de Cédula de Miembro" value={data.member_certificate_number} />
                        <InfoItem
                            label="Año de Bautismo"
                            value={data.baptism_year && data.baptism_year > 0 ? data.baptism_year : 'No especificado'}
                        />
                        <InfoItem label="Misionero Retornado" value={data.is_returned_missionary ? 'Sí' : 'No'} />
                        <InfoItem label="Misión Servida" value={data.mission_served} />
                        <InfoItem
                            label="Año Fin de Misión"
                            value={data.mission_end_year && data.mission_end_year > 0 ? data.mission_end_year : 'No especificado'}
                        />
                        <InfoItem label="Sellado en el Templo" value={data.temple_status ? 'Sí' : 'No'} />
                        <InfoItem label="Llamamiento Actual" value={data.current_calling} />
                        <InfoItem label="Barrio/Rama" value={data.ward_branch} />
                        <InfoItem label="Número de Miembro" value={(data as any).member_number} />
                        <InfoItem label="Presidente Auxiliar" value={(data as any).auxiliar_president} />
                        <InfoItem label="Teléfono Presidente Auxiliar" value={(data as any).auxiliary_president_phone} />
                    </InfoSection>

                    {/* Información Académica */}
                    <InfoSection title="Información Académica y Profesional">
                        <InfoItem label="Nivel Educativo" value={getEnumName(enums.educationLevel, data.education_level)} />
                        <InfoItem label="Curso" value={getCourseName(data.course_id)} />
                        <InfoItem label="Nivel English Connect" value={getEnumName(enums.englishConnectLevel, data.english_connect_level)} />
                    </InfoSection>

                    {/* Información de Salud */}
                    <InfoSection title="Información de Salud">
                        <InfoItem label="Cuenta con Seguro Médico" value={data.has_health_insurance ? 'Sí' : 'No'} />
                        <InfoItem label="Padece Alguna Enfermedad" value={data.has_medical_condition ? 'Sí' : 'No'} />
                        {data.has_medical_condition && (
                            <>
                                <InfoItem label="Descripción de la Condición" value={data.medical_condition_description} />
                                <InfoItem label="Toma Medicamentos" value={data.takes_medication ? 'Sí' : 'No'} />
                                <InfoItem label="Frecuencia de Visitas Médicas" value={getMedicalFrequencyName(data.medical_visit_frequency)} />
                            </>
                        )}
                    </InfoSection>

                    {/* Acuerdos y Compromisos */}
                    <InfoSection title="Acuerdos y Compromisos">
                        <InfoItem label="Términos y Condiciones" value={data.agreement_terms_accepted ? 'Aceptado' : 'Pendiente'} />
                        <InfoItem label="Política de Privacidad" value={data.agreement_privacy_accepted ? 'Aceptado' : 'Pendiente'} />
                        <InfoItem label="Código de Conducta" value={data.agreement_conduct_accepted ? 'Aceptado' : 'Pendiente'} />
                        <InfoItem label="Declaración de Salud" value={data.agreement_health_accepted ? 'Aceptado' : 'Pendiente'} />
                    </InfoSection>
                </div>

                {/* Mensaje informativo */}
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                        <div>
                            <h4 className="mb-2 font-semibold text-blue-900">Confirmación de Envío</h4>
                            <p className="text-sm text-blue-800">
                                Al hacer clic en "Enviar Registro", confirma que toda la información proporcionada es correcta y autoriza el
                                procesamiento de sus datos para fines educativos. Recibirá una confirmación por correo electrónico una vez que se
                                procese su inscripción.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex justify-between pt-4">
                    <Button type="button" onClick={previousStep} variant="outline" size="lg" className="min-w-[120px]" disabled={processing}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Anterior
                    </Button>

                    <Button
                        type="button"
                        onClick={onSubmit}
                        size="lg"
                        className="min-w-[140px] bg-[rgb(46_131_242_/1)] text-white transition-colors hover:bg-[rgb(46_131_242/_1)]/90"
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Enviando...
                            </>
                        ) : (
                            'Enviar Registro'
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
