import { CustomButton } from "../components/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1>Admin Login Page</h1>
      <CustomButton>Ingresar</CustomButton>
      <br />
      <CustomButton>
        <FontAwesomeIcon className="pr-2" icon={faShareFromSquare} />
        Comparte el evento
      </CustomButton>
    </main>
  );
}
