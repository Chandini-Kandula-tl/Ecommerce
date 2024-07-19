import { IOption } from "@/utils/interfaces";
import { FC, useState } from "react";
import { Button } from "./Button";

interface ISizePicker {
  sizes: IOption[];
  className?: string;
  className2?: string;
  buttonClass?: string;
  // onClick?: (size: string, multiple: string) => void;
  onSelect?: (name: string, value: string | string[]) => void;
  alreadySelectedSizes: string[];
  multiple: boolean;
  name: string;
}

export const SizePicker: FC<ISizePicker> = ({
  className,
  className2,
  buttonClass,
  alreadySelectedSizes,
  // onClick,
  onSelect,
  multiple,
  sizes,
  name,
}) => {
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const handleSizeSelection = (size: IOption) => {
    setSelectedSize((prev) => {
      let newSelectedSizes: string[] = [];
      if (multiple) {
        const isSelected = prev.includes(size.value);
        newSelectedSizes = isSelected
          ? prev.filter((selectedSize) => selectedSize !== size.value)
          : [...prev, size.value];
      } else {
        newSelectedSizes = [size.value];
      }
      if (onSelect && name) {
        onSelect(name, newSelectedSizes);
      }
      return newSelectedSizes;
    });
  };
  // useEffect(() => {
  //   setSelectedSize(alreadySelectedSizes);
  // }, [alreadySelectedSizes]);

  return (
    <div>
      <div
        className={
          "font-normal tracking-[-0.3px] leading-[26px] text-[18px] mb-[11px] text-borderColor " +
          className
        }
      >
        Size
      </div>
      <div className="flex">
        {sizes.map((size) => (
          <div
            key={size.value}
            className={
              "border mr-2 border-boxBorder leading-[22px] tracking-[-0.4px] flex justify-center items-center " +
              className2
            }
            style={{
              borderWidth: alreadySelectedSizes.includes(size.value)
                ? "2px"
                : "1px",
            }}
            onClick={() => handleSizeSelection(size)}
          >
            <Button
              buttonClassName={
                "font-primary font-semibold text-xxs " + buttonClass
              }
              buttonName={size.label}
              onClick={() => handleSizeSelection(size)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
