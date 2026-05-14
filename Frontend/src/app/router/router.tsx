import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/features/auth/views/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { AppLayout } from "../layouts/AppLayout";
import { routes } from "./routes";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),

    children: routes.map(({ path, element }) => ({
      ...(path === "/" ? { index: true } : { path: path.slice(1) }),
      element,
    }))
  },
]);