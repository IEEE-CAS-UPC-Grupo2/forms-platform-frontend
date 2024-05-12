import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Footer } from "@/app/components/Footer";
import { Navbar } from "./components/Navbar";

const montserrat = Montserrat({ subsets: ["latin"] });

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Eventos - IEEE CAS UPC",
  description: "Inscribete a eventos de CAS UPC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={montserrat.className}>
        <div className="h-screen">
          <Navbar></Navbar>
          <div className="bg-red-400 h-[92%]">{children}</div>
        </div>
        <Footer></Footer>
      </body>
    </html>
  );
}
