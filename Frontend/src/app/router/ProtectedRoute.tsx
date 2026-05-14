import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";
import type { ReactNode } from "react";

type ProtectedRouterProps = {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouterProps) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isLoadingAuth = useAuthStore(state => state.isLoadingAuth);

  if (isLoadingAuth) 
    return <div>Carregando...</div>;

  if (!isAuthenticated) 
    return <Navigate to="/login" replace />;

  return <>{children}</>
}