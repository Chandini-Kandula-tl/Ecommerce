import { getApi, postApi } from "@/api-client/methods";
import { Button } from "@/components/Button";
import { ColorPicker } from "@/components/ColorPicker";
import { Loader } from "@/components/Loader";
import { MultipleImages } from "@/components/MultipleImages";
import { Quantity } from "@/components/Quantity";
import { SizePicker } from "@/components/SizePicker";
import { useTotalContext } from "@/context/productContext";
import { formatCost } from "@/utils/helpers";
import {
  ICartSize,
  IProduct,
  IProductDetails,
  ISelectedSizeAndColor,
} from "@/utils/interfaces";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import favorite from "../../../../public/images/Favorites Icon.svg";
import group from "../../../../public/images/Group.svg";

const Product = () => {
  const { dispatch } = useTotalContext();
  const router = useRouter();
  const [productDetails, setProductDetails] = useState<IProduct>({
    product_id: "",
    product_name: "",
    description: "",
    images: [],
    quantity: 1,
    size_ids: [],
    price: 0,
    rating: null,
    color_ids: [],
    category_id: "",
    product_status: "",
    colors: [],
    sizes: [],
    category: { category_id: "", category_name: "" },
  });
  const [isSelected, setIsSelected] = useState<ISelectedSizeAndColor>({
    size_ids: [],
    color_ids: [],
  });
  const [quantity, setQuantity] = useState<number>(1);
  const [loader, setLoader] = useState({
    pageLoader: true,
    buttonLoader: false,
  });

  const getProductData = async () => {
    try {
      const { id } = router.query;
      const response = await getApi<IProductDetails>({
        endUrl: `products/${id}`,
      });
      if (response?.data) {
        setProductDetails(response?.data);
        const defaultSize = response?.data?.size_ids[0];
        const defaultColor = response?.data?.color_ids[0];
        setIsSelected({ size_ids: [defaultSize], color_ids: [defaultColor] });
      }
    } catch (message) {
    } finally {
      setLoader((prev) => ({ ...prev, pageLoader: false }));
    }
  };

  const handleInput = (name: string, value: string | string[] | number) => {
    if (name === "quantity") {
      setQuantity(Number(value));
    }
    setIsSelected((prev) => ({ ...prev, [name]: value }));
  };

  const handleCart = async () => {
    const data = {
      product_id: productDetails.product_id,
      quantity: quantity,
      size_id: isSelected.size_ids.toString(),
      color_id: isSelected.color_ids.toString(),
    };
    setLoader((prev) => ({ ...prev, buttonLoader: true }));
    try {
      const response = await postApi<ICartSize>({
        endUrl: "user/add-to-cart",
        data,
      });
      if (response?.status) {
        dispatch({ type: "ADD_CART", payload: response?.data?.cart_size });
        toast.success(response?.message);
      }
    } catch (err) {
    } finally {
      setLoader((prev) => ({ ...prev, buttonLoader: false }));
    }
  };

  const handleCost = () => {
    return quantity * productDetails.price;
  };

  useEffect(() => {
    getProductData();
  }, [router]);

  return loader.pageLoader ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Loader />
    </div>
  ) : (
    <div className="flex pt-[105px] h-[80%]">
      <MultipleImages
        rootClassName="w-[50%]"
        images={productDetails.images}
        imageClassName={
          productDetails.images.length > 4
            ? "h-[33%] w-[33%]"
            : "h-[45%] w-[45%] bg-black"
        }
        selectedSize={isSelected.size_ids.toString()}
        quantity={quantity}
        product_id={productDetails.product_id}
        selectedColor={isSelected.color_ids.toString()}
      />
      <div className="top-[70px] sticky overflow-auto h-[100%]">
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
          {productDetails.description}
        </div>
        <ColorPicker
          name="color_ids"
          className="mb-[11px] text-[#979797]"
          className2="mb-[11px]"
          colors={productDetails.colors.map((color) => ({
            label: color.color_code,
            value: color.color_id,
          }))}
          selectedColors={isSelected.color_ids}
          onSelect={(name, value) => handleInput(name, value)}
          multiple={false}
        />
        <SizePicker
          name="size_ids"
          className="font-primary font-normal text-18px leading-[26px] tracking-[-0.3px] mb-[11px] !text-[#979797]"
          className2="mb-[27px] w-[50px] h-[50px] cursor-pointer !border-[#979797] "
          buttonClass="!text-[#000000]"
          alreadySelectedSizes={isSelected.size_ids}
          multiple={false}
          sizes={productDetails.sizes.map((size) => ({
            label: size.size_type,
            value: size.size_id,
          }))}
          onSelect={(name, value) => handleInput(name, value)}
        />
        <div className="underline font-primary font-normal text-xs leading-[26px] tracking-[-0.3px] text-borderColor mb-[12px] cursor-pointer">
          {`Size & Fit Guide`}
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
            buttonName={`Add to Cart - ${formatCost(handleCost())}`}
            onClick={handleCart}
            isLoading={loader.buttonLoader}
          />
          <Quantity
            className="w-[100%] h-[100%]"
            name="quantity"
            onSelect={(name, value) => handleInput(name, value)}
            maxQuantity={productDetails.quantity}
          />
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
