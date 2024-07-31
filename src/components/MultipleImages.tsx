// import productDetails from "@/pages/shop/[id]/[name]";
import { useRouter } from "next/router";
import { FC } from "react";
interface IMulImages {
  images: string[];
  rootClassName?: string;
  imageClassName?: string;
  selectedSize?: string;
  quantity?: number;
  product_id?: string;
  selectedColor?: string;
}

export const MultipleImages: FC<IMulImages> = ({
  images,
  rootClassName,
  imageClassName,
  selectedSize,
  quantity,
  product_id,
  selectedColor,
}) => {
  const router = useRouter();
  // endUrl: `list-products?page=${
  //   props.pageNumber
  // }&limit=${LIMIT}&sort_by=${dropDownSelection}${
  //   categoryQuery ? `&${categoryQuery}` : ""
  // }${colorQuery ? `&${colorQuery}` : ""}`,
  // const { productDetails } = useContext(AppContext);

  const handleImageClick = () => {
    router.push(
      `/shop/${product_id}/category?quantity=${quantity}&size=${selectedSize}&color=${selectedColor}`
    );
  };

  return (
    <div
      className={"flex flex-wrap gap-[11px] " + rootClassName}
      // style={{ maxHeight: "500px" }}
    >
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
