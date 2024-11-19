"use client";

import { FormCommunity } from "@/app/components/FormCommunity";
import { FormContactUs } from "@/app/components/FormContactUs";
import { FormNewsletters } from "@/app/components/FormNewsletters";
import { FormObjectivesGoals } from "@/app/components/FormObjectivesGoals";
import { FormProjects } from "@/app/components/FormProjects";
import { FormSubsection } from "@/app/components/FormSubsection";
import { FormWhoWeAre } from "@/app/components/FormWhoWeAre";
import withAuth from "@/app/withAuth";

interface PageProps {
  params: { website_id: string };
}

const SUBSECTION_COMPONENTS = {
  "671096cf566d0b1dc6168f9c": { name: "¿Quiénes Somos?", component: FormWhoWeAre },
  "671096fe566d0b1dc6168f9e": { name: "Objetivos y Metas", component: FormObjectivesGoals },
  "671999e9f7f3dfd0fe377106": { name: "Comunidad", component: FormCommunity },
  "6715850fb841f11aaa03003e": { name: "Noticias", component: FormNewsletters },
  "67158549b841f11aaa030040": { name: "Proyectos", component: FormProjects },
  "6733fff6ac66bd76f926806b": { name: "Contáctanos", component: FormContactUs },
};

function Page({ params }: PageProps) {
  const subsection = SUBSECTION_COMPONENTS [
    params.website_id as keyof typeof SUBSECTION_COMPONENTS
  ];

  const SubsectionComponent = subsection.component;
  const subsectionName = subsection.name;

  return (
    <main className="overflow-auto pt-4 pb-28">
      <div className="mt-16 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center my-8">
          <h1 className="text-center">Subsección «{subsectionName}»</h1>
        </div>

        <div className="bg-cas-gray-light sm:p-5 flex flex-col justify-center items-center rounded shadow-cas-gray-light drop-shadow w-2/3 sm:w-3/5">
          <FormSubsection />
        </div>

        <div className="bg-cas-gray-light sm:p-5 flex flex-col justify-center items-center rounded shadow-cas-gray-light drop-shadow w-2/3 sm:w-3/5">
          {SubsectionComponent ? (
            <SubsectionComponent />
          ) : (
            <p>No se encontró el contenido solicitado.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default withAuth(Page);