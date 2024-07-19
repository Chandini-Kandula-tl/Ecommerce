import { Button } from "@/components/Button";
import { Cart } from "@/components/Cart";
import { CheckBox } from "@/components/CheckBox";
import { CustomDropDown } from "@/components/CustomDropDown";
import { CustomInput } from "@/components/CustomInput";
import { OrderSummary } from "@/components/OrderSummary";
import { Steps } from "@/components/Steps";
import { useRouter } from "next/router";
import { useState } from "react";
const address = () => {
  const router = useRouter();
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [input, setInput] = useState<{
    firstName: string;
    lastName: string;
    address: string;
    optionalAddress: string;
    city: string;
    country: string;
    zipCode: number;
    optionalText: string;
  }>({
    firstName: "",
    lastName: "",
    address: "",
    optionalAddress: "",
    city: "",
    country: "",
    zipCode: 0,
    optionalText: "",
  });
  const handleInput = (name: string, value: any) => {
    setInput((prev) => ({ ...prev, [name]: value }));
    console.log(input);
  };
  const handleButton = () => {
    console.log(input);
    const data = {
      first_name: input.firstName,
      last_name: input.lastName,
      address_line1: input.address,
      address_line2: input.optionalAddress,
      city: input.city,
      country: input.country,
      zipcode: input.zipCode.toString(),
      optional_text: input.optionalText,
    };
    // router.push("/shipping")
  };
  return (
    <div className="flex gap-[249px]">
      <div className="mt-[111px] w-[50%]">
        <div className="font-primary font-semibold text-[36px] leading-[44px] tracking-[-1.5px] text-[#000000]">
          Checkout
        </div>
        <Steps selectedStep="Address" rootClassName="mt-[13px] w-full" />
        <div className="font-primary font-normal text-[xl] leading-[28px] tracking-[-0.4px] text-[#252525] mt-[35px] mb-3">
          Shipping Information
        </div>
        <form onSubmit={handleButton}>
          <div className="flex gap-[7px]">
            <CustomInput
              className="font-normal font-primary text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD] pl-4 bg-transparent"
              placeholder="FirstName"
              name="firstName"
              type="text"
              max={0}
              min={0}
              required={true}
              isText={({ value, name }) => handleInput(name, value)}
            />
            <CustomInput
              className="font-normal font-primary text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD] pl-4 bg-transparent"
              placeholder="LastName"
              name="lastName"
              type="text"
              max={0}
              min={0}
              required={true}
              isText={({ value, name }) => handleInput(name, value)}
            />
          </div>
          <CustomInput
            className="font-normal font-primary text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD] pl-4 bg-transparent mt-[10px]"
            placeholder="Address"
            name="address"
            type="text"
            max={0}
            min={0}
            required={true}
            isText={({ value, name }) => handleInput(name, value)}
          />
          <CustomInput
            className="font-normal font-primary text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD] pl-4 bg-transparent mt-[10px]"
            placeholder="Apartment, suite, etc (optional)"
            name="optionalAddress"
            type="text"
            max={0}
            min={0}
            required={false}
            isText={({ value, name }) => handleInput(name, value)}
          />
          <CustomInput
            className="font-normal font-primary text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD] pl-4 bg-transparent mt-[10px]"
            placeholder="City"
            name="city"
            type="text"
            max={0}
            min={0}
            required={true}
            isText={({ value, name }) => handleInput(name, value)}
          />
          <div className="flex gap-4 mt-[10px]">
            <CustomDropDown
              name="country"
              label="Country"
              labelClassName="font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD] pl-4 pr-2"
              list={["India", "Aus", "Japan", "Italy", "Germany"]}
              showDefault={false}
              optionClassName="font-semibold text-[14px] leading-[16.45px] tracking-[-0.3px] text-borderColor"
              // onSelect={({ value, name }) => handleInput(value, name)}
              onSelect={(name, value) => handleInput(name, value)}
            />
            <CustomDropDown
              name="city"
              label="City"
              labelClassName="font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD] pl-4 pr-2"
              list={["Vizag", "Srikakulam", "Kurnool", "Guntur", "Chitoor"]}
              showDefault={false}
              optionClassName="font-semibold text-[14px] leading-[16.45px] tracking-[-0.3px] text-borderColor"
              onSelect={(value, name) => {
                handleInput(value, name);
              }}
            />
            <CustomInput
              className="pl-[16px] bg-transparent"
              type="number"
              name="zipCode"
              placeholder="Zipcode"
              max={6}
              min={6}
              required={true}
              isValid={({ value, name }) => handleInput(name, value)}
            />
          </div>
          <CustomInput
            className="font-normal font-primary text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD] pl-4 bg-transparent mt-[10px]"
            placeholder="Optional"
            name="optionalText"
            type="text"
            max={0}
            min={0}
            required={false}
            isText={({ value, name }) => handleInput(name, value)}
          />
          <CheckBox
            text="Save contact information"
            className="mt-[23px] font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#979797]"
            onChange={() => setIsCheck((prev) => !prev)}
            checked={isCheck}
          />
          <Button
            type="submit"
            buttonName="Continue to shipping"
            buttonClassName="font-primary font-bold text-xxs leading-[22px] tracking-[-0.4px] !text-[#FFFFFF] bg-[#000000] w-[100%] py-[10px]"
            // onClick={() => router.push("/shipping")}
            // onClick={() => handleButton()}
            rootClassName="mt-[30px]"
          />
        </form>
      </div>
      <div className="mt-[157px] w-[50%]">
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
        <OrderSummary
          data={{
            sub_amount: 200,
            total_amount: 200,
          }}
        />
      </div>
    </div>
  );
};

export default address;
