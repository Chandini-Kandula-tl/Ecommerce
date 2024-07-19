import { Button } from "@/components/Button";
import { CheckBox } from "@/components/CheckBox";
import { CustomInput } from "@/components/CustomInput";
import Image from "next/image";
import { useState } from "react";
const AdminDashboardProductList = () => {
  const [isSelected, setIsSelected] = useState<{
    categories: string[];
  }>({ categories: [] });
  const items = [
    { label: "Jackets", value: "jackets" },
    { label: "Sweatshirts & Hoodies", value: "swetshirts_hoodies" },
    { label: "Sweaters", value: "sweaters" },
    { label: "Shirts", value: "shirts" },
    { label: "T-Shirts", value: "t_shirts" },
    { label: "Pants & Jeans", value: "pants_jeans" },
  ];
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
      available_sizes: "String[]",
      available_colours: "String[]",
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
      available_sizes: "String[]",
      available_colours: "String[]",
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
      available_sizes: "String[]",
      available_colours: "String[]",
      price: 99,
      category: "String",
      rating: "Float",
      quantity: "Number",
    },
  ];
  const handleClear = () => {
    setIsSelected({ categories: [] });
  };

  const handleCheckBox = (item: string) => {
    setIsSelected((prevState) => {
      const isItemSelected = prevState.categories.includes(item);
      const categories = isItemSelected
        ? prevState.categories.filter((category) => category !== item)
        : [...prevState.categories, item];

      return {
        ...prevState,
        categories,
      };
    });
  };
  return (
    <div className="mt-[154px]">
      <div className="flex w-full justify-between">
        <div className="font-primary font-semibold text-[36px] leading-[44px] tracking-[-1.5px] text-[#000000] w-[75%]">
          Product List
        </div>
        <div className="w-[25%]">
          <CustomInput
            className="pl-[67px] font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px] bg-transparent"
            placeholder="Search for a product with name or ID"
            type="text"
            max={0}
            min={0}
          />
        </div>
      </div>
      <div className="mt-[66px] flex">
        {/* apply flex here */}
        <div className="mt-[17px] w-[20%]">
          <div className="flex flex-row gap-[8px] items-baseline">
            <div className="font-primary font-semibold text-[22px] leading-[30px] tracking-[-0.55px] text-borderColor">
              Filters
            </div>
            <Button
              buttonClassName="underline font-normal font-primary text-[14px] leading-[20px] tracking-[-0.4px] !text-[#979797] w-[73px]"
              buttonName="Clear filters"
              onClick={handleClear}
            />
          </div>
          <div className="font-primary font-bold text-[14px] leading-[20px] tracking-[-0.4px] mt-[19px] text-[#000000] mb-[20px]">
            Categories
          </div>
          <div className="flex flex-col gap-[10px] font-primary font-normal text-[13px] leading-[17px] tracking-[-0.4px] text-[#000000]">
            {items.map((item) => (
              <div key={item.value}>
                <CheckBox
                  className="border-black text-[#111111]"
                  text={item.label}
                  checked={isSelected.categories.includes(item.value)}
                  onChange={() => handleCheckBox(item.value)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-[80%]">
          {/* products part */}
          {products.map((product, index) => (
            <div key={index}>
              <div className="flex items-center justify-between gap-[66px]">
                <div className="flex gap-4 w-[60%]">
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
                    <div className="font-primary font-semibold text-xxl leading-[30px] tracking-[-0.55px] text-[#000000]">
                      {product.price}
                    </div>
                  </div>
                </div>
                <div className="flex gap-[42px] w-[40%]">
                  <Button
                    buttonName="Edit"
                    buttonClassName="font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px] !border !border-[#0D0D0D] w-full h-[46px]"
                    rootClassName="w-[50%]"
                  />
                  <Button
                    buttonName="Delete"
                    buttonClassName="font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px] !border !border-[#0D0D0D] w-full h-[46px]"
                    rootClassName="w-[50%]"
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

export default AdminDashboardProductList;
