import Link from "next/link";
import { CustomInput } from "./CustomInput";
interface IContent {
  title: string;
  options: IObject[];
}
interface IObject {
  title: string;
  path: string;
}
const shop = {
  title: "Shop",
  options: [
    { title: "Women's", path: "" },
    { title: "Men's", path: "" },
    { title: "kid's", path: "" },
    { title: "Shoes", path: "" },
    { title: "Equipment", path: "" },
    { title: "By Activity", path: "" },
    { title: "Gift Cards", path: "" },
    { title: "Sale", path: "" },
  ],
};
const help = {
  title: "Help",
  options: [
    { title: "Help Center", path: "" },
    { title: "Order Status", path: "" },
    { title: "Size Chart", path: "" },
    { title: "Returns & Waranty", path: "" },
    { title: "Contatct Us", path: "" },
  ],
};
const about = {
  title: "About",
  options: [
    { title: "About Us", path: "" },
    { title: "Responsibility", path: "" },
    { title: "Technology & Innovation", path: "" },
    { title: "Explore our stories", path: "" },
  ],
};

export const Footer = () => {
  const handleRendering = (object: IContent) => {
    return (
      <div>
        <div className="font-semibold text-xxs leading-[22px] tracking-[-0.4px] text-textSecondary mb-[21px]">
          {object.title}
        </div>
        {object.options.map((item, index) => (
          <div
            key={index}
            className="font-medium text-xxs leading-[26px] tracking-[-0.2px] text-textSecondary"
          >
            <Link href={item.path}> {item.title}</Link>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="flex font-primary bg-[#EFF2F6] pt-[45px] justify-between">
      <div>
        <div className="font-semibold text-[36px] leading-[44px] tracking-[-1.5px] text-borderColor mb-[10px]">
          Sign up for our newsletter
        </div>
        <div className="font-normal text-sm leading-[16.45px] tracking-[-0.3px] mb-[23px] max-w-[80%]">
          Be the first to know about our special offers, new product launches,
          and events.
        </div>
        <div className="relative">
          <CustomInput
            type="email"
            placeholder="Email Address"
            className="pl-4 py-[11.5px] bg-transparent font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] h-10"
            max={0}
            min={0}
          />
          <button className="absolute font-primary font-bold text-sm leading-[16.45px] tracking-[-0.3px] text-borderColor top-[50%] right-[20px] mt-[-8px]">
            Sign Up
          </button>
        </div>
      </div>
      {handleRendering(shop)}
      {handleRendering(help)}
      {handleRendering(about)}
    </div>
  );
};
