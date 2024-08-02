import { getApi } from "@/api-client/methods";
import { Button } from "@/components/Button";
import { COVER_IMAGE } from "@/utils/constants";
import { IHomePageProduct } from "@/utils/interfaces";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import press from "../../../public/images/press-logos.svg";
const home = () => {
  const router = useRouter();
  const [productsData, setProductsData] = useState<IHomePageProduct[]>([]);

  const getProductsData = async () => {
    try {
      const getApiData = await getApi<{ products: IHomePageProduct[] }>({
        endUrl: "home",
      });
      setProductsData(getApiData?.data?.products || []);
    } catch (message: any) {
      toast.error(message?.message);
    }
  };

  const handleImageClick = (product: IHomePageProduct) => {
    router.push(`/shop/${product.product_id}`);
  };

  const ShopButton = () => (
    <Button
      buttonName="Shop All"
      buttonClassName="bg-transparent !text-[#000000] py-[14px] px-[66px] font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px]"
      rootClassName="border border-[#0D0D0D] mt-5 text-center"
      onClick={() => router.push("/shop")}
    />
  );

  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <div className="mt-[66px] h-[100%]">
      <div className="flex flex-col items-center justify-center">
        <div className="font-primary font-semibold text-[56px] leading-[62px] tracking-[-2.4px] text-center">
          Better clothing for the planet
        </div>
        <div className="mt-[19px] max-w-[40%] font-primary font-normal text-xl leading-[28px] tracking-[-0.4px] text-[#979797] text-center ">
          Create screens directly in Method or add your images from Sketch or
          Figma. You can even sync designs from your cloud storage!
        </div>
        <ShopButton />
        <Image
          src={COVER_IMAGE}
          alt="image not found"
          width={1500}
          height={521}
          className="mt-10 text-center"
        />
        <Image src={press} alt="press not found" className="mt-[31px]" />
        <div className="mt-[66px] font-primary font-semibold text-[56px] leading-[62px] tracking-[-2.4px] text-center text-[#000000]">
          Our latest arrivals
        </div>
        <div className="text-center mt-[19px] font-primary font-normal text-xl leading-[28px] tracking-[-0.4px] max-w-[40%] text-[#979797]">
          Create screens directly in Method or add your images from Sketch or
          Figma. You can even sync designs from your cloud storage!
        </div>
        <ShopButton />
        <div className="my-[66px] flex gap-[25px] w-[100%] justify-between">
          {productsData.map((product, index) => (
            <div
              key={product.product_id}
              className={`flex ${
                index !== 1 ? "mt-[80px]" : ""
              } w-[33%] h-[521px]`}
            >
              <img
                src={product.images[0]}
                alt={product.product_name}
                // width={368}
                // height={521}
                // layout="fill"
                width={"100%"}
                height={"100%"}
                className="mt-[85px] cursor-pointer"
                onClick={() => handleImageClick(product)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default home;
