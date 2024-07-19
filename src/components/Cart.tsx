import Image from "next/image";
import { FC } from "react";
import { Button } from "./Button";
import { Quantity } from "./Quantity";
interface ICart {
  item: {
    image: string;
    productName: string;
    size: string;
    quantity: string;
    cost: string;
  }[];
}
export const Cart: FC<ICart> = ({ item }) => {
  return (
    <div className="">
      {item.map((info, index) => (
        <div key={index} className="flex">
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
              Size:{info.size}
            </div>
            {/* <div className="mt-[7px] font-normal text-sm leading-[20px] tracking-[-0.4px]">
              Quantity:{info.quantity}
            </div> */}
            <div className="flex mt-[7px]">
              <div className="font-normal text-sm leading-[20px] tracking-[-0.4px]">
                Quantity :
              </div>
              <Quantity className="w-4 h-3 border-none my-1" />
            </div>
            <div className="font-semibold text-xxl leading-[30px] tracking-[-0.55px]">
              {info.cost}
            </div>
          </div>
          <Button
            buttonName="Remove"
            buttonClassName="font-normal text-sm leading-[20px] tracking-[-0.4px] underline"
            rootClassName="flex items-end"
          />
        </div>
      ))}
    </div>
  );
};

//  <div className='flex'>
//       <img src = "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1" width="129px" height = "133px" />
//       <div className='ml-[7px] font-primary text-borderColor'>
//         <div className='mt-[6px] font-semibold text-xxl leading-[30px] tracking-[-0.55px]'>Mens winter jacket</div>
//         <div className='mt-[7px] font-normal text-sm leading-[20px] tracking-[-0.4px]'>Size:L</div>
//         <div className='mt-[7px] font-normal text-sm leading-[20px] tracking-[-0.4px]'>Quantity:1</div>
//         <div className='mt-[7px] font-semibold text-xxl leading-[30px] tracking-[-0.55px]'>$99</div>
//       </div>
//     </div>
