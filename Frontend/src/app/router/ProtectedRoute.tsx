import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";
import type { ReactNode } from "react";
import { Spinner } from "@/shared/components/ui/spinner";

type ProtectedRouterProps = {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouterProps) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isLoadingAuth = useAuthStore(state => state.isLoadingAuth);

  if (!isAuthenticated && !isLoadingAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {isLoadingAuth && (
        <div className="fixed inset-0 z-50 w-full h-screen flex justify-center items-center backdrop-blur-sm bg-background/70">
          <Spinner className="size-11" />
        </div>
      )}
      {children}
    </>
  )
}