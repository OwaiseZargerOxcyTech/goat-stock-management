import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import MaleStockForm from "../components/MaleStockForm";
import FemaleStockForm from "../components/FemaleStockForm";
import TradeModuleForm from "../components/TradeModuleForm";
import DashboardPreview from "../components/DashboardPreview";
import MaleStockList from "../components/MaleStockList";
import FemaleStockList from "../components/FemaleStockList";
import TradeList from "../components/TradeList";
import AdminLogin from "../components/AdminLogin";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<App />} />,
    children: [
      {
        path: "/",
        element: <DashboardPreview />,
      },
      {
        path: "/add-male-stock",
        element: <MaleStockForm />,
      },
      {
        path: "/male-stock-list",
        element: <MaleStockList />,
      },
      {
        path: "/add-female-stock",
        element: <FemaleStockForm />,
      },
      {
        path: "/female-stock-list",
        element: <FemaleStockList />,
      },
      {
        path: "/add-trade",
        element: <TradeModuleForm />,
      },
      {
        path: "/trade-list",
        element: <TradeList />,
      },
    ],
  },
  {
    path: "/login",
    element: <AdminLogin />,
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
