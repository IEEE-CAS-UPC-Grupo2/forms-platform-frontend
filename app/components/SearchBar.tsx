import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const SearchBar = () => {
  return (
    <div className="hidden md:flex h-18 pb-10 text-cas-gray-mid">
      <input
        className="h-full w-full p-2 border-cas-gray-mid border-[1.6px] rounded-s focus:outline-none"
        placeholder="Buscar un evento..."
      />
      <button className="h-18 bg-cas-gray-mid rounded-e text-cas-white w-10">
        <FontAwesomeIcon icon={faSearch} size="lg" />
      </button>
    </div>
  );
};
