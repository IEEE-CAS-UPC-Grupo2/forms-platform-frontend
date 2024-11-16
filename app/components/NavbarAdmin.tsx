"use client";

import Image from "next/image";
import { CustomButton } from "../components/CustomButton";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ADMIN_ROUTES, navOptions } from "../admin/routes";

export const NavbarAdmin = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (path: string) => router.push(path);
  const handleLogout = () => {
    const cookies = ["jwt", "idUser", "refreshToken"];
    cookies.forEach((cookie) => {
      Cookies.remove(cookie, { path: "/" });
      Cookies.remove(cookie, { path: "", domain: window.location.hostname });
    });

    router.push(ADMIN_ROUTES.LOGIN);
  };

  return (
    <header className="z-40 bg-cas-white h-[8%] fixed top-0 w-full flex items-center px-8">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/cas-logo-nav.svg"
            width={140}
            height={100}
            alt="Picture of CAS IEEE UPC logo"
          />
        </div>

        <div className="hidden sm:flex justify-center space-x-8">
          {navOptions.map((option) => {
            const isActive = pathname === option.path;
            return (
              <button
                key={option.path}
                className={`px-4 py-2 text-sm font-medium ${
                  isActive ? "bg-cas-black text-cas-white" : "text-gray-600"
                } hover:text-cas-blue rounded-lg`}
                onClick={() => navigateTo(option.path)}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="flex justify-end z-50">
          <CustomButton onClick={handleLogout}>Cerrar Sesión</CustomButton>
        </div>
      </div>
    </header>
  );
};
