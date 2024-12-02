"use client";

import { useRouter } from "next/navigation";

import { ADMIN_ROUTES } from "@/app/admin/constants";
import { useEffect, useState } from "react";
import { subsectionComponents } from "@/app/admin/constants";
import { Subsection } from "@/app/models";
import { getSubsectionById } from "@/app/api/subsection";
import { FormSubsectionHeader } from "@/app/components/FormSubsectionHeader";
import withAuth from "@/app/withAuth";

interface PageProps {
  params: { website_id: string };
}

function Page({ params }: PageProps) {
  const [subsection, setSubsection] = useState<Subsection>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const fetchSubsectionById = async (id: string) => {
    try {
      const data = await getSubsectionById(id);
      setSubsection(data);
    } catch (error) {
      console.error("Error fetching subsections: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubsectionById(params.website_id);
  }, [params.website_id]);

  const selectedComponent =
    subsectionComponents[
      params.website_id as keyof typeof subsectionComponents
    ];

  if (loading) return <p>Cargando...</p>;
  if (!selectedComponent)
    return <p>No se encontró la subsección solicitada.</p>;

  const FormSubsectionContent = selectedComponent.component;

  const goToSections = () => router.push(ADMIN_ROUTES.PANEL.WEBSITE);

  return (
    <main className="overflow-auto pt-4 pb-28">
      <div className="mt-16 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center my-8">
          <h1 className="text-center">
            Edición de subsección «{selectedComponent.name}»
          </h1>
        </div>

        <FormSubsectionHeader id={params.website_id} subsection={subsection} />
        <br />

        {FormSubsectionContent ? (
          <FormSubsectionContent
            id={params.website_id}
            subsection={subsection}
            onContentUpdated={() => {
              fetchSubsectionById(params.website_id);
            }}
          />
        ) : (
          <p>No se encontró el contenido solicitado.</p>
        )}

        <div className="flex justify-end mt-6">
          <button
            className="bg-cas-black py-3 px-4 min-w-32 text-[14px] rounded-lg text-cas-white hover:shadow-md hover:opacity-90"
            onClick={goToSections}
          >
            Cancelar
          </button>
        </div>
      </div>
    </main>
  );
}

export default withAuth(Page);
