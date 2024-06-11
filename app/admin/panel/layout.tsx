import type { Metadata } from "next";
import { NavbarAdmin } from "../../components/NavbarAdmin";

export const metadata: Metadata = {
  title: "Eventos - IEEE CAS UPC",
  description: "Inscribete a eventos de CAS UPC",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="h-screen">
        <NavbarAdmin></NavbarAdmin>
        <div>{children}</div>
      </div>
    </div>
  );
}
