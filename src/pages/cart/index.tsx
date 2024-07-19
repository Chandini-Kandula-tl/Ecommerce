import { Button } from "@/components/Button";
import { Cart } from "@/components/Cart";
import { OrderInformation } from "@/components/OrderInformation";
import { OrderSummary } from "@/components/OrderSummary";

const cart = () => {
  return (
    <div className="mt-[111px] flex gap-[88px]">
      <div className="w-[60%]">
        {/* your cart */}
        <div className="font-primary font-semibold text-[36px] leading-[44px] tracking-[-1.5px] text-[#000000]">
          Your cart
        </div>
        <div className="font-primary font-medium text-xxs leading-[26px] tracking-[-0.2px] text-[#000000] mt-[11px] pl-1">
          Not ready to checkout? Continue Shopping
        </div>
        <div className="mt-[21px]">
          <Cart
            item={[
              {
                image:
                  "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
                productName: "Men's Winter Jacket",
                size: "L",
                quantity: "1",
                cost: "$99",
              },
            ]}
          />
          <div className="border my-[17px]"></div>
          <Cart
            item={[
              {
                image:
                  "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
                productName: "Men's Winter Jacket",
                size: "L",
                quantity: "1",
                cost: "$99",
              },
            ]}
          />
        </div>
        <OrderInformation
          data={[
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
          ]}
          rootClassName="mt-[116px]"
          mainTitle="Order Information"
        />
      </div>
      <div className="mt-[21px] w-[40%]">
        <div className="font-primary font-semibold text-xxl leading-[30px] tracking-[-0.55px] text-[#000000]">
          Order Summary
        </div>
        <OrderSummary
          data={{
            sub_amount: 200,
            total_amount: 200,
          }}
          buttonClass="py-[14px] px-[122px]"
          // rootClassName="mt-[21px] w-[40%]"
        />
        <Button
          buttonName="Continue to checkout"
          buttonClassName={"bg-[#0D0D0D] !text-[#FFFFFF] w-[100%] py-[14px]"}
          rootClassName="mt-9 w-[100%] flex items-center justify-center"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default cart;
