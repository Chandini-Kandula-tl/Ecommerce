import { getApi, postApi } from "@/api-client/methods";
import { Button } from "@/components/Button";
import { CustomDropDown } from "@/components/CustomDropDown";
import { CustomInput } from "@/components/CustomInput";
import { useTotalContext } from "@/context/productContext";
import { IAddressData } from "@/utils/interfaces";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

interface IRouterParameters extends ParsedUrlQuery {
  id?: string;
  size?: string;
  color?: string;
  quantity?: string; // quantity is typically a string in query params
}

const countries = [
  { country_name: "India", value: "india" },
  { country_name: "Aus", value: "aus" },
];
const cities = [
  { city_name: "Vizag", value: "vizag" },
  { city_name: "Srikakula", value: "srikakulam" },
];
interface IAddress {
  onButtonClick?: (message: string) => void;
}
export const Address = ({ onButtonClick }: IAddress) => {
  const [loader, setLoader] = useState({ pageLoader: true });
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [input, setInput] = useState<{
    firstName: string;
    lastName: string;
    address: string;
    optionalAddress: string;
    city: string;
    country: string;
    pincode: number;
    optionalText: string;
  }>({
    firstName: "",
    lastName: "",
    address: "",
    optionalAddress: "",
    city: "",
    country: "",
    pincode: 0,
    optionalText: "",
  });
  const [addressData, setAddressData] = useState<IAddressData[]>([]);
  const [formToggle, setFormToggle] = useState<boolean>(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const { dispatch } = useTotalContext();

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = async () => {
    try {
      const response = await getApi<{ addresses: IAddressData[] }>({
        endUrl: "user/addresses",
      });
      if (response?.data) {
        setAddressData(response?.data?.addresses);
        if (response?.data?.addresses.length === 0) {
          setFormToggle(true);
        }
      }
    } catch (err) {
    } finally {
      setLoader((prev) => ({ ...prev, pageLoader: false }));
    }
  };

  const handleCheck = () => {
    setIsCheck((prev) => !prev);
  };

  const handleInput = (name: string, value: any) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleButton = async (e: any) => {
    e.preventDefault();
    const selectedAddress = addressData.find(
      (address) => address.id === selectedAddressId
    );
    const data = {
      first_name: selectedAddressId
        ? selectedAddress?.first_name
        : input.firstName,
      last_name: selectedAddressId
        ? selectedAddress?.last_name
        : input.lastName,
      address_line1: selectedAddressId
        ? selectedAddress?.address_line1
        : input.address,
      address_line2: selectedAddressId
        ? selectedAddress?.address_line2
        : input.optionalAddress,
      city: selectedAddressId
        ? selectedAddress?.city
        : [input?.city].join() || "",
      country: selectedAddressId
        ? selectedAddress?.country
        : [input?.country].join() || "",
      pincode: selectedAddressId
        ? selectedAddress?.pincode
        : input.pincode.toString(),
    };

    if (isCheck) {
      const response = await postApi({ endUrl: "user/add-address", data });
      if (response?.status && onButtonClick) {
        toast.success(response?.message);
        dispatch({ type: "UPDATE_ADDRESS", payload: { address: data } });
        onButtonClick("clicked");
      } else {
        toast.error(response?.message);
      }
    } else {
      dispatch({ type: "UPDATE_ADDRESS", payload: data });
      if (selectedAddressId && onButtonClick) {
        onButtonClick("clicked");
      } else {
        toast.error("Please, select an option");
      }
    }
  };

  const defaultAddress = () => {
    return (
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
            list={countries.map((country) => ({
              label: country.country_name,
              value: country.value,
            }))}
            showDefault={false}
            optionClassName="font-semibold text-[14px] leading-[16.45px] tracking-[-0.3px] text-borderColor"
            // onSelect={({ value, name }) => handleInput(value, name)}
            onSelect={(name, value) => handleInput(name, value)}
          />
          <CustomDropDown
            name="city"
            label="City"
            labelClassName="font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD] pl-4 pr-2"
            showDefault={false}
            optionClassName="font-semibold text-[14px] leading-[16.45px] tracking-[-0.3px] text-borderColor"
            list={cities.map((city) => ({
              label: city.city_name,
              value: city.value,
            }))}
            onSelect={(value, name) => {
              handleInput(value, name);
            }}
          />
          <CustomInput
            className="pl-[16px] bg-transparent"
            type="number"
            name="pincode"
            placeholder="Pincode"
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
        <div className="flex gap-1 mt-[23px]">
          <input
            type="checkbox"
            checked={isCheck}
            className="font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#979797]"
            onChange={() => handleCheck()}
            id="remember me"
          />
          <label className="font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#979797]">
            Save contact information{" "}
          </label>
        </div>
        <div
          className="font-primary font-bold text-xxs leading-[22px] tracking-[-0.4px] !text-[#FFFFFF] bg-[#000000] w-[100%] py-[10px] mt-[30px] text-center cursor-pointer"
          onClick={() => setFormToggle(false)}
        >
          Choose address
        </div>
        <div className="mt-5 text-center ">or</div>
        <Button
          type="submit"
          buttonName="Continue to shipping"
          buttonClassName="font-primary font-bold text-xxs leading-[22px] tracking-[-0.4px] !text-[#FFFFFF] bg-[#000000] w-[100%] py-[10px]"
          // onClick={() => router.push("/shipping")}
          // onClick={() => handleButton()}
          rootClassName="mt-[30px]"
        />
      </form>
    );
  };

  const addAddress = () => {
    return (
      <form onSubmit={handleButton}>
        {addressData?.map((address, index) => (
          <div
            key={address.id}
            className={`bg-white w-full pt-[17px] pl-[19px] pb-[17px] ${
              index < addressData.length - 1 ? "mb-3" : ""
            }`}
          >
            <div className="flex items-center">
              <input
                type="radio"
                id={`address-${address.id}`}
                name="selectedAddress"
                value={address.id}
                className="mr-2"
                onChange={() => setSelectedAddressId(address.id)}
              />
              <label
                htmlFor={`address-${address.id}`}
                className="font-primary text-sm leading-[16.45px] tracking-[-0.3px] text-[#252525]"
              >
                {`Address_Line1 : ${address.address_line1}, Address_Line2 : ${address.address_line2},City : ${address.city},Country : ${address.country}, PinCode : ${address.pincode}`}
              </label>
            </div>
          </div>
        ))}
        <div
          className="font-primary font-bold text-xxs leading-[22px] tracking-[-0.4px] !text-[#FFFFFF] bg-[#000000] w-[100%] py-[10px] mt-[30px] text-center cursor-pointer"
          onClick={() => setFormToggle(true)}
        >
          Add new address
        </div>
        <div className="mt-5 text-center ">or</div>
        <Button
          type="submit"
          buttonName="Continue to shipping"
          buttonClassName="font-primary font-bold text-xxs leading-[22px] tracking-[-0.4px] !text-[#FFFFFF] bg-[#000000] w-[100%] py-[10px]"
          rootClassName="mt-[20px]"
        />
      </form>
    );
  };

  return (
    <Spinner loading={loader.pageLoader}>
      <div className="w-full">
        <div className="font-primary font-normal text-[xl] leading-[28px] tracking-[-0.4px] text-[#252525] mt-[35px] mb-3">
          Shipping Information
        </div>
        {formToggle ? defaultAddress() : addAddress()}
      </div>
    </Spinner>
  );
};
