import { z } from "zod";
import validatePhoneLength from "@/lib/schemas/custom-phone-validation";

export const referralFormSchema = z.object({
    name: z.string().min(1, "El nombre del referido es obligatorio."),
    gender: z.coerce.number().min(1, "El género es obligatorio"),
    country_id: z.coerce.number().min(1, "El país es obligatorio"),
    age: z.coerce.number().min(18, "La edad mínima es 18 años"),
    phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos").refine((val) => validatePhoneLength(val), {
        message: "El teléfono debe tener entre 7 y 10 dígitos.",
    }),
    stake_id: z.coerce.number().min(1, "La estaca/distrito/misión es obligatoria"),
    referrer_name: z.string().min(1, "Tu nombre es obligatorio"),
    referrer_phone: z.string().min(1, "Tu teléfono es obligatorio").refine((val) => validatePhoneLength(val), {
        message: "El teléfono debe tener entre 7 y 10 dígitos.",
    }),
    relationship_with_referred: z.coerce.number().min(1, "La relación con la persona referida es obligatoria"),
});