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

    children: routes.map((route) => {
      if (route.path === "/") {
        return {
          index: true,
          element: route.element,
        };
      }

      return {
        path: route.path.slice(1),
        element: route.element,
        children: route.children,
      };
    }),
  },
]);