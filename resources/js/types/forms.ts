

/* Desde aqui */

// Primero tipos básicos
export interface Country {
  nombre: string;
  codigo: string;
}

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
  estaTrabajando?: string;
  tipoEmpleoDeseado?: string;
  disponibilidadHorario?: string;
  cursoSeleccionado?: string;
}

export interface Course {
  nombre: string;
  tiempo: string;
  modalidad: string;
}

// Luego los datos, ya usando el tipo definido antes
export const countries: Country[] = [
  { nombre: "Argentina", codigo: "+54" },
  { nombre: "Bolivia", codigo: "+591" },
  { nombre: "Brasil", codigo: "+55" },
  { nombre: "Chile", codigo: "+56" },
  { nombre: "Colombia", codigo: "+57" },
  { nombre: "Costa Rica", codigo: "+506" },
  { nombre: "Ecuador", codigo: "+593" },
  { nombre: "El Salvador", codigo: "+503" },
  { nombre: "Guatemala", codigo: "+502" },
  { nombre: "Honduras", codigo: "+504" },
  { nombre: "México", codigo: "+52" },
  { nombre: "Nicaragua", codigo: "+505" },
  { nombre: "Panamá", codigo: "+507" },
  { nombre: "Paraguay", codigo: "+595" },
  { nombre: "Perú", codigo: "+51" },
  { nombre: "República Dominicana", codigo: "+1" },
  { nombre: "Uruguay", codigo: "+598" },
  { nombre: "Venezuela", codigo: "+58" }
];

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

// Formatos de salida para enviar al backend
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
