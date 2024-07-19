import { FC, useState } from "react";

interface ICollapse {
  data: IData[];
}

interface IData {
  title: string;
  content: string;
}

export const Collapse: FC<ICollapse> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const toggleCollapsable = (index: number) => {
    setIsOpen(isOpen === index ? null : index);
  };

  return (
    <div className="text-secondary">
      {data.map((item, index) => (
        <div
          key={index}
          className="mb-[11px] font-primary text-xxs leading-[22px] tracking-[-0.4px]"
        >
          <div
            className="flex justify-between cursor-pointer pt-4 pb-[11px] font-semibold"
            onClick={() => toggleCollapsable(index)}
          >
            {item.title}
            <span>{isOpen === index ? "-" : "+"}</span>
          </div>
          {isOpen === index && (
            <div className="mb-[11px] font-normal">{item.content}</div>
          )}
          <div className="border"></div>
        </div>
      ))}
    </div>
  );
};
