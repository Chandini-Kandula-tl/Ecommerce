import { IOption } from "@/utils/interfaces";
import { FC, useEffect, useState } from "react";

interface ICheckBox {
  className?: string;
  categories: IOption[];
  inputClassName?: string;
  onSelect?: (name: string, value: string[] | string) => void;
  name: string;
  selectedItems: string[];
}

export const CheckBox: FC<ICheckBox> = ({
  className = "",
  categories,
  inputClassName,
  onSelect,
  name,
  selectedItems,
  ...props
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => {
    setSelected(selectedItems);
  }, [selectedItems]);

  const handleCheckBox = (category: IOption) => {
    // console.log(category, "category");
    const updatedSelected = selected.includes(category.value)
      ? selected.filter((cat) => cat !== category.value)
      : [...selected, category.value];
    setSelected(updatedSelected);

    if (onSelect && name) {
      onSelect(name, updatedSelected);
    }
  };
  // console.log(selected, "selected");
  return (
    <div
      className={
        "flex flex-col gap-[10px] font-primary font-normal text-[13px] leading-[17px] tracking-[-0.4px] text-[#000000] relative " +
        className
      }
    >
      {categories.map((category) => (
        <label key={category.value} className="flex items-center">
          <input
            type="checkbox"
            className={
              "appearance-none h-5 w-5 border border-borderColor cursor-pointer " +
              inputClassName
            }
            // checked={selected.includes(category.value)}
            onChange={() => handleCheckBox(category)}
            {...props}
          />
          {selected.includes(category.value) && (
            <div className="absolute pl-[3px] text-black">✔</div>
          )}
          <span className="ml-2">{category.label}</span>
        </label>
      ))}
    </div>
  );
};
