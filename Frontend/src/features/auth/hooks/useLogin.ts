import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../services/AuthRepository";

export function useLogin() {
    return useMutation({
        mutationFn: loginRequest,
    });
}