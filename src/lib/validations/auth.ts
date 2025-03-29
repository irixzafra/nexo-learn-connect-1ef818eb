
import * as z from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50, { message: "El nombre no puede exceder 50 caracteres" }),
  email: z
    .string()
    .email({ message: "Por favor ingresa un correo electrónico válido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .regex(/[A-Z]/, { message: "La contraseña debe incluir al menos una letra mayúscula" })
    .regex(/[a-z]/, { message: "La contraseña debe incluir al menos una letra minúscula" })
    .regex(/[0-9]/, { message: "La contraseña debe incluir al menos un número" }),
  passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Las contraseñas no coinciden",
  path: ["passwordConfirm"],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Por favor ingresa un correo electrónico válido" }),
  password: z
    .string()
    .min(1, { message: "Por favor ingresa tu contraseña" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
