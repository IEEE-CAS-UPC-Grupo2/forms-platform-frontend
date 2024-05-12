interface CustomButtonProps {
  color?: "green" | "black" | "red";
  text: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  color = "green",
  text,
}) => {
  let buttonClasses = "font-semibold py-2 px-4 rounded";

  switch (color) {
    case "black":
      buttonClasses += " bg-black text-white";
      break;
    case "red":
      buttonClasses += " bg-red-500 hover:bg-red-700 text-white";
      break;
    default: // green
      buttonClasses += " bg-cas-green hover:bg-green-700 text-white";
      break;
  }

  return (
    <button className="py-2 px-4 min-w-44 rounded-md bg-cas-green text-cas-white hover:shadow-md hover:opacity-95">
      {text}
    </button>
  );
};
