import { api } from "@/shared/services/api";
import { 
    authResponseSchema, 
    authUserSchema, 
    type AuthResponse, 
    type AuthUser, 
    type LoginFormData 
} from "../types/auth.schemas";

export async function loginRequest(
    data: LoginFormData
): Promise<AuthResponse> {
    const response = await api.post("/auth/login", data);
    return authResponseSchema.parse(response.data);
}

export async function getMeRequest(): Promise<AuthUser> {
    const response = await api.get("/auth/me");
    return authUserSchema.parse(response.data);
}