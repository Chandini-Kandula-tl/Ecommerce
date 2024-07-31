import { IOption } from "@/utils/interfaces";
import { FC, useState } from "react";

interface IColorPicker {
  name: string;
  className: string;
  className2: string;
  colors: IOption[];
  selectedColors: string[];
  multiple: boolean;
  onSelect?: (name: string, value: string | string[]) => void;
}

export const ColorPicker: FC<IColorPicker> = ({
  className,
  className2,
  colors,
  selectedColors,
  onSelect,
  multiple = false,
  name,
}) => {
  console.log(selectedColors);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);

  // useEffect(() => {
  //   setSelectedColor(selectedColors);
  // }, [selectedColors]);

  const handleColorSelection = (color: IOption) => {
    setSelectedColor((prev) => {
      let newSelectedColors: string[] = [];
      if (multiple) {
        const isSelected = prev.includes(color.value);
        newSelectedColors = isSelected
          ? prev.filter((selectedColor) => selectedColor !== color.value)
          : [...prev, color.value];
      } else {
        newSelectedColors = [color.value];
      }

      if (onSelect && name) {
        onSelect(name, newSelectedColors);
      }

      return newSelectedColors;
    });
  };

  return (
    <div>
      <div className={className}>Color</div>
      <div className="flex grid-cols-5 gap-y-[20px] flex-wrap">
        {colors.map((color) => (
          <div key={color.value}>
            <button
              style={{
                backgroundColor: color.label,
                borderWidth: selectedColors.includes(color.value)
                  ? "2px"
                  : "1px",
              }}
              className={`w-10 h-10 rounded-full border border-black mr-[9px] ${className2}`}
              onClick={
                colors.length === 1
                  ? undefined
                  : () => handleColorSelection(color)
              }

              // onClick={() => handleColorSelection(color)}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
};
