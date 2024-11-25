import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Footer } from "@/app/components/Footer";

const montserrat = Montserrat({ subsets: ["latin"] });

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Toaster } from "react-hot-toast";
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
          <Toaster position="bottom-right" reverseOrder={false} toastOptions={{
            style: {
              marginBottom: '80px'
            }
          }} />
          <div>{children}</div>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
