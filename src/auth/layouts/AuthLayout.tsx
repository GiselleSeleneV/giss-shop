import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-[#f7f3eb] p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl animate-soft-scale">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
