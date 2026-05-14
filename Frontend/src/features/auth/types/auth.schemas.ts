import { z } from "zod";

export const userRoleSchema = z.enum([
  "Admin",
  "Manager",
  "Technician",
  "User",
]);

export const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

export const authUserSchema = z.object({
  userId: z.number(),
  name: z.string(),
  email: z.email(),
  role: userRoleSchema,
});

export const authResponseSchema = authUserSchema.extend({
  token: z.string(),
});

export type UserRole = z.infer<typeof userRoleSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type AuthUser = z.infer<typeof authUserSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;