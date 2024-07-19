// import productDetails from "@/pages/shop/[id]/[name]";
import { AppContext } from "@/pages/_app";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
interface IMulImages {
  images: string[];
  rootClassName?: string;
  imageClassName?: string;
}

export const MultipleImages: FC<IMulImages> = ({
  images,
  rootClassName,
  imageClassName,
}) => {
  const router = useRouter();
  const { productDetails } = useContext(AppContext);

  const handleImageClick = () => {
    router.push(
      `/shop/${productDetails.product_id}/${productDetails.category}`
    );
  };

  return (
    <div className={"flex flex-wrap gap-[11px] " + rootClassName}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          className={imageClassName}
          alt="image not found"
          style={{ objectFit: "fill", cursor: "pointer" }}
          onClick={() => handleImageClick()}
        />
      ))}
    </div>
  );
};
