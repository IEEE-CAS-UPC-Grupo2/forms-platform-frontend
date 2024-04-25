import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="bg-cas-white h-[8%] fixed top-0 w-full flex items-center px-8">
      <div className="z-10">
        <Link
          href="https://github.com/IEEE-CAS-UPC-Grupo2"
          className="hover:underline hover:underline-offset-2"
        >
          Visita IEEE CAS UPC
        </Link>
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
