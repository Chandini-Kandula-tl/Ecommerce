import { Button } from "@/components/Button";
import { useRouter } from "next/router";
const adminDashboard = () => {
  const router = useRouter();
  const handleButton = (path: string, name: string, rootClassName?: string) => {
    return (
      <Button
        buttonName={name}
        buttonClassName={`bg-[#0D0D0D] !text-[#FFFFFF] font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px] h-[75px] w-[100%]`}
        rootClassName={`${rootClassName}`}
        onClick={() => router.push(path)}
      />
    );
  };
  return (
    <div className="mt-[265px] flex justify-center items-center">
      <div className="w-[525px] h-[371px]">
        {handleButton("/add-products", "Add Product", "")}
        {handleButton("/admin-product-list", "View Products", "mt-[72px]")}
        {handleButton("/orders", "View Orders", "mt-[72px]")}
      </div>
    </div>
  );
};

export default adminDashboard;
