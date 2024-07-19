import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import downArrow from "../../public/images/downArrow.svg";

interface DropDownProps {
  label: string;
  options: string[];
}

const DropDown: React.FC<DropDownProps> = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleOptionClick = (option: string) => {
    if (option === "Sign out") {
      localStorage.clear();
      router.push("/login");
    }
  };

  const handleScroll = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="pr-2 py-2 cursor-pointer"
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
      <div className="relative w-full flex justify-end">
        <button
          className="flex items-center"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
        >
          <span className="mr-2 text-lg leading-[20.57px] tracking-[-0.6px] ml-[22px] text-navFont text-normal">
            {label}
          </span>
          <Image
            src={downArrow}
            alt="click here"
            className={`${isOpen ? "rotate-180" : ""} text-center`}
            style={{ filter: "invert(1)" }}
          />
        </button>

        {/* <button
          className="flex items-center"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span
            className="mr-2 text-lg leading-[20.57px] tracking-[-0.6px] ml-[22px]  text-navFont text-normal"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {label}
          </span>
          <Image
            src={downArrow}
            alt="click here"
            className={`${isOpen ? "rotate-180" : ""} text-center`}
            style={{ filter: "invert(1)" }}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </button> */}
        {isOpen && (
          <div className="absolute border border-black shadow-lg z-10 bg-white rounded top-[200%] w-full">
            {options.map((option, index) => (
              <div
                key={index}
                className="px-2 py-1 cursor-pointer text-lg leading-[20.57px] tracking-[-0.6px] text-[#000000] text-normal"
                onClick={(e) => {
                  // e.stopPropagation();
                  handleOptionClick(option);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;

// style={{ filter: "brightness(0) invert(1)" }}
