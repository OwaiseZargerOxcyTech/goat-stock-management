import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./routes";
import { AuthProvider } from "./routes/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
    ,
  </StrictMode>
);
