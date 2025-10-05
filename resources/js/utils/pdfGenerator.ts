import { StudentRegistrationFormData } from '@/types/student-registration';
import jsPDF from 'jspdf';

interface EnumOption {
    id: number;
    name: string;
}

interface PDFDataProps {
    data: StudentRegistrationFormData;
    enums: {
        gender: EnumOption[];
        maritalStatus: EnumOption[];
        documentType: EnumOption[];
        educationLevel: EnumOption[];
        englishConnectLevel: EnumOption[];
        countries: EnumOption[];
        stakes: EnumOption[];
    };
}

export const generateStudentRegistrationPDF = async ({ data, enums }: PDFDataProps) => {
    // Función helper para obtener nombre de enum
    const getEnumName = (enumArray: EnumOption[], id: number | undefined): string => {
        if (!id) return 'No especificado';
        const item = enumArray.find((item) => item.id === id);
        return item ? item.name : 'No especificado';
    };

    // Función helper para obtener estado del pathway
    const getPathwayLevelName = (level: number | undefined): string => {
        if (level === undefined) return 'No especificado';
        switch (level) {
            case 0:
                return 'Ninguno';
            case 1:
                return 'Cursando';
            case 2:
                return 'Completado';
            default:
                return 'No especificado';
        }
    };

    // Función helper para obtener estado de membresía
    const getMemberStatusName = (status: number | undefined): string => {
        if (status === undefined) return 'No especificado';
        switch (status) {
            case 0:
                return 'No soy miembro';
            case 1:
                return 'No (miembro inactivo)';
            case 2:
                return 'Sí (miembro activo)';
            default:
                return 'No especificado';
        }
    };

    // Función helper para obtener tipo de medicamento
    const getMedicationTypeName = (type: string | undefined): string => {
        if (!type) return 'No especificado';
        switch (type) {
            case 'no_medication':
                return 'No tomo ningún medicamento actualmente';
            case 'physical_chronic':
                return 'Condición física crónica';
            case 'emotional':
                return 'Condición emocional';
            case 'mental_neurological':
                return 'Condición mental/neurológica';
            case 'other':
                return 'Otro tipo de medicamento';
            default:
                return type;
        }
    };

    // Función helper para obtener frecuencia de medicamento
    const getMedicationFrequencyName = (frequency: string | undefined): string => {
        if (!frequency) return 'No especificado';
        switch (frequency) {
            case 'diaria':
                return 'Diaria';
            case 'semanal':
                return 'Semanal';
            case 'mensual':
                return 'Mensual';
            case 'segun_necesidad':
                return 'Según necesidad';
            default:
                return frequency;
        }
    };

    // Crear el PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = margin;
    const lineHeight = 7;

    // Función para agregar texto con salto de página automático
    const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
        if (yPosition > 270) {
            // Nueva página si se acerca al final
            pdf.addPage();
            yPosition = margin;
        }

        pdf.setFontSize(fontSize);
        if (isBold) {
            pdf.setFont('helvetica', 'bold');
        } else {
            pdf.setFont('helvetica', 'normal');
        }

        pdf.text(text, margin, yPosition);
        yPosition += lineHeight * (fontSize / 10);
    };

    // Función para agregar sección
    const addSection = (title: string, content: { label: string; value: string }[]) => {
        addText(title, 14, true);
        yPosition += 3;

        content.forEach((item) => {
            if (item.value && item.value !== 'No especificado') {
                addText(`${item.label}: ${item.value}`, 10);
            }
        });
        yPosition += 5;
    };

    // Título del documento
    addText('FORMULARIO DE REGISTRO DE ESTUDIANTE', 16, true);
    addText(`Fecha de generación: ${new Date().toLocaleDateString('es-ES')}`, 10);
    yPosition += 10;

    // Información Personal
    addSection('INFORMACIÓN PERSONAL', [
        { label: 'Nombres', value: data.first_name || '' },
        { label: 'Segundo Nombre', value: data.middle_name || '' },
        { label: 'Apellidos', value: data.last_name || '' },
        { label: 'Segundo Apellido', value: data.second_last_name || '' },
        { label: 'Fecha de Nacimiento', value: data.birth_date || '' },
        { label: 'Edad', value: data.age?.toString() || '' },
        { label: 'Género', value: getEnumName(enums.gender, data.gender) },
        { label: 'Estado Civil', value: getEnumName(enums.maritalStatus, data.marital_status) },
        { label: 'País', value: getEnumName(enums.countries, data.country_id) },
        { label: 'Provincia/Estado/Departamento', value: data.province_state || '' },
        { label: 'Email', value: data.email || '' },
        { label: 'Teléfono', value: data.phone || '' },
        { label: 'Reclutador', value: data.recruiter_name || '' },
        { label: 'Ubicación del Hogar', value: data.home_location_link || '' },
        { label: 'Facebook', value: data.facebook_url || '' },
    ]);

    // Documentos
    const documentsInfo = [
        { label: 'Tipo de Documento', value: getEnumName(enums.documentType, data.document_type) },
        { label: 'Número de Documento', value: data.document_number || '' },
        { label: '¿Cuenta con Licencia de Conducir?', value: data.has_driver_license ? 'Sí' : 'No' },
    ];

    addSection('DOCUMENTOS DE IDENTIFICACIÓN', documentsInfo);

    // Información Académica y Pathway
    addSection('INFORMACIÓN ACADÉMICA', [
        { label: 'Nivel Educativo', value: getEnumName(enums.educationLevel, data.education_level) },
        { label: 'Nivel English Connect', value: getEnumName(enums.englishConnectLevel, data.english_connect_level) },
        { label: 'Nivel Pathway', value: getPathwayLevelName(data.pathway_level) },
        { label: 'Nivel BYU Pathway', value: getPathwayLevelName(data.byu_pathway_level) },
    ]);

    // Información Religiosa
    addSection('INFORMACIÓN RELIGIOSA', [
        { label: 'Estado de Membresía', value: getMemberStatusName(data.member_status) },
        { label: 'Número de Certificado de Miembro', value: data.member_certificate_number || '' },
        { label: 'Año de Bautismo', value: data.baptism_year?.toString() || '' },
        { label: 'Misionero Retornado', value: data.is_returned_missionary ? 'Sí' : 'No' },
        { label: 'Misión Servida', value: data.mission_served || '' },
        { label: 'Año de Finalización de Misión', value: data.mission_end_year?.toString() || '' },
        { label: 'Estatus del Templo', value: data.temple_status ? 'Sí' : 'No' },
        { label: 'Llamamiento Actual', value: data.current_calling || '' },
        { label: 'Estaca', value: getEnumName(enums.stakes, data.stake_id) },
        { label: 'Barrio/Rama', value: data.ward_branch || '' },
    ]);

    // Información de Salud
    const healthDifficulties = data.has_health_difficulties === undefined ? 'No especificado' : data.has_health_difficulties ? 'Sí' : 'No';

    const healthInfo = [{ label: '¿Tiene dificultades de salud para estudios intensivos?', value: healthDifficulties }];

    if (data.has_health_difficulties === true) {
        healthInfo.push({ label: 'Tipo de Medicamento', value: getMedicationTypeName(data.medication_type) });

        if (data.medication_type === 'other') {
            healthInfo.push({ label: 'Especificación del Medicamento', value: data.medication_other_description || '' });
        }

        if (data.medication_type && data.medication_type !== 'no_medication') {
            healthInfo.push({ label: 'Frecuencia del Medicamento', value: getMedicationFrequencyName(data.medication_frequency) });
        }
    }

    addSection('DECLARACIÓN DE SALUD', healthInfo);

    // Acuerdos
    addSection('ACUERDOS Y COMPROMISOS', [
        { label: 'Términos y Condiciones', value: data.agreement_terms_accepted ? 'Aceptado' : 'Pendiente' },
        { label: 'Política de Privacidad', value: data.agreement_privacy_accepted ? 'Aceptado' : 'Pendiente' },
        { label: 'Código de Conducta', value: data.agreement_conduct_accepted ? 'Aceptado' : 'Pendiente' },
        { label: 'Declaración de Salud', value: data.agreement_health_accepted ? 'Aceptado' : 'Pendiente' },
    ]);

    // Comentarios adicionales
    if (data.comments) {
        addSection('COMENTARIOS ADICIONALES', [{ label: 'Observaciones', value: data.comments }]);
    }

    // Pie de página
    const totalPages = pdf.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.text(`Página ${i} de ${totalPages}`, pageWidth - 40, 290);
        pdf.text('Sistema de Gestión de Estudiantes - SIGEF', margin, 290);
    }

    // Descargar el PDF
    const fileName = `registro_estudiante_${data.first_name}_${data.last_name}_${new Date().getTime()}.pdf`;
    pdf.save(fileName);
};
