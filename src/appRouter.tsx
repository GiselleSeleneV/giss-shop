import { createBrowserRouter, Navigate } from "react-router";
import { ShopLayout } from "./shop/layouts/ShopLayout";
import { HomePage } from "./shop/page/home/HomePage";
import { ProductPage } from "./shop/page/product/ProductPage";
import { GenderPage } from "./shop/page/gender/GenderPage";
import { HelpPage } from "./shop/page/help/HelpPage";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
import { DashboardPage } from "./admin/pages/dashboard/DashboardPage";
import { AdminProductPage } from "./admin/pages/product/AdminProductPage";
import { lazy } from "react";
import { AdminProductsPage } from "./admin/pages/products/AdminProductsPage";

const AuthLayout = lazy(() => import("./auth/layouts/AuthLayout"));
const AdminLayout = lazy(() => import("./admin/layouts/AdminLayout"));

export const AppRouter = createBrowserRouter([
  //Public routes
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "product/:idSlug",
        element: <ProductPage />,
      },
      {
        path: "gender/:gender",
        element: <GenderPage />,
      },
      {
        path: "ayuda",
        element: <HelpPage />,
      },
    ],
  },
  //Auth routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        //Redirect to login page sino esta auth
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  //Admin routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "product/:idSlug",
        element: <AdminProductPage />,
      },
      {
        path: "products",
        element: <AdminProductsPage />,
      },
    ],
  },
  {
    //Redirect to home page if route not found
    path: "*",
    element: <Navigate to="/" />,
  },
]);
