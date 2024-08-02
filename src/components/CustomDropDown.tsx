import { IOption } from "@/utils/interfaces";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import downArrow from "../../public/images/downArrow.svg";

interface ICustomDropDown {
  label?: string;
  rootClassName?: string;
  list?: { label: string; value: string }[];
  showDefault?: boolean;
  labelClassName?: string;
  optionClassName?: string;
  name?: string;
  onSelect?: (name: string, value: string | string[]) => void;
  isMultiple?: boolean;
  placeholder?: string;
  defaultValue?: string;
  selectedItems?: IOption[];
}

export const CustomDropDown: FC<ICustomDropDown> = ({
  label,
  rootClassName = "",
  list = [],
  showDefault = true,
  labelClassName = "",
  optionClassName = "",
  name,
  isMultiple = false,
  onSelect,
  placeholder,
  defaultValue,
  selectedItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IOption[]>([]);

  useEffect(() => {
    if (defaultValue) {
      let result = list.find((item) => item.value === defaultValue);
      if (result) {
        let newSelectedItems = [result];
        setSelectedItem(newSelectedItems);
        if (onSelect && name) {
          onSelect(
            name,
            newSelectedItems.map((item) => item.value)
          );
        }
      }
    } else if (selectedItems) {
      setSelectedItem(selectedItems);
    }
  }, [defaultValue, list, onSelect, name]);

  const handleScroll = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClickedItem = (item: IOption) => {
    setSelectedItem((prev) => {
      let newSelectedItem: IOption[] = [];
      if (isMultiple) {
        const isSelected = prev.some((i) => i.value === item.value);
        newSelectedItem = isSelected
          ? prev.filter((i) => i.value !== item.value)
          : [...prev, item];
      } else {
        newSelectedItem = [item];
      }

      if (onSelect && name) {
        onSelect(
          name,
          newSelectedItem.map((i) => i.value)
        );
      }

      return newSelectedItem;
    });
    setIsOpen(false);
  };

  const handleRemoveItem = (item: IOption) => {
    setSelectedItem((prev) => prev.filter((i) => i.value !== item.value));
  };

  const handleRemoveOption = (item: any) => {
    const updatedSelectedItem = selectedItem.filter(
      (i) => i.value !== item.value
    );
    setSelectedItem(updatedSelectedItem);

    if (onSelect && name) {
      onSelect(
        name,
        updatedSelectedItem.map((i) => i.value)
      );
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center w-auto min-w-[160px] border border-borderColor cursor-pointer ${rootClassName}`}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
      }}
    >
      {isOpen && (
        <div
          className="fixed h-[100vh] w-[100vw] inset-0"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        ></div>
      )}
      <button className="flex items-center justify-between font-normal w-full">
        <div className="flex">
          <div className={labelClassName}>{label}</div>
          {showDefault && selectedItem.length === 0 ? (
            <div className={optionClassName}>{list[0]?.label}</div>
          ) : selectedItem.length === 0 ? (
            <div className="font-primary font-normal text-[14px] leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD] pl-4">
              {placeholder}
            </div>
          ) : (
            <div className={"flex gap-1"}>
              {selectedItem.map((item) => (
                <span
                  key={item.label}
                  className={`text-black bg-[#A9ABBD] px-2 rounded-md flex items-center text-[14px] gap-4 ml-2 ${
                    isMultiple ? "bg-[#A9ABBd]" : "bg-transparent"
                  }`}
                  onClick={(e) => {
                    if (isMultiple) {
                      e.stopPropagation();
                      handleRemoveItem(item);
                    }
                  }}
                >
                  {item.label}{" "}
                  {isMultiple && (
                    <span
                      className="text-[10px] text-gray"
                      onClick={() => handleRemoveOption(item)}
                    >
                      X
                    </span>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
        <Image
          src={downArrow}
          alt="Dropdown Arrow"
          className={`${isOpen ? "rotate-180" : ""}`}
          style={{ position: "absolute", right: "10px" }}
        />
      </button>

      {isOpen && (
        <div className="absolute top-[120%] w-full bg-white shadow-md rounded-md z-10">
          {list
            .filter((item) => {
              if (!showDefault) {
                return item.value !== defaultValue;
              }
              return !selectedItem.some((i) => i.label === item.label);
            })
            .map((item) => (
              <div
                key={item.label}
                className="cursor-pointer font-secondary font-normal text-[17px] leading-[26px] tracking-[-0.3px] text-[#000000] py-2 px-4"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickedItem(item);
                }}
              >
                {item.label}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
