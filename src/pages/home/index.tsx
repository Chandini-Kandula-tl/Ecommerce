import { getApi } from "@/apiClient/methods";
import { Button } from "@/components/Button";
import { IHomePageProduct } from "@/utils/interfaces";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import press from "../../../public/images/press-logos.svg";
const home = () => {
  const router = useRouter();
  const [response, setResponse] = useState<IHomePageProduct[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const getApiData = await getApi<{ products: IHomePageProduct[] }>({
      endUrl: "home",
    });

    setResponse(getApiData?.data?.products);
  };
  const handleShopButton = () => {
    return (
      <Button
        buttonName="Shop All"
        buttonClassName="bg-transparent !text-[#000000] py-[14px] px-[66px] font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px]"
        rootClassName="border border-[#0D0D0D] mt-5 text-center"
        onClick={() => router.push("/shop")}
      />
    );
  };
  const handleImageClick = (product: IHomePageProduct) => {
    console.log(product);
    router.push(`/shop/${product.product_id}`);
  };
  console.log(response, "asdfghjkl");
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
        {handleShopButton()}
        <Image
          src="https://img.freepik.com/free-psd/landing-page-template-online-fashion-sale_23-2148585400.jpg?w=1480&t=st=1720084475~exp=1720085075~hmac=3d052577ca3bad075514ab630555a1dae5dd74b810e5928adf1a8a3751aefda0"
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
        {handleShopButton()}
        <div className="my-[66px] flex gap-[200px]">
          {response.map((product) => (
            <div key={product.product_id} className="">
              <Image
                src={product.images[0]}
                alt={product.product_name}
                width={368}
                height={521}
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
