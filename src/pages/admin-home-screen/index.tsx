import { Button } from "@/components/Button";
import { useRouter } from "next/router";
const adminDashboard = () => {
  const router = useRouter();
  return (
    <div className="mt-[265px] flex justify-center items-center">
      <div className="w-[525px] h-[371px]">
        <Button
          buttonName="Add Product"
          buttonClassName="bg-[#0D0D0D] !text-[#FFFFFF] font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px] h-[75px] w-[100%] "
          onClick={() => router.push("/add-products")}
        />
        <Button
          buttonName="View Products"
          buttonClassName="bg-[#0D0D0D] !text-[#FFFFFF] font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px] h-[75px] w-[100%]"
          rootClassName="mt-[72px]"
          onClick={() => router.push("/##")}
        />

        <Button
          buttonName="View Orders"
          buttonClassName="bg-[#0D0D0D] !text-[#FFFFFF] font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px] h-[75px] w-[100%]"
          rootClassName="mt-[72px]"
          onClick={() => router.push("/orders")}
        />
      </div>
    </div>
  );
};

export default adminDashboard;
