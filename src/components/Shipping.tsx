import { Button } from "@/components/Button";
import { CheckBox } from "@/components/CheckBox";
import { useTotalContext } from "@/context/productContext";
import { useState } from "react";
import { toast } from "react-toastify";

interface IShipping {
  onButtonClick?: (message: string) => void;
}
const shippingTypes = [
  {
    type: "UPS/USPS Surepost",
    value: "sure_post",
    deliveryTime: "4-7 Business Days",
  },
  {
    type: "UPS Ground Shipping ",
    value: "ground_shipping",
    deliveryTime: "3-5 Business Days",
  },
];
export const Shipping = ({ onButtonClick }: IShipping) => {
  const { dispatch } = useTotalContext();
  const [selectedType, setSelectedType] = useState<string>("");
  const handleSelection = (value: string) => {
    dispatch({ type: "UPDATE_SHIPPING", payload: { shipping: value } });
    setSelectedType(value);
  };
  const handleButton = () => {
    if (selectedType && onButtonClick) {
      onButtonClick("clicked");
    } else {
      toast.error("Please, select an option!!");
    }
  };
  return (
    <div>
      <div className="w-full mt-[37px]">
        <div className="bg-white w-full pl-[19px] pb-[17px]">
          <div>
            {shippingTypes.map((type, index) => (
              <div
                key={type.value}
                className={`bg-white w-full pt-[25px] pl-[19px] pb-[17px] ${
                  index < shippingTypes.length - 1 ? "mb-3" : ""
                }`}
              >
                <CheckBox
                  categories={[{ label: type.type, value: type.value }]}
                  name="shipping"
                  selectedItems={[selectedType]}
                  className="font-primary font-bold text-xxs leading-[18.8px] tracking-[-0.36px] text-[#111111]"
                  onSelect={(name, value) => handleSelection(type.value)}
                />
                <div className="font-primary font-normal text-xxs leading-[18.8px] tracking-[-0.36px] text-[#000000] ml-[30px] mt-[11px]">
                  {type.deliveryTime}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button
          buttonName="Continue to payment"
          buttonClassName="bg-[#000000] !text-[#FFFFFF] w-full py-[14px] font-primary font-semibold text-[16px] leading-[22px] tracking-[-0.4px]"
          rootClassName="mt-[119px]"
          onClick={handleButton}
        />
      </div>
    </div>
  );
};
