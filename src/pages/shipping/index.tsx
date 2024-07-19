import { Button } from "@/components/Button";
import { Cart } from "@/components/Cart";
import { CheckBox } from "@/components/CheckBox";
import { Steps } from "@/components/Steps";
import { useRouter } from "next/router";
const shipping = () => {
  const router = useRouter();
  return (
    <div className="flex gap-[255px]">
      <div className="mt-[111px] w-[50%]">
        <div className="font-primary font-semibold text-[36px] leading-[44px] tracking-[-1.5px] text-[#000000]">
          Checkout
        </div>
        <Steps selectedStep="Shipping" rootClassName="mt-[13px]" />
        <div className="bg-white w-full pt-[25px] pl-[19px] pb-[17px] mt-[37px]">
          <CheckBox
            text="UPS/USPS Surepost"
            className="font-primary font-bold text-xxs leading-[18.8px] tracking-[-0.36px] text-[#111111]"
          />
          <div className="font-primary font-normal text-xxs leading-[18.8px] tracking-[-0.36px] text-[#000000] ml-[30px] mt-[11px]">
            4-7 Business Days
          </div>
        </div>
        <div className="bg-white w-full pt-[25px] pl-[19px] pb-[17px] mt-[18px]">
          <CheckBox
            text="UPS Ground Shipping"
            className="font-primary font-bold text-xxs leading-[18.8px] tracking-[-0.36px] text-[#111111]"
          />
          <div className="font-primary font-normal text-xxs leading-[18.8px] tracking-[-0.36px] text-[#000000] ml-[30px] mt-[11px]">
            3-5 Business Days
          </div>
        </div>
        <Button
          buttonName="Continue to payment"
          buttonClassName="bg-[#000000] !text-[#FFFFFF] w-full py-[14px] font-primary font-semibold text-[16px] leading-[22px] tracking-[-0.4px]"
          rootClassName="mt-[119px]"
          onClick={() => router.push("/payment")}
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

export default shipping;
