import { deleteApi } from "@/api-client/methods";
import { useTotalContext } from "@/context/productContext";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Button } from "./Button";
import { Quantity } from "./Quantity";
import Spinner from "./Spinner";

interface ICart {
  item: {
    product_id: string;
    color_id: string;
    size_id: string;
    image: string;
    productName: string;
    size: string;
    quantity: string;
    cost: string;
  }[];
  onDeleteSuccess?: () => void;
  onQuantityChange?: (
    product_id: string,
    newQuantity: number,
    size_id: string,
    color_id: string
  ) => void;
  className?: string;
}

export const CartItem: FC<ICart> = ({
  item,
  onDeleteSuccess,
  onQuantityChange,
  className,
}) => {
  const { dispatch } = useTotalContext();
  const router = useRouter();
  const path = router.pathname;
  const [loader, setLoader] = useState(false);

  useEffect(() => {}, []);

  const handleRemove = async (
    product_id: string,
    color_id: string,
    size_id: string
  ) => {
    const data = { product_id, color_id, size_id };
    console.log(data, "data");
    setLoader(true);
    try {
      const response = await deleteApi({
        endUrl: "user/remove-from-cart",
        data,
      });
      if (response?.status) {
        dispatch({ type: "REMOVE_BUTTON" });
        onDeleteSuccess?.();
        // toast.success(response?.message);
      }
    } catch (err) {
    } finally {
      setLoader(false);
    }
  };

  const handleQuantityChange = (
    product_id: string,
    newQuantity: number,
    size_id: string,
    color_id: string,
    type: string
  ) => {
    // onQuantityChange?.(product_id, newQuantity, size_id, color_id);
    if (type === "increment") {
      onQuantityChange?.(product_id, 1, size_id, color_id);
    } else {
      onQuantityChange?.(product_id, -1, size_id, color_id);
    }
  };
  return (
    <Spinner loading={loader}>
      <div>
        {item.map((info, index) => (
          <div key={index} className={"flex " + className}>
            <Image
              src={info.image}
              alt="image not found"
              width={129}
              height={133}
            />
            <div className="ml-[7px] font-primary text-borderColor w-[100%]">
              <div className="mt-[6px] font-semibold text-xxl leading-[30px] tracking-[-0.55px]">
                {info.productName}
              </div>
              <div className="mt-[7px] font-normal text-sm leading-[20px] tracking-[-0.4px]">
                Size : {info.size}
              </div>
              <div className="flex mt-[7px]">
                <div className="font-normal text-sm leading-[20px] tracking-[-0.4px]">
                  Quantity :
                </div>
                {path.startsWith("/checkout") ? (
                  <div className="font-normal text-sm leading-[20px] tracking-[-0.4px] pl-1">
                    {info.quantity}
                  </div>
                ) : (
                  <Quantity
                    className="w-4 h-3 border-none my-1"
                    name="quantity"
                    selectedQuantity={Number(info.quantity)}
                    onSelect={(name, value, type) =>
                      handleQuantityChange(
                        info.product_id,
                        value,
                        info.size_id,
                        info.color_id,
                        type
                      )
                    }
                  />
                )}
              </div>
              <div className="font-semibold text-xxl leading-[30px] tracking-[-0.55px]">
                {info.cost}
              </div>
            </div>
            {path.startsWith("/checkout") ? (
              ""
            ) : (
              <Button
                buttonName="Remove"
                buttonClassName="font-normal text-sm leading-[20px] tracking-[-0.4px] underline"
                rootClassName="flex items-end"
                onClick={() =>
                  handleRemove(info.product_id, info.color_id, info.size_id)
                }
              />
            )}
          </div>
        ))}
      </div>
    </Spinner>
  );
};
