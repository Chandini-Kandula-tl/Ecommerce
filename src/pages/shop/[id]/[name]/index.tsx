import { Button } from "@/components/Button";
import { Carousel } from "@/components/Carousel";
import { CustomDropDown } from "@/components/CustomDropDown";
import { Quantity } from "@/components/Quantity";
import { AppContext } from "@/pages/_app";
import { formatCost } from "@/utils/helpers";
import { useContext } from "react";

const productDetails = () => {
  const { productDetails } = useContext(AppContext);

  const products = {
    product_id: productDetails.product_id,
    product_name: productDetails.product_name,
    // images: productDetails.images,
    available_sizes: productDetails.available_sizes,
    available_colours: productDetails.available_colours,
    price: productDetails.price,
    category: productDetails.category,
    rating: productDetails.rating,
  };

  return (
    <div className="mt-[147px] flex gap-[96px]">
      <div className="w-[50%]">
        <Carousel slides={productDetails.images} />
      </div>
      <div className="flex-1">
        <div className="font-primary font-semibold text-[36px] leading-[48px] tracking-[-3%] text-[#000000]">
          {products.product_name}
        </div>
        <div className="font-primary font-normal text-[24px] leading-[36px] tracking-[-3%] text-[#000000]">
          {formatCost(products.price)}
        </div>
        <div className="mt-[15px] max-w-[357px] font-primary font-normal text-lg leading-[24px] tracking-[-3%] text-[#000000]">
          Revamp your style with the latest designer trends in men’s clothing or
          achieve a perfectly curated wardrobe thanks to our line-up of timeless
          pieces.
        </div>
        <div className="mt-[15px] flex gap-[15px]">
          <Quantity className="w-[167px] h-[50px]" countClassName="px-[30px]" />
          <CustomDropDown
            showDefault={true}
            list={products.available_sizes}
            optionClassName="pl-4"
            // label="Size"
            // labelClassName="pl-2"
          />
        </div>
        <div className="mt-4 font-secondary font-normal text-sm leading-[20px] tracking-[-0.4px] text-[#979797]">
          {"Height of model: 189 cm. / 6′ 2″ Size 41"}
        </div>
        <div className="mt-[23px] flex gap-[13px]">
          <Button
            buttonName={`Add to Cart - ${formatCost(productDetails.price)}`}
            buttonClassName="py-[14px] px-[33px] font-primary font-semibold text-[xxs] leading-[22px] tracking-[-0.4px] bg-[#000000] !text-[#FFFFFF]"
            onClick={() => {}}
          />
          <Button
            buttonName="Buy Now"
            buttonClassName="py-[14px] px-[37px] font-primary font-semibold text-[xxs] leading-[22px] tracking-[-0.4px] !text-[#FFFFFF] bg-[#2F80ED]"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default productDetails;
