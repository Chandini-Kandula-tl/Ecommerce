import {
  validateEmail,
  validateNumber,
  validatePassword,
  validateText,
} from "@/utils/helpers";
import Image from "next/image";
import { DetailedHTMLProps, FC, InputHTMLAttributes, useState } from "react";
import EyeOff from "../../public/images/EyeOff.png";
import EyeOpen from "../../public/images/EyeOpen.png";
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
  showPasswordIcon?: boolean;
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
  isSearch = false,
  showPasswordIcon = true,
  onChange,
  name,
  isValid,
  isText,
  required,

  ...props
}) => {
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

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
          setError(
            errorMessage ||
              "Password must be 8-12 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
          );
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
    <div className="relative w-[100%]">
      <input
        className={
          `w-full h-10 text-sm font-primary ${
            isSearch
              ? "border-none outline-none"
              : "border-[0.5px] border-borderColor"
          } text-black font-normal ` + className
        }
        type={type === "password" && showPassword ? "text" : type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete="off"
        required={required}
        {...props}
      />
      {type === "password" && (
        <div className="absolute right-4 top-5" onClick={togglePassword}>
          <Image
            src={type === "password" && showPassword ? EyeOpen : EyeOff}
            alt="visibility icon"
            className="cursor-pointer"
          />
        </div>
      )}
      {error && (
        <div className="text-red-800 font-light text-[12px] mt-[3px]">
          {error}
        </div>
      )}
    </div>
  );
};
