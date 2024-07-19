import { FC, useState } from "react";
interface ISwitch {
  className?: string;
}

export const Switch: FC<ISwitch> = ({ className }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      onClick={() => setIsSelected(!isSelected)}
      className={
        `w-[39px] h-[24px] relative p-[5px] rounded-[50px] cursor-pointer ${
          isSelected ? "bg-black" : "bg-gray-300"
        } ` + className
      }
    >
      <span
        className={`bg-white rounded-full absolute w-4 h-4 top-1 ${
          isSelected ? "left-[21px]" : "left-[2px]"
        }`}
      />
    </div>
  );
};
