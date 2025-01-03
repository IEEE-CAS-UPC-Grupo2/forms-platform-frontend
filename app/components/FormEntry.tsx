import { Field, ErrorMessage } from "formik";

interface FormEntryProps {
  title: string;
  type?: "text" | "email" | "password";
  name: string;
  as?: "input" | "select" | "textarea";
  options?: { value: string; label: string }[];
}

export const FormEntry: React.FC<FormEntryProps> = ({
  title,
  type = "text",
  name,
  as = "input",
  options = [],
}) => {
  return (
    <div className="flex flex-col min-h-24">
      <p>{title}</p>
      {as === "select" ? (
        <Field
          as="select"
          id={name}
          name={name}
          className="mt-1 p-2 border-cas-gray-mid border-[0.5px] rounded text-sm"
        >
          {Array.isArray(options) &&
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </Field>
      ) : (
        <Field
          type={type}
          id={name}
          name={name}
          as={as}
          className="mt-1 p-2 border-cas-gray-mid border-[0.5px] rounded text-sm"
        />
      )}
      <ErrorMessage className="text-xs mt-1" name={name} component="div" />
    </div>
  );
};
