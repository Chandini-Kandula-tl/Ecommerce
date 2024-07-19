import { formatCost } from "@/utils/helpers";
import { FC } from "react";
import { CustomInput } from "./CustomInput";
interface IOrderSummary {
  data: {
    sub_amount: number;
    total_amount: number;
  };
  buttonClass?: string;
  rootClassName?: string;
}

export const OrderSummary: FC<IOrderSummary> = ({
  data,
  buttonClass,
  rootClassName,
}) => {
  return (
    <div className={rootClassName}>
      {/* <div className="font-primary font-semibold text-xxl leading-[30px] tracking-[-0.55px] text-[#000000]">
        Order Summary
      </div> */}
      <CustomInput
        className="mt-[29px] pl-[16px] bg-transparent"
        placeholder="Enter coupon code here"
        type="text"
        isSearch={false}
        max={0}
        min={0}
      />
      <div className="flex justify-between mt-[27px]">
        <div className="font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#0D0D0D]">
          Subtotal
        </div>
        <div className="font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#0D0D0D]">
          {formatCost(data.sub_amount)}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#0D0D0D]">
          Shipping
        </div>
        <div className="font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#0D0D0D]">
          Calculated at the next step
        </div>
      </div>
      <div className="border border-[#000000] my-4"></div>
      <div className="flex justify-between">
        <div className="font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#0D0D0D]">
          Total
        </div>
        <div className="font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#0D0D0D]">
          {formatCost(data.total_amount)}
        </div>
      </div>
      {/* <Button
        buttonName="Continue to checkout"
        buttonClassName={"bg-[#0D0D0D] !text-[#FFFFFF] w-[100%] " + buttonClass}
        rootClassName="mt-9 w-[100%] flex items-center justify-center"
        onClick={() => {}}
      /> */}
    </div>
  );
};
