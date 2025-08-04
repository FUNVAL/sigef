import { z } from "zod";

// Función auxiliar para validar campos obligatorios que pueden ser null/undefined
function requiredField(ctx: z.RefinementCtx, value: unknown, path: string[], message: string) {
    if (value === null || value === undefined) {
        ctx.addIssue({
            path,
            code: z.ZodIssueCode.custom,
            message,
        });
    }
}

export const preRegistrationSchema = z.object({
    first_name: z.string().min(1, "El primer nombre es obligatorio."),
    last_name: z.string().min(1, "El primer apellido es obligatorio."),
    gender: z.number().min(1, "El género es obligatorio."),
    age: z.coerce.number().min(18, "Edad mínima 18").max(100, "Edad máxima 100."),
    country_id: z.number().min(1, "El país es obligatorio."),
    phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos."),
    stake_id: z.number().min(1, "La estaca es obligatoria."),
    email: z.string().email("Correo inválido."),
    marital_status: z.number().min(1, "El estado civil es obligatorio."),
    served_mission: z.number().min(1, "Este campo es obligatorio."),
});

export const femaleValidationSchema = z.object({
    currently_working: z.boolean().nullable(),
    job_type_preference: z.number().nullable(),
    available_full_time: z.boolean().nullable(),
}).superRefine((data, ctx) => {
    requiredField(ctx, data.currently_working, ["currently_working"], "Este campo es obligatorio");
    if (data.currently_working === false && !data.job_type_preference) {
        ctx.addIssue({
            path: ["job_type_preference"],
            code: z.ZodIssueCode.custom,
            message: "Este campo es obligatorio",
        });
    }
    if (data.job_type_preference === 2 && (data.available_full_time === null || data.available_full_time === undefined)) {
        ctx.addIssue({
            path: ["available_full_time"],
            code: z.ZodIssueCode.custom,
            message: "Este campo es obligatorio",
        });
    }
});