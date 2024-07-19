import { Button } from "@/components/Button";
import { CustomInput } from "@/components/CustomInput";

const Orders = () => {
  const orders = [
    {
      order_id: "123",
      user_id: "A1",
    },
    { order_id: "124", user_id: "A2" },
    {
      order_id: "125",
      user_id: "A3",
    },
  ];
  return (
    <div className="mt-[154px]">
      <div className="flex justify-between mb-[67px] w-full">
        <div className="font-primary font-semibold text-[36px] leading-[44px] tracking-[-1.5px] text-[#000000] w-[80%]">
          Orders
        </div>
        <div className="w-[20%]">
          <CustomInput
            className="font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px] px-2 h-[49px] w-full bg-transparent"
            placeholder="Search for order with order ID or user ID"
            type="text"
            max={0}
            min={0}
          />
        </div>
      </div>
      {orders.map((item, index) => (
        <div key={index} className="">
          <div className="flex justify-between ">
            <div className="w-[80%] mt-[18px] mb-[89px]">
              <div className="font-primary font-semibold text-xxl leading-[30px] tracking-[-0.55px] text-[#000000]">
                Order ID: {item.order_id}
              </div>
              <div className="font-primary font-semibold text-xxl leading-[30px] tracking-[-0.55px] text-[#000000]">
                User ID: {item.user_id}
              </div>
            </div>
            {/* <div className="w-[30%] border border-black"> */}
            <Button
              buttonName="View order"
              buttonClassName="font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px] !border !border-black w-full h-[49px]"
              rootClassName="w-[20%] mt-[58px] mb-[78px]"
            />
            {/* </div> */}
          </div>
          {index + 1 !== orders.length && (
            <div className="border border-[#909090]"></div>
          )}
        </div>
      ))}
      <div className="flex gap-[56px] justify-center">
        <Button
          buttonName="Lode more orders"
          buttonClassName="bg-[#000000] !text-[#FFFFFF] w-[298px] h-[50px] font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px]"
        />
        <Button
          buttonName="Back"
          buttonClassName="bg-[#000000] !text-[#FFFFFF] w-[149px] h-[50px] font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px]"
        />
      </div>
    </div>
  );
};

export default Orders;
