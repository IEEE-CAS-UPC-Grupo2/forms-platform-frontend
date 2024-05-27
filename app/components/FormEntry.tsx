import { Field, ErrorMessage } from "formik";

interface FormEntryProps {
  title: string;
  type?: "text" | "email" | "password";
  name: string;
  as?: "input" | "select" | "textarea";
  options?: string[];
}

export const FormEntry: React.FC<FormEntryProps> = ({
  title,
  type = "text",
  name,
  as = "input",
  options = [],
}) => {
  return (
    <div className="flex flex-col mt-4">
      <small>{title}</small>
      {as === "select" ? (
        <Field
          as="select"
          id={name}
          name={name}
          className="mt-1 p-1 border-cas-gray-mid border-[0.5px] rounded text-sm"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Field>
      ) : (
        <Field
          type={type}
          id={name}
          name={name}
          as={as}
          className="mt-1 p-1 border-cas-gray-mid border-[0.5px] rounded text-sm"
        />
      )}
      <ErrorMessage className="text-xs mt-1" name={name} component="div" />
    </div>
  );
};
