import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import { FC } from "react";
interface IButtonProps {
  path: string;
  name: string;
  rootClassName?: string;
}
const adminDashboard = () => {
  const router = useRouter();
  const HandleButton: FC<IButtonProps> = ({ path, name, rootClassName }) => {
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
        <HandleButton path="/add-products" name="Add Product" />
        <HandleButton
          path="/admin-product-list"
          name="View Products"
          rootClassName="mt-[72px]"
        />
        {/* {handleButton("/orders", "View Orders", "mt-[72px]")} */}
      </div>
    </div>
  );
};

export default adminDashboard;
