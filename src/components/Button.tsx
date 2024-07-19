import Image from "next/image";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

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
}

export const Button: FC<IButton> = ({
  buttonName,
  onClick,
  buttonClassName,
  src,
  rootClassName,
  disabled,
  imageClass,
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
        {src && (
          <Image
            src={src}
            alt="image not found"
            className={"pl-[2px] pr-[2px] mt-3 mb-3 " + imageClass}
          />
        )}
        {buttonName}
      </button>
    </div>
  );
};
