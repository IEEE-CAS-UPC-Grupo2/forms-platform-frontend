"use client";


import Image from "next/image";
import Link from "next/link";
import { CustomButton } from "../components/CustomButton";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Importa correctamente

export const NavbarAdmin = () => {

  const router = useRouter();
  const handleLogout = () => {
    const cookies = ['jwt', 'idUser', 'refreshToken'];
    cookies.forEach(cookie => {
    Cookies.remove(cookie, { path: '/' });
    Cookies.remove(cookie, { path: '', domain: window.location.hostname });
    });
    
    router.push("/admin"); 
  };
  return (
    <header className="z-50 bg-cas-white h-[8%] fixed top-0 w-full flex items-center px-8">
      <div className="w-full flex justify-end">
      <CustomButton onClick={handleLogout}>
            <span>Log Out</span>
      </CustomButton>

      </div>
      <div className="fixed w-full">
        <div className="hidden sm:flex justify-center mr-20">
          <Image
            src="/cas-logo-nav.svg"
            width={140}
            height={100}
            alt="Picture of CAS IEEE UPC logo"
          />
        </div>
      </div>
    </header>
  );
};
