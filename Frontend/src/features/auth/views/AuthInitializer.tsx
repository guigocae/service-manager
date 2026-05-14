import { type ReactNode, useEffect } from "react";
import { useMe } from "../hooks/useMe";
import { useAuthStore } from "../store/authStore";

type AuthInitializerProps = {
  children: ReactNode;
};

export function AuthInitializer({ children }: AuthInitializerProps) {
  const token = useAuthStore(state => state.token);
  const setUser = useAuthStore(state => state.setUser);
  const clearAuth = useAuthStore(state => state.clearAuth);
  const setIsLoadingAuth = useAuthStore(state => state.setIsLoadingAuth);

  const meQuery = useMe(!!token);

  useEffect(() => {
    if (!token) {
      clearAuth();
      setIsLoadingAuth(false);
      return;
    }

    if (meQuery.isSuccess) {
      setUser(meQuery.data);
      setIsLoadingAuth(false);
    } 

    if (meQuery.isError) {
      clearAuth();
      setIsLoadingAuth(false);
    }
  }, [
    token,
    meQuery.isSuccess,
    meQuery.isError,
    meQuery.data,
    setUser,
    clearAuth,
    setIsLoadingAuth,
  ]);

  return <>{children}</>
}
