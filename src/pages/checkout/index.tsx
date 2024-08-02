import { getApi } from "@/api-client/methods";
import { Address } from "@/components/Address";
import { CartItem } from "@/components/CartItem";
import { OrderSummary } from "@/components/OrderSummary";
import Payment from "@/components/Payment";
import { Shipping } from "@/components/Shipping";
import { Steps } from "@/components/Steps";
import { useTotalContext } from "@/context/productContext";
import { getColorObject, getSizeObject } from "@/utils/helpers";
import {
  ICartDetails,
  ICartResponse,
  IProductDetails,
} from "@/utils/interfaces";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface IRouterParameters extends ParsedUrlQuery {
  id?: string;
  size?: string;
  color?: string;
  quantity?: string;
}
interface ProductId {
  id: string;
}
const steps = ["Address", "Shipping", "Payment"];

const CheckOut = ({ id }: ProductId) => {
  const { dispatch, state } = useTotalContext();
  const [cartData, setCartData] = useState<ICartDetails[]>([]);
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  useEffect(() => {
    if (id) {
      const {
        id = "",
        size = "",
        color = "",
        quantity = "",
      }: IRouterParameters = router.query;
      getProductData(id, size, color, Number(quantity));
    } else {
      getCartData();
    }
  }, [id, router.query]);

  const getProductData = async (
    id: string,
    size: string,
    color: string,
    quantity: number
  ) => {
    const response = await getApi<IProductDetails>({
      endUrl: `products/${id}`,
    });
    if (response?.data) {
      const productDetails = response?.data;
      setCartData([
        {
          product_id: productDetails.product_id,
          product_name: productDetails.product_name,
          images: productDetails.images,
          price: productDetails.price,
          category_id: productDetails.category_id,
          quantity: quantity,
          color: getColorObject(productDetails.colors, color),
          size: getSizeObject(productDetails.sizes, size),
        },
      ]);
      const product = [
        {
          product_id: productDetails.product_id,
          price: productDetails.price,
          quantity: quantity,
        },
      ];
      dispatch({
        type: "MANAGE_AMOUNT",
        payload: product,
      });
    }
  };

  const getCartData = async () => {
    const response = await getApi<ICartResponse>({ endUrl: "user/cart" });
    if (response?.data?.products) {
      setCartData(response?.data?.products);
      dispatch({ type: "MANAGE_AMOUNT", payload: response.data.products });
    }
  };

  const handleOrderData = () => {
    const data = {
      amount: state.cart.amount,
      shipping_type: state.checkout.shipping,
      address: state.checkout.address,
      product_details: formatData(),
    };
    dispatch({ type: "ORDER_DATA", payload: data });
  };

  const handleRendering = (index: number) => {
    if (index === 2) {
      setCurrentStepIndex(index);
      handleOrderData();
    } else {
      setCurrentStepIndex(index);
    }
  };

  const handleStep = (index: number) => {
    if (index < currentStepIndex) {
      setCurrentStepIndex(index);
    } else {
      toast.error("can't navigate further");
    }
  };

  const formatData = () => {
    return cartData.map((item) => ({
      product_id: item.product_id,
      size_id: item.size.size_id,
      quantity: item.quantity,
      color_id: item.color.color_id,
    }));
  };

  return (
    <div className="flex gap-[249px]">
      <div className="w-[50%]">
        <div className="font-primary font-semibold text-[36px] leading-[44px] tracking-[-1.5px] text-[#000000] mt-[111px]">
          Checkout
        </div>
        <Steps
          steps={steps}
          activeStepIndex={currentStepIndex}
          onClickStep={handleStep}
        />
        <div
          className={
            currentStepIndex === 0 ? "" : "h-[0px] opacity-0 w-[0px] fixed"
          }
        >
          <Address onButtonClick={() => handleRendering(1)} />
        </div>
        <div
          className={
            currentStepIndex === 1 ? "" : "h-[0px] opacity-0 w-[0px] fixed"
          }
        >
          <Shipping onButtonClick={() => handleRendering(2)} />
        </div>
        {currentStepIndex === 2 && <Payment />}
      </div>
      <div className="mt-[157px] w-[50%]">
        <div className="font-primary font-normal text-[20px] mb-[21px]">
          Your Cart
        </div>
        {cartData.map((item, index) => (
          <div key={item.product_id}>
            <CartItem
              item={[
                {
                  product_id: item.product_id,
                  color_id: item.color.color_id,
                  size_id: item.size.size_id,
                  image: item.images[0],
                  productName: item.product_name,
                  size: item.size.size_type,
                  quantity: item.quantity.toString(),
                  cost: `$${item.price}`,
                },
              ]}
            />
            {index < cartData.length - 1 && (
              <div className="border my-[17px]"></div>
            )}
          </div>
        ))}
        <OrderSummary
          data={{
            sub_amount: state.cart.amount,
            total_amount: state.cart.amount,
          }}
        />
      </div>
    </div>
  );
};

export default CheckOut;
