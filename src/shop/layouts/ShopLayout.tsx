import { Outlet } from "react-router";
import { CustomHeader } from "../components/CustomHeader";
import { CustomFooter } from "../components/CustomFooter";
import { CartDrawer } from "../components/CartDrawer";

export const ShopLayout = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-navy">
      <CustomHeader />
      <Outlet />
      <CustomFooter />
      <CartDrawer />
    </div>
  );
};
