import { CustomButton } from "@/app/components/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function Page({ params }: { params: { event_id: string } }) {
  return (
    <main className="pt-20">
      <h1>Registered Events Page</h1>
      <div>Event id: {params.event_id}</div>
      <CustomButton>
        <FontAwesomeIcon className="pr-2" icon={faShareFromSquare} />
        Comparte el evento
      </CustomButton>
    </main>
  );
}
