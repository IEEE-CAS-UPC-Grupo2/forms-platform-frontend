import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

export const NavbarAlt = () => {
  return (
    <header className="z-10 bg-cas-white h-[8%] fixed top-0 w-full flex items-center px-8">
      <div className="z-10">
        <Link
          href="/"
          className="hover:underline hover:underline-offset-2 flex"
        >
          <FontAwesomeIcon icon={faArrowLeftLong} size="lg" />
          <div className="ml-2">Regresar</div>
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
