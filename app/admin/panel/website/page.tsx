"use client";

import { useEffect, useState } from "react";
import { AdminSectionTable } from "@/app/components/AdminSectionTable";
import withAuth from "../../../withAuth";
import { getSections } from "@/app/api/section";
import { Section } from "@/app/models";

function Page() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await getSections();
        if (Array.isArray(data)) {
          setSections(data);
        } else {
          console.error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching sections: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <main className="flex flex-col pt-20 sm:pt-28 items-center min-h-screen mx-4">
      <h1 className="mb-4 text-center">Administración del Sitio Web</h1>
      <div className="w-full max-w-6xl mt-4">
        <AdminSectionTable sections={sections} />
      </div>
    </main>
  );
}

export default withAuth(Page);
