import Image from "next/image";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import { Loader } from "./Loader";

interface IButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  buttonClassName?: string;
  buttonName?: string;
  onClick?: () => void;
  src?: string;
  rootClassName?: string;
  imageClass?: string;
  isLoading?: boolean;
}

export const Button: FC<IButton> = ({
  buttonName,
  onClick,
  buttonClassName,
  src,
  rootClassName,
  disabled,
  imageClass,
  isLoading,
  ...props
}) => {
  return (
    <div className={rootClassName}>
      <button
        className={
          "flex items-center justify-center font-primary text-primary border-0 border-borderColor " +
          buttonClassName
        }
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {isLoading && (
          <div className="w-[25%] h-[25%] flex items-center justify-center">
            <Loader />
          </div>
        )}
        {src && (
          <Image
            src={src}
            alt="image not found"
            className={"pl-[2px] pr-[2px] mt-3 mb-3 " + imageClass}
          />
        )}
        {!isLoading && buttonName}
      </button>
    </div>
  );
};
