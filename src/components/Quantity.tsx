import { FC, useState } from "react";
import { Button } from "./Button";
interface IQuantity {
  className?: string;
  countClassName?: string;
}
export const Quantity: FC<IQuantity> = ({ className, countClassName }) => {
  const [count, setCount] = useState(1);
  const handleDecrement = () => {
    if (count > 1) setCount(count - 1);
    else setCount(1);
  };
  const handleIncrement = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <div
        className={
          "flex flex-row  w-[100px] items-center justify-center border border-black " +
          className
        }
      >
        <Button
          className="!w-[12px] !h-[2px]"
          onClick={handleDecrement}
          buttonName="-"
        />
        <div
          className={
            "font-normal text-lg leading-[26px] tracking-[-0.3px] mx-[14.5px] " +
            countClassName
          }
        >
          {count}
        </div>
        <Button
          className="!w-[12px] !h-[12px]"
          onClick={handleIncrement}
          buttonName="+"
        />
        {/* <button onClick={handleDecrement} className='w-[11.67px] ml-[10px]'>-</button>
        <div className='font-normal text-lg leading-[26px] tracking-[-0.3px] mx-[14.5px] mt-[12px]'>{count}</div>
        <button onClick={handleIncrement} className='w-[11.67px] mr-[10px]'>+</button> */}
      </div>
    </div>
  );
};
