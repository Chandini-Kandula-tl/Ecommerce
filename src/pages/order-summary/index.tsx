import { Button } from "@/components/Button";
import { CustomInput } from "@/components/CustomInput";
import { formatCost } from "@/utils/helpers";
import Image from "next/image";
const products = [
  {
    product_id: "001",
    product_name: "Men’s winter jacket",
    description: "String",
    images: [
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ea_1685347096447.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ee_1685347096993.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/6474602016cbc35fdad2cd7f_1685348384396.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
    ],
    available_sizes: ["S", "M", "L"],
    available_colours: ["Red"],
    price: 99,
    category: "String",
    rating: "Float",
    quantity: "Number",
  },
  {
    product_id: "001",
    product_name: "Men’s winter jacket",
    description: "String",
    images: [
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ea_1685347096447.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ee_1685347096993.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/6474602016cbc35fdad2cd7f_1685348384396.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
    ],
    available_sizes: ["S", "M", "L"],
    available_colours: ["Red"],
    price: 99,
    category: "String",
    rating: "Float",
    quantity: "Number",
  },
  {
    product_id: "001",
    product_name: "Men’s winter jacket",
    description: "String",
    images: [
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ea_1685347096447.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ee_1685347096993.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/6474602016cbc35fdad2cd7f_1685348384396.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
    ],
    available_sizes: ["S", "M", "L"],
    available_colours: ["Red"],
    price: 99,
    category: "String",
    rating: "Float",
    quantity: "Number",
  },
];
const orderSummary = () => {
  return (
    <div className="mt-[154px]">
      <div className="flex w-full justify-between">
        <div className="font-primary font-semibold text-[36px] leading-[44px] tracking-[-1.5px] text-[#000000] w-[70%]">
          Order 123 summary
        </div>
        <div className="w-[25%]">
          <CustomInput
            className="pl-[67px] font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px] bg-transparent"
            placeholder="Search for a  order with ID"
            type="text"
            max={0}
            min={0}
          />
        </div>
      </div>
      <div className="mt-[66px] flex">
        {/* apply flex here */}
        <div className="w-[100%]">
          {/* products part */}
          {products.map((product, index) => (
            <div key={index}>
              <div className="flex items-center justify-between gap-[66px]">
                <div className="flex gap-4 w-[75%]">
                  <Image
                    src={product.images[0]}
                    alt="product image"
                    width={129}
                    height={133}
                  />
                  <div>
                    <div className="font-primary font-semibold text-xxl leading-[30px] tracking-[-0.55px] text-[#000000]">
                      {product.product_name}
                    </div>
                    <div className="flex justify-between mt-[7px]">
                      <div className="font-primary font-normal text-sm leading-[20px] tracking-[-0.4px] text-[#000000]">
                        Size: {product.available_sizes[0]}
                      </div>
                      <div className="font-primary font-normal text-sm leading-[20px] tracking-[-0.4px] text-[#000000]">
                        Quantity: {product.quantity}
                      </div>
                    </div>
                    <div className="flex justify-between mt-[7px]">
                      <div className="font-primary font-normal text-sm leading-[20px] tracking-[-0.4px] text-[#000000]">
                        Color: {product.available_colours[0]}
                      </div>
                      <div className="font-primary font-normal text-sm leading-[20px] tracking-[-0.4px] text-[#000000]">
                        Type:{product.category}
                      </div>
                    </div>
                    <div className="mt-[7px] font-primary font-semibold text-[22px] leading-[30px] tracking-[-0.55px] text-[#000000]">
                      {formatCost(product.price)}
                    </div>
                  </div>
                </div>
                <div className="w-[25%]">
                  <Button
                    buttonName="View  order status"
                    buttonClassName="font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px] !border !border-[#0D0D0D] w-full h-[46px]"
                    rootClassName="w-full"
                  />
                </div>
              </div>
              {index + 1 !== products.length && (
                <div className="w-full border border-[#909090] my-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-[56px] justify-center mt-[74px]">
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

export default orderSummary;
