import { Button } from "@/shared/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

import { useLogin } from "../hooks/useLogin";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { 
  type LoginFormData, 
  loginSchema 
} from "../types/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/shared/components/ui/spinner";


export default function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const setAuth = useAuthStore(state => state.setAuth);

  const [loginError, setLoginError] = useState<string | null>(null);

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    try {
      setLoginError(null);

      const response = await loginMutation.mutateAsync(data);

      setAuth(response.token, {
        userId: response.userId,
        name: response.name,
        email: response.email,
        role: response.role,
      });

      navigate("/");
    } catch {
      setLoginError("Email ou senha inválidos.");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen p-5">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Entre na sua conta</CardTitle>
          <CardDescription>
            Digite os campos abaixo para acessar a sua conta
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm font-semibold text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input 
                  id="password" 
                  {...register("password")}
                  type="password" 
                  required 
                />
              </div>
            </div>
              {loginError && (
                <p className="mt-4 text-sm font-semibold text-red-600 text-center">
                  {loginError}
                </p>
              )}
          </CardContent>
          <CardFooter>
            <Button 
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? <Spinner /> : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}