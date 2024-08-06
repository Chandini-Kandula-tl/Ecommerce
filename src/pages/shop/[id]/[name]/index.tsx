import { getApi, postApi } from "@/api-client/methods";
import { Button } from "@/components/Button";
import { Carousel } from "@/components/Carousel";
import { CustomDropDown } from "@/components/CustomDropDown";
import { Loader } from "@/components/Loader";
import { Quantity } from "@/components/Quantity";
import { useTotalContext } from "@/context/productContext";
import { formatCost } from "@/utils/helpers";
import {
  ICartSize,
  IProduct,
  IProductDetails,
  ISelectedSizeAndColor,
} from "@/utils/interfaces";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const router = useRouter();
  const { dispatch } = useTotalContext();
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
  const [loader, setLoader] = useState({
    PageLoader: true,
    buttonLoader: false,
  });
  const [isSelected, setIsSelected] = useState<ISelectedSizeAndColor>({
    size_ids: [],
    color_ids: [],
  });
  const [quantity, setQuantity] = useState<number>(1);

  const getData = async () => {
    const {
      id,
      quantity: queryQuantity,
      size,
      color,
      imageIndex,
    } = router.query;
    try {
      const response = await getApi<IProductDetails>({
        endUrl: `products/${id}`,
      });
      if (response?.data) {
        const { images } = response?.data;
        let recordedImages = images;
        let index = Number(imageIndex);
        recordedImages = [
          images[index],
          ...images.slice(0, index),
          ...images.slice(index + 1),
        ];

        setProductDetails({ ...response.data, images: recordedImages });
        const defaultSize = response?.data?.size_ids[0] || "";
        const defaultColor = response?.data?.color_ids[0] || "";
        const selectedSizeIds = size
          ? Array.isArray(size)
            ? size
            : [size]
          : [defaultSize];
        const selectedColorIds = color
          ? Array.isArray(color)
            ? color
            : [color]
          : [defaultColor];
        setIsSelected({
          size_ids: selectedSizeIds,
          color_ids: selectedColorIds,
        });
        setQuantity(Number(queryQuantity) || 1);
      }
    } catch (err) {
    } finally {
      setLoader((prev) => ({ ...prev, PageLoader: false }));
    }
  };

  const handleInput = (name: string, value: string | string[] | Number) => {
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
    try {
      setLoader((prev) => ({ ...prev, buttonLoader: true }));
      const response = await postApi<ICartSize>({
        endUrl: "user/add-to-cart",
        data,
      });
      if (response?.status) {
        toast.success(response?.message);
        dispatch({ type: "ADD_CART", payload: response?.data?.cart_size });
      }
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setLoader((prev) => ({ ...prev, buttonLoader: false }));
    }
  };

  const handleBuyNow = () => {
    router.push(
      `/checkout/${productDetails.product_id}?quantity=${quantity}&size=${isSelected.size_ids}&color=${isSelected.color_ids}`
    );
  };

  const handleCost = () => {
    return quantity * productDetails.price;
  };

  useEffect(() => {
    getData();
  }, [router]);

  return loader.PageLoader ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Loader />
    </div>
  ) : (
    <div className="mt-[147px] flex gap-[96px]">
      <div className="w-[50%]">
        <Carousel slides={productDetails.images} />
      </div>
      <div className="flex-1">
        <div className="font-primary font-semibold text-[36px] leading-[48px] tracking-[-3%] text-[#000000]">
          {productDetails.product_name}
        </div>
        <div className="font-primary font-normal text-[24px] leading-[36px] tracking-[-3%] text-[#000000]">
          {formatCost(productDetails.price)}
        </div>
        <div className="mt-[15px] max-w-[357px] font-primary font-normal text-lg leading-[24px] tracking-[-3%] text-[#000000]">
          {productDetails.description}
        </div>
        <div className="mt-[15px] flex gap-[15px]">
          <Quantity
            name="quantity"
            className="w-[167px] h-[50px]"
            countClassName="px-[30px]"
            selectedQuantity={quantity}
            maxQuantity={productDetails.quantity}
            onSelect={(name, value) => handleInput(name, value)}
          />
          <CustomDropDown
            showDefault={true}
            list={productDetails.sizes.map((size) => ({
              label: size.size_type,
              value: size.size_id,
            }))}
            optionClassName="pl-4"
            defaultValue={isSelected.size_ids.toString()}
          />
        </div>
        <div className="mt-4 font-secondary font-normal text-sm leading-[20px] tracking-[-0.4px] text-[#979797]">
          {"Height of model: 189 cm. / 6′ 2″ Size 41"}
        </div>
        <div className="mt-[23px] flex gap-[13px]">
          <Button
            buttonName={`Add to Cart - ${formatCost(handleCost())}`}
            buttonClassName="py-[14px] px-[33px] font-primary font-semibold text-[xxs] leading-[22px] tracking-[-0.4px] bg-[#000000] !text-[#FFFFFF]"
            onClick={handleCart}
            isLoading={loader.buttonLoader}
          />
          <Button
            buttonName="Buy Now"
            buttonClassName="py-[14px] px-[37px] font-primary font-semibold text-[xxs] leading-[22px] tracking-[-0.4px] !text-[#FFFFFF] bg-[#2F80ED]"
            onClick={handleBuyNow}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
