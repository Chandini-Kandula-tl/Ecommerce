import { Button } from "@/components/Button";
import { ColorPicker } from "@/components/ColorPicker";
import { MultipleImages } from "@/components/MultipleImages";
import { Quantity } from "@/components/Quantity";
import { SizePicker } from "@/components/SizePicker";
import { AppContext } from "@/pages/_app";
import { formatCost } from "@/utils/helpers";
import Image from "next/image";
import { useContext, useState } from "react";
import favorite from "../../../../public/images/Favorites Icon.svg";
import group from "../../../../public/images/Group.svg";

const colors = [
  {
    color_id: "eceb9c64-dc1d-400a-aa9a-96acea6540ab",
    color_name: "Red",
    color_code: "#EB5757",
  },
  {
    color_id: "683e16c9-7b12-444c-8635-88815fc796db",
    color_name: "Light Blue",
    color_code: "#56CCF2",
  },
  {
    color_id: "49714c3d-b511-4f07-806e-7d1132a92736",
    color_name: "Orange",
    color_code: "#DF9167",
  },
  {
    color_id: "8bb2b153-6f7b-448e-81ec-57598a3704e4",
    color_name: "Purple",
    color_code: "#7B61FF",
  },
  {
    color_id: "9f1e7277-1e65-47cd-91df-4105559e4ba1",
    color_name: "Violet",
    color_code: "#BB6BD9",
  },
  {
    color_id: "14589614-09ec-4efb-b47a-13d513a15d6b",
    color_name: "Green",
    color_code: "#219653",
  },
];

const sizes = [
  {
    size_id: "cfca2f5e-dfc5-4ff5-a90f-c4f7e300f105",
    size_type: "S",
  },
  {
    size_id: "a5376391-5223-4f23-927e-c15c326942c2",
    size_type: "M",
  },
  {
    size_id: "cf442b22-abe8-4222-befe-1ee98d7f5a29",
    size_type: "L",
  },
  {
    size_id: "fe7e65ec-ef43-4fdd-80d2-ad99b7d4ac85",
    size_type: "XL",
  },
];

const Product = () => {
  const { productDetails } = useContext(AppContext);
  const [isSelected, setIsSelected] = useState<{
    size_ids: string[];
    color_ids: string[];
  }>({
    size_ids: [],
    color_ids: [],
  });

  const handleInput = (name: string, value: string | string[]) => {
    setIsSelected((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex pt-[105px] h-[80%]">
      <MultipleImages
        rootClassName="w-[50%]"
        images={productDetails.images}
        imageClassName="h-[45%] w-[45%] bg-black"
      />
      <div className="">
        {/* product details */}
        <div className="flex justify-between items-baseline">
          <div className="font-primary font-normal text-[36px] leading-11 tracking-[-1.5px] text-borderColor break-all max-w-[75%]">
            {productDetails.product_name}
          </div>
          <div className=" flex">
            <Image
              src={favorite}
              alt="favorite"
              className="ml-[15px] cursor-pointer"
            />
            <Image
              src={group}
              alt="group"
              className="ml-[12.76px] text-borderColor cursor-pointer"
            />
          </div>
        </div>
        <div className="flex items-center  gap-[15px] text-borderColor font-normal mt-[6px] font-primary mb-[22px]">
          <div className="text-large leading-[26px] tracking-[-0.3px]">
            {formatCost(productDetails.price)}
          </div>
          <div className="flex border border-[#C4C4C4] text-[xs] py-[3px] px-[11px] leading-[22px] tracking-[-0.4px] ">
            <div className="">or 4 interest-free payments of $25.00.</div>
            <div className="underline cursor-pointer"> Learn more</div>
          </div>
        </div>
        <div className="font-primary text-large font-normal leading-[26px] tracking-[-0.3px] text-borderColor mb-[7px]  max-w-[360px]">
          Revamp your style with the latest designer trends in mens clothing or
          achieve a perfectly curated wardrobe thanks to our line-up of timeless
          pieces.
        </div>
        <ColorPicker
          name="color_ids"
          className="mb-[11px] text-[#979797]"
          className2="mb-[11px]"
          colors={colors.map((color) => ({
            label: color.color_code,
            value: color.color_id,
          }))}
          selectedColors={isSelected.color_ids}
          onSelect={(name, value) => handleInput(name, value)}
          multiple={true}
        />
        <SizePicker
          name="size_ids"
          className="font-primary font-normal text-18px leading-[26px] tracking-[-0.3px] mb-[11px] !text-[#979797]"
          className2="mb-[27px] w-[50px] h-[50px] cursor-pointer !border-[#979797] "
          buttonClass="!text-[#000000]"
          alreadySelectedSizes={isSelected.size_ids}
          multiple={false}
          sizes={sizes.map((size) => ({
            label: size.size_type,
            value: size.size_id,
          }))}
        />
        <div className="underline font-primary font-normal text-xs leading-[26px] tracking-[-0.3px] text-borderColor mb-[12px] cursor-pointer">
          {`Size & FitGuide`}
        </div>
        <div className="flex flex-row justify-between">
          <div className="font-secondary font-normal text-sm leading-[20px] tracking-[-0.4px]  text-[#979797]">
            {`Height of model: 189 cm./6'2"Size 41`}
          </div>
          <div className="font-primary font-normal text-lg leading-[26px] mr-[40px] tracking-[-0.3px] text-[#979797]">
            Quantity
          </div>
        </div>
        <div className="flex mb-[12px] gap-[18px] mt-[10px]">
          <Button
            buttonClassName="border py-[14px] px-[110px] bg-primary font-semibold text-[16px] text-white tracking-[-0.4px] leading-[22px]"
            buttonName={`Add to Cart - ${formatCost(productDetails.price)}`}
            onClick={() => {}}
          />
          <Quantity className="w-[100%] h-[100%]" />
        </div>
        <div className="flex gap-[14px] text-[#979797]">
          <div>Free standard shipping</div>
          <div className="underline cursor-pointer">Free Returns</div>
        </div>
      </div>
    </div>
  );
};

export default Product;
