interface CustomButtonProps {
  color?: "green" | "black" | "red";
  children: React.ReactNode;
  onClick?: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  color = "green",
  children,
  onClick,
}) => {
  let buttonClasses =
    "py-2 px-4 min-w-40 text-[14px] rounded-lg text-cas-white hover:shadow-md hover:opacity-90";

  switch (color) {
    case "black":
      buttonClasses += " bg-cas-black";
      break;
    case "red":
      buttonClasses += " bg-cas-red";
      break;
    default: // green
      buttonClasses += " bg-cas-green";
      break;
  }

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};
