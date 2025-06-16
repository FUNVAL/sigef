export interface ReferralFormData {
  nombre: string;
  genero: string;
  edad: string;
  pais: string;
  telefono: string;
  estacaZona: string;
  nombreQuienRefiere: string;
  telefonoQuienRefiere: string;
  relacionConReferido: string;
}

export interface PreRegistrationFormData {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  genero: string;
  edad: string;
  pais: string;
  telefono: string;
  estacaZona: string;
  correo: string;
  estadoCivil: string;
  haServidoMision: string;
  // Female-specific fields
  estaTrabajando?: string;
  tipoEmpleoDeseado?: string;
  disponibilidadHorario?: string;
  // Course selection
  cursoSeleccionado?: string;
}

export interface Course {
  nombre: string;
  tiempo: string;
  modalidad: string;
}

export const courses: Course[] = [
  { nombre: "Asesor Comercial", tiempo: "5 semanas", modalidad: "En línea" },
  { nombre: "Aire Acondicionado y Línea Blanca", tiempo: "8 semanas", modalidad: "Semipresencial" },
  { nombre: "Asesor Financiero", tiempo: "7 semanas", modalidad: "En línea" },
  { nombre: "Auxiliar de Farmacia", tiempo: "8 semanas", modalidad: "En línea" },
  { nombre: "Carpintería en Aluminio & Melamina", tiempo: "6 semanas", modalidad: "Semipresencial" },
  { nombre: "Conectividad y redes", tiempo: "7 semanas", modalidad: "Semipresencial" },
  { nombre: "Desarrollo Web Frontend", tiempo: "12 semanas", modalidad: "En línea" },
  { nombre: "Inglés", tiempo: "20 semanas", modalidad: "En línea" },
  { nombre: "Intérprete de Servicios Especializados", tiempo: "3 semanas", modalidad: "En línea" },
  { nombre: "IT Administrator", tiempo: "8 semanas", modalidad: "En línea" },
  { nombre: "Logístico SAP", tiempo: "7 semanas", modalidad: "En línea" },
  { nombre: "Diseño Gráfico & Marketing Digital", tiempo: "7 semanas", modalidad: "En línea" },
  { nombre: "Mecánica de Motos", tiempo: "6 semanas", modalidad: "Semipresencial" }
];

export const countries = [
  "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica", 
  "Ecuador", "El Salvador", "Guatemala", "Honduras", "México", 
  "Nicaragua", "Panamá", "Paraguay", "Perú", "República Dominicana", 
  "Uruguay", "Venezuela"
];

// JSON Output Formats
export interface ReferralFormOutput {
  tipo: 'referencia';
  datos: ReferralFormData;
  timestamp: string;
}

export interface PreRegistrationFormOutput {
  tipo: 'pre-inscripcion';
  datos: PreRegistrationFormData;
  timestamp: string;
}