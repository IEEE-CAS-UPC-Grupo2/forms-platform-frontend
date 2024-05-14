"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faTiktok,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";

export const Footer = () => {
  const [svgSize, setSvgSize] = useState({
    viewBox: "0 0 1250 80",
    path: "M0 80V0H1250L1206 80H0Z",
  });
  useLayoutEffect(() => {
    const updateSvgSize = () => {
      const screenWidth = window.innerWidth;
      let updatedSvgSize = {
        viewBox: "0 0 1250 80",
        path: "M0 80V0H1250L1206 80H0Z",
      };

      if (screenWidth > 2400) {
        updatedSvgSize = {
          viewBox: "0 0 2200 80",
          path: "M0 80V0H2200L2156 80H0Z",
        };
      } else if (screenWidth <= 2400 && screenWidth > 2200) {
        updatedSvgSize = {
          viewBox: "0 0 2000 80",
          path: "M0 80V0H2000L1956 80H0Z",
        };
      } else if (screenWidth <= 2200 && screenWidth > 2000) {
        updatedSvgSize = {
          viewBox: "0 0 1800 80",
          path: "M0 80V0H1800L1756 80H0Z",
        };
      } else if (screenWidth <= 2000 && screenWidth > 1850) {
        updatedSvgSize = {
          viewBox: "0 0 1600 80",
          path: "M0 80V0H1600L1556 80H0Z",
        };
      } else if (screenWidth <= 1850 && screenWidth > 1650) {
        updatedSvgSize = {
          viewBox: "0 0 1450 80",
          path: "M0 80V0H1450L1406 80H0Z",
        };
      } else if (screenWidth <= 1650 && screenWidth > 1440) {
        updatedSvgSize = {
          viewBox: "0 0 1250 80",
          path: "M0 80V0H1250L1206 80H0Z",
        };
      }

      setSvgSize(updatedSvgSize);
    };

    updateSvgSize();

    const resizeListener = () => {
      requestAnimationFrame(updateSvgSize);
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return (
    <footer className="flex flex-row bg-cas-green h-20 text-cas-white">
      <svg
        className="w-auto fill-cas-gray h-20 hidden nav:flex"
        viewBox={svgSize.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={svgSize.path} />
        <image href="/cas-logo-horizontal.svg" className="h-12" x="28" y="16" />
      </svg>
      <div className="flex flex-col justify-center w-full nav:w-auto text-center mx-auto">
        <div className="flex flex-row justify-evenly mb-1 mx-auto w-40 ">
          <Link href="/">
            <FontAwesomeIcon icon={faTiktok} size="xl" />
            {
              // TODO: No TikTok available yet
            }
          </Link>
          <Link href="https://www.instagram.com/ieee.cas.upc/">
            <FontAwesomeIcon icon={faInstagram} size="xl" />
          </Link>
          <Link href="https://www.linkedin.com/company/ieee-cas-upc/?viewAsMember=true">
            <FontAwesomeIcon icon={faLinkedin} size="xl" />
          </Link>
        </div>
        <p>@ieee.cas.upc</p>
      </div>
    </footer>
  );
};
