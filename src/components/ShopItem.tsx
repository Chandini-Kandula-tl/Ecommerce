import { AppContext } from "@/pages/_app";
import { IProduct } from "@/utils/interfaces";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
// import Image, { StaticImageData } from 'next/image'

interface IShopItem {
  items: IProduct[];
  rootClassName?: string;
}

export const ShopItem: FC<IShopItem> = ({ items, rootClassName }) => {
  const { setProductDetails } = useContext(AppContext);
  const router = useRouter();

  const handleImageClick = (product: IProduct) => {
    setProductDetails(product);
    console.log(product);
    router.push(`/shop/${product.product_id}`);
  };
  return (
    <div className={"grid-cols-4 grid gap-y-5 overflow-scroll" + rootClassName}>
      {items.map((item, index) => (
        <div
          key={index}
          className={
            "w-[264.03px] text-lg leading-[28px] tracking-[-0.4px] text-borderColor font-primary max-w-[230px] break-all "
          }
        >
          <Image
            src={item.images[0]}
            alt={item.product_name}
            width={265}
            height={265}
            onClick={() => handleImageClick(item)}
            className="cursor-pointer"
          />
          <div className="flex justify-between mt-[12.69px] ">
            <div className="font-[700] ">{item.product_name}</div>
            <div className="font-normal">{item.available_sizes[0]}</div>
          </div>
          <div className="font-normal">{item.price}</div>
        </div>
      ))}
    </div>
  );
};
