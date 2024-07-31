import { getApi, postApi } from "@/api-client/methods";
import { Button } from "@/components/Button";
import { CartItem } from "@/components/CartItem";
import { OrderInformation } from "@/components/OrderInformation";
import { OrderSummary } from "@/components/OrderSummary";
import Spinner from "@/components/Spinner";
import { useTotalContext } from "@/context/productContext";
import { ICartDetails, ICartResponse } from "@/utils/interfaces";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const orderInformation = [
  {
    title: "Return Policy",
    content:
      "This is our example return policy is which everything you need to know about our returns.",
  },
  {
    title: "Shipping options",
    content:
      "This is our shipping option  policy is which everything you need to know about our returns.",
  },
  {
    title: "Payment Policy",
    content:
      "This is our payment policy is which everything you need to know about our returns.",
  },
];

const CartPage = () => {
  const router = useRouter();
  const { dispatch, state } = useTotalContext();
  const [cartData, setCartData] = useState<ICartDetails[]>([]);
  const [deletedState, setDeletedState] = useState(false);
  const [loader, setLoader] = useState({
    pageLoader: true,
  });
  const [quantityChangeLoading, setQuantityChangeLoading] = useState(false);

  const getData = async () => {
    try {
      const response = await getApi<ICartResponse>({ endUrl: "user/cart" });
      if (response?.data?.products) {
        const products = response?.data?.products;
        const sortedProducts = products.sort(
          (a: ICartDetails, b: ICartDetails) =>
            a.product_id.localeCompare(b.product_id)
        );
        setCartData(sortedProducts);
        dispatch({ type: "MANAGE_AMOUNT", payload: sortedProducts });
      }
    } catch (err) {
    } finally {
      setLoader((prev) => ({
        ...prev,
        pageLoader: false,
      }));
    }
  };

  const handleQuantityChange = async (
    product_id: string,
    newQuantity: number,
    size_id: string,
    color_id: string
  ) => {
    setQuantityChangeLoading(true);
    await postApi({
      endUrl: "user/add-to-cart",
      data: { product_id, quantity: newQuantity, color_id, size_id },
    });
    await getData();
    setQuantityChangeLoading(false);
  };

  const handleCheckoutButton = () => {
    if (cartData.length > 0) router.push("/checkout");
  };

  const handleRoute = () => {
    router.push("/shop");
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [deletedState]);

  return (
    <Spinner loading={quantityChangeLoading || loader.pageLoader}>
      <div className="mt-[51px] flex gap-[88px]">
        <div className="w-[60%]">
          {/* your cart */}
          <div className="font-primary font-semibold text-[36px] leading-[44px] tracking-[-1.5px] text-[#000000]">
            Your cart
          </div>
          {/* <div> */}
          <div className="font-primary font-medium text-xxs leading-[26px] tracking-[-0.2px] text-[#000000] mt-[11px] pl-1">
            Not ready to checkout?{" "}
            <span
              className="font-primary font-medium text-xxs leading-[26px] tracking-[-0.2px] text-[#000000] mt-[11px] cursor-pointer"
              onClick={handleRoute}
            >
              Continue Shopping
            </span>
          </div>
          <div></div>
          {/* </div> */}
          <div className="mt-[21px]">
            {cartData.length > 0 ? (
              cartData.map((item, index) => (
                <div key={item.product_id}>
                  {/* // change name to CartItem and make item prop as object` */}
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
                    onDeleteSuccess={() => setDeletedState(!deletedState)}
                    onQuantityChange={(
                      product_id,
                      newQuantity,
                      size_id,
                      color_id
                    ) =>
                      handleQuantityChange(
                        product_id,
                        newQuantity,
                        size_id,
                        color_id
                      )
                    }
                    className={
                      index < cartData?.length - 1
                        ? "border-b-[1px] py-[10px]"
                        : ""
                    }
                  />
                  {/* {index < cartData.length - 1 && (
                  <div className="border my-[17px]"></div>
                )} */}
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center font-primary text-[30px] text-[#979797] leading-[44px] tracking-[-1.5px] ">
                Your cart is empty.&#128533;
              </div>
            )}
          </div>

          <OrderInformation
            data={orderInformation}
            rootClassName="mt-[116px]"
            mainTitle="Order Information"
          />
        </div>
        <div className="mt-[21px] w-[40%] h-[100%] top-[70px] sticky overflow-auto">
          <div className="font-primary font-semibold text-xxl leading-[30px] tracking-[-0.55px] text-[#000000]">
            Order Summary
          </div>
          <OrderSummary
            data={{
              sub_amount: state?.cart?.amount,
              total_amount: state?.cart?.amount,
            }}
            buttonClass="py-[14px] px-[122px]"
            // rootClassName="mt-[21px] w-[40%]"
          />
          <Button
            buttonName="Continue to checkout"
            buttonClassName={
              cartData.length > 0
                ? "bg-[#0D0D0D] !text-[#FFFFFF] w-[100%] py-[14px]"
                : "bg-[#0D0D0D] cursor-not-allowed !text-[#FFFFFF] w-[100%] py-[14px]"
            }
            rootClassName="mt-9 w-[100%] flex items-center justify-center"
            onClick={handleCheckoutButton}
          />
        </div>
      </div>
    </Spinner>
  );
};

export default CartPage;
