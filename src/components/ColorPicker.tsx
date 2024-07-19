import { IOption } from "@/utils/interfaces";
import { FC, useEffect, useState } from "react";

interface IColorPicker {
  name: string;
  className: string;
  className2: string;
  colors: { label: string; value: string }[];
  selectedColors?: string[];
  multiple: boolean;
  onSelect?: (name: string, value: string | string[]) => void;
  clearFilters?: boolean;
}

export const ColorPicker: FC<IColorPicker> = ({
  className,
  className2,
  colors,
  selectedColors = [],
  onSelect,
  multiple,
  name,
  clearFilters,
}) => {
  const [selectedColor, setSelectedColor] = useState<string[]>(selectedColors);

  useEffect(() => {
    if (clearFilters) {
      setSelectedColor([]);
      if (onSelect && name) {
        onSelect(name, []);
      }
    }
  }, [clearFilters, onSelect, name]);

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
                borderWidth: selectedColor.includes(color.value)
                  ? "2px"
                  : "1px",
              }}
              className={`w-10 h-10 rounded-full border border-black mr-[9px] ${className2}`}
              onClick={() => handleColorSelection(color)}
            >
              {/* {color.label} */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// import { IOption } from "@/utils/interfaces";
// import { FC, useState } from "react";

// interface IColorPicker {
//   name: string;
//   className: string;
//   className2: string;
//   colors: { label: string; value: string }[];
//   onClick?: (color: string, multiple: boolean) => void;
//   selectedColors?: string[];
//   multiple: boolean;
//   onSelect?: (name: string, value: string | string[]) => void;
// }

// export const ColorPicker: FC<IColorPicker> = ({
//   className,
//   className2,
//   colors,
//   selectedColors = [],
//   onClick,
//   onSelect,
//   multiple,
//   name,
// }) => {
//   const [selectedColor, setSelectedColor] = useState<string[]>(selectedColors);

//   const handleColorSelection = (color: IOption) => {
//     setSelectedColor((prev) => {
//       let newSelectedColors: string[] = [];
//       if (multiple) {
//         const isSelected = prev.includes(color.label);
//         newSelectedColors = isSelected
//           ? prev.filter((selectedColor) => selectedColor !== color.label)
//           : [...prev, color.label];
//       } else {
//         newSelectedColors = [color.label];
//       }

//       if (onSelect && name) {
//         onSelect(name, newSelectedColors);
//       }

//       return newSelectedColors;
//     });

//     if (onClick) {
//       onClick(color.value, multiple);
//     }
//   };

//   return (
//     <div>
//       <div className={className}>Color</div>
//       <div className="flex grid-cols-5 gap-y-[20px] flex-wrap">
//         {colors.map((color) => (
//           <div key={color.value}>
//             <button
//               style={{
//                 backgroundColor: color.value,
//                 borderWidth: selectedColor.includes(color.label)
//                   ? "2px"
//                   : "1px",
//               }}
//               className={`w-10 h-10 rounded-full border border-black mr-[9px] ${className2}`}
//               onClick={() => handleColorSelection(color)}
//             >
//               {/* {color.label} */}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
