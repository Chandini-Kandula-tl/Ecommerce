import {
  validateEmail,
  validateNumber,
  validatePassword,
  validateText,
} from "@/utils/helpers";
import { DetailedHTMLProps, FC, InputHTMLAttributes, useState } from "react";
interface ICustomInput
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className: string;
  type: "text" | "number" | "password" | "email";
  placeholder: string;
  errorMessage?: string;
  min: number;
  max: number;
  source?: string;
  isSearch?: boolean;
  value?: string;
  isValid?: ({
    valid,
    value,
    name,
  }: {
    valid: boolean;
    value: string;
    name: string;
  }) => void;
  isText?: ({ value, name }: { value: string; name: string }) => void;
  required?: boolean;
}

export const CustomInput: FC<ICustomInput> = ({
  type,
  placeholder,
  width,
  errorMessage,
  min,
  max,
  source,
  className,
  value,
  isSearch = false,
  onChange,
  name,
  isValid,
  isText,
  required,
  ...props
}) => {
  const [error, setError] = useState<string>("");

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    // setInput(value);
    setError("");
    if (value.length === 0) {
      isValid?.({ valid: true, value, name });
      return;
    } else {
      if (type === "email") {
        if (validateEmail(value)) {
          isValid?.({ valid: true, value, name });
          setError("");
        } else {
          setError(errorMessage || "Invalid email");
          isValid?.({ valid: false, value, name });
        }
      } else if (type === "password") {
        if (validatePassword(value)) {
          isValid?.({ valid: true, value, name });
          setError("");
        } else {
          setError(errorMessage || "Password too short");
          isValid?.({ valid: false, value, name });
        }
      } else if (type === "text") {
        isText?.({ value, name });
        if (validateText(value)) {
          isValid?.({ valid: true, value, name });
          setError("");
        } else {
          setError(errorMessage || "Invalid text");
          isValid?.({ valid: false, value, name });
        }
      } else if (type === "number") {
        if (validateNumber(value, max, min)) {
          isValid?.({ valid: true, value, name });
          setError("");
        } else {
          setError(errorMessage || "Invalid number");
          isValid?.({ valid: false, value, name });
        }
      }
      onChange?.(value);
    }
  };

  return (
    <div className="w-[100%]">
      <input
        className={
          `w-full h-10 text-sm font-primary ${
            isSearch
              ? "border-none outline-none"
              : "border-[0.5px] border-borderColor"
          } text-black font-normal ` + className
        }
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete="off"
        required={required}
      />
      {error && (
        <div className="text-red-800 font-light text-[12px]">{error}</div>
      )}
    </div>
  );
};
