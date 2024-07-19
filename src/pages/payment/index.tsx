import { Button } from "@/components/Button";
import { Cart } from "@/components/Cart";
import { CustomDropDown } from "@/components/CustomDropDown";
import { CustomInput } from "@/components/CustomInput";
import { Steps } from "@/components/Steps";
import { Switch } from "@/components/Switch";
import apple from "../../../public/images/apple.svg";
import payPal from "../../../public/images/PayPal 1.svg";
const payment = () => {
  return (
    <div className="flex gap-[253px]">
      <div className="mt-[111px] w-[50%]">
        <div className="font-primary font-semibold text-[36px] leading-[44px] tracking-[-1.5px] text-[#000000]">
          Checkout
        </div>
        <Steps selectedStep="Payment" rootClassName="mt-[13px]" />
        <div className="mt-[27px] flex gap-[6px]">
          <Button
            src={payPal}
            buttonClassName="bg-white !border-[#1D4D90] h-[38.36px] w-[153.45px]"
          />
          <Button
            src={apple}
            buttonName="Pay"
            buttonClassName="bg-black !text-[#FFFFFF] h-[38.36px] w-[153.45px]"
            imageClass="w-[9.45px] h-[11.27px]"
          />
        </div>
        <div className="font-primary font-normal text-xl leading-[28px] tracking-[-0.4px] mt-[22px]">
          Payment Details
        </div>
        <CustomInput
          className="mt-[14px] pl-4 font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] bg-transparent"
          placeholder="Cardholder Name"
          type="text"
          max={0}
          min={0}
        />
        <CustomInput
          className="mt-[10px] pl-4 font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] bg-transparent"
          placeholder="Card Number"
          type="text"
          max={0}
          min={0}
        />
        <div className="mt-[10px] flex flex-1 gap-4 w-[100%] h-[40px]">
          <CustomDropDown
            label="Month"
            list={["Jan", "Feb", "Mar"]}
            showDefault={false}
            labelClassName="font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD] py-[11.5px] pl-[16px]"
            optionClassName="font-normal text-[14px] leading-[16.45px] tracking-[-0.3px] text-borderColor py-[11.5px] pl-2"
          />
          <CustomDropDown
            label="Year"
            list={["2024", "2025", "2026"]}
            showDefault={false}
            labelClassName="font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD] py-[11.5px] pl-[16px]"
            optionClassName="font-normal text-[14px] leading-[16.45px] tracking-[-0.3px] text-borderColor py-[11.5px] pl-2"
          />
          <CustomInput
            className="pl-4 font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] bg-transparent"
            placeholder="CVC"
            type="number"
            max={0}
            min={0}
          />
        </div>
        <div className="flex justify-between mt-[28.5px]">
          <div className="font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#000000]">
            Save card data for future payments
          </div>
          <Switch />
        </div>
        <Button
          buttonName="Pay with card"
          buttonClassName="w-full font-primary font-semibold text-[16px] leading-[22px] tracking-[-0.4px] !text-[#FFFFFF] bg-[#000000] h-[50px]"
          rootClassName="mt-[33.5px]"
          onClick={() => {}}
        />
      </div>
      <div className="mt-[206px] w-[50%]">
        <div className="font-primary font-normal text-xl leading-[28px] tracking-[-0.4px] text-[#252525] ">
          Your cart
        </div>
        <div className="mt-[21px]">
          <Cart
            item={[
              {
                image:
                  "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
                productName: "Men's Winter Jacket",
                size: "L",
                quantity: "1",
                cost: "$99",
              },
            ]}
          />
          <div className="border my-[17px]"></div>
          <Cart
            item={[
              {
                image:
                  "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
                productName: "Men's Winter Jacket",
                size: "L",
                quantity: "1",
                cost: "$99",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default payment;
