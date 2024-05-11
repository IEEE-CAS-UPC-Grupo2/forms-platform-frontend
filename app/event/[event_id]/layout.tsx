import type { Metadata } from "next";
import { NavbarAlt } from "../../components/NavbarAlt";

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
        <NavbarAlt></NavbarAlt>
        <div className="bg-red-400 h-[92%]">{children}</div>
      </div>
    </div>
  );
}
