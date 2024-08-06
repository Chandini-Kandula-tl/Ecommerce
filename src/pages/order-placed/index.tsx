import { Button } from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import orderImage from "../../../public/images/order.svg";
const OrderSuccess = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/shop");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={orderImage} alt="order successfull" className=""></Image>
      <div className="text-[#3cb371] text-2xl font-bold text-center pt-[80px]">
        Order Placed Successfully
      </div>
      <Button
        buttonClassName="bg-black !text-[#FFFFFF] flex items-center justify-center px-20 py-5 text-lg font-bold"
        rootClassName="flex items-center justify-center pt-[50px]"
        buttonName="Back to Shop"
        onClick={handleClick}
      />
    </div>
  );
};

export default OrderSuccess;
{
  /* <div className="w-5 h-5">Gif
<img src = {Gif}></img>
</div> */
}
