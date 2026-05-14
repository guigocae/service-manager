import { AuthInitializer } from "@/features/auth/views/AuthInitializer";
import { AppProviders } from "../providers";
import { RouterProvider } from "react-router-dom";
import { router } from "../router/router";

function App() {
  return (
    <AppProviders>
      <AuthInitializer>
        <RouterProvider router={router} />
      </AuthInitializer>
    </AppProviders>
  );
}

export default App
