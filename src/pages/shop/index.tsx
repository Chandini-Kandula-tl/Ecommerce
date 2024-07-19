import { Button } from "@/components/Button";
import { CheckBox } from "@/components/CheckBox";
import { ColorPicker } from "@/components/ColorPicker";
import { CustomDropDown } from "@/components/CustomDropDown";
import { ShopItem } from "@/components/ShopItem";
import { useState } from "react";

const categories = [
  {
    category_id: "73ae6199-426d-4864-8f24-347b797c5110",
    category_name: "Jackets",
  },
  {
    category_id: "38259a82-088c-4be2-bae1-b29407d752a9",
    category_name: "Sweatshirts & Hoodies",
  },
  {
    category_id: "8ebdc39d-5d1b-438f-904f-66e908d91e4e",
    category_name: "Sweaters",
  },
  {
    category_id: "d2ef4f6c-2a23-4d48-b808-be100846af46",
    category_name: "Shirts",
  },
  {
    category_id: "307c050e-19b3-4277-9ea1-cf7b3e97102a",
    category_name: "T-Shirts",
  },
  {
    category_id: "a4b50ffe-661c-429b-801d-6c9ee60132da",
    category_name: "Pants & Jeans",
  },
];

const colors = [
  {
    color_id: "eceb9c64-dc1d-400a-aa9a-96acea6540ab",
    color_name: "Red",
    color_code: "#EB5757",
  },
  {
    color_id: "683e16c9-7b12-444c-8635-88815fc796db",
    color_name: "Light Blue",
    color_code: "#56CCF2",
  },
  {
    color_id: "49714c3d-b511-4f07-806e-7d1132a92736",
    color_name: "Orange",
    color_code: "#DF9167",
  },
  {
    color_id: "8bb2b153-6f7b-448e-81ec-57598a3704e4",
    color_name: "Purple",
    color_code: "#7B61FF",
  },
  {
    color_id: "9f1e7277-1e65-47cd-91df-4105559e4ba1",
    color_name: "Violet",
    color_code: "#BB6BD9",
  },
  {
    color_id: "14589614-09ec-4efb-b47a-13d513a15d6b",
    color_name: "Green",
    color_code: "#219653",
  },
];

const dropDownOptions = [
  {
    label: "Popular",
    value: "popular",
  },
  { label: "Price", value: "price" },
  { label: "Relavance", value: "relavance" },
];

const products = [
  {
    product_id: "001",
    product_name: "Men's Winter Jacket",
    images: [
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ea_1685347096447.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ee_1685347096993.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/6474602016cbc35fdad2cd7f_1685348384396.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
    ],
    available_sizes: ["S", "M", "L"],
    available_colours: [
      "rgba(223, 145, 103, 1)",
      "rgba(123, 97, 255, 1)",
      "rgba(33, 150, 83, 1)",
      "rgba(47, 128, 237, 1)",
    ],
    price: 99,
    category: "Jacket",
    rating: 5,
  },
  {
    product_id: "002",
    product_name: "Women Winter Jacket",
    images: [
      "https://imgmediagumlet.lbb.in/media/2023/05/6474602016cbc35fdad2cd7f_1685348384396.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ea_1685347096447.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ee_1685347096993.jpg?fm=webp&w=750&h=500&dpr=1",
    ],
    available_sizes: ["XS", "M", "XL"],
    available_colours: [
      "rgba(223, 145, 103, 1)",
      "rgba(123, 97, 255, 1)",
      "rgba(33, 150, 83, 1)",
    ],
    price: 999,
    category: "Sweaters",
    rating: 4,
  },
  {
    product_id: "003",
    product_name: "Men's Winter Jacket",
    images: [
      "https://imgmediagumlet.lbb.in/media/2023/05/6474602016cbc35fdad2cd7f_1685348384396.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ea_1685347096447.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ee_1685347096993.jpg?fm=webp&w=750&h=500&dpr=1",
    ],
    available_sizes: ["S", "M", "L"],
    available_colours: [
      "rgba(223, 145, 103, 1)",
      "rgba(123, 97, 255, 1)",
      "rgba(33, 150, 83, 1)",
      "rgba(47, 128, 237, 1)",
    ],
    price: 99,
    category: "Jacket",
    rating: 5,
  },
  {
    product_id: "004",
    product_name: "Women Winter Jacket",
    images: [
      "https://imgmediagumlet.lbb.in/media/2023/05/6474602016cbc35fdad2cd7f_1685348384396.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ea_1685347096447.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ee_1685347096993.jpg?fm=webp&w=750&h=500&dpr=1",
    ],
    available_sizes: ["XS", "M", "XL"],
    available_colours: [
      "rgba(223, 145, 103, 1)",
      "rgba(123, 97, 255, 1)",
      "rgba(33, 150, 83, 1)",
    ],
    price: 999,
    category: "Sweaters",
    rating: 4,
  },
  {
    product_id: "005",
    product_name: "Men's Winter Jacket",
    images: [
      "https://imgmediagumlet.lbb.in/media/2023/05/6474602016cbc35fdad2cd7f_1685348384396.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ea_1685347096447.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ee_1685347096993.jpg?fm=webp&w=750&h=500&dpr=1",
    ],
    available_sizes: ["S", "M", "L"],
    available_colours: [
      "rgba(223, 145, 103, 1)",
      "rgba(123, 97, 255, 1)",
      "rgba(33, 150, 83, 1)",
      "rgba(47, 128, 237, 1)",
    ],
    price: 99,
    category: "Jacket",
    rating: 5,
  },
  {
    product_id: "006",
    product_name: "Women Winter Jacket",
    images: [
      "https://imgmediagumlet.lbb.in/media/2023/05/6474602016cbc35fdad2cd7f_1685348384396.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ea_1685347096447.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ee_1685347096993.jpg?fm=webp&w=750&h=500&dpr=1",
    ],
    available_sizes: ["XS", "M", "XL"],
    available_colours: [
      "rgba(223, 145, 103, 1)",
      "rgba(123, 97, 255, 1)",
      "rgba(33, 150, 83, 1)",
    ],
    price: 999.0,
    category: "Sweaters",
    rating: 4,
  },
  {
    product_id: "007",
    product_name: "Men's Winter Jacket",
    images: [
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ea_1685347096447.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ee_1685347096993.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/6474602016cbc35fdad2cd7f_1685348384396.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
    ],
    available_sizes: ["S", "M", "L"],
    available_colours: [
      "rgba(223, 145, 103, 1)",
      "rgba(123, 97, 255, 1)",
      "rgba(33, 150, 83, 1)",
      "rgba(47, 128, 237, 1)",
    ],
    price: 99,
    category: "Jacket",
    rating: 5,
  },
  {
    product_id: "008",
    product_name: "Women Winter Jacket",
    images: [
      "https://imgmediagumlet.lbb.in/media/2023/05/6474602016cbc35fdad2cd7f_1685348384396.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ea_1685347096447.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ee_1685347096993.jpg?fm=webp&w=750&h=500&dpr=1",
    ],
    available_sizes: ["XS", "M", "XL"],
    available_colours: [
      "rgba(223, 145, 103, 1)",
      "rgba(123, 97, 255, 1)",
      "rgba(33, 150, 83, 1)",
    ],
    price: 999,
    category: "Sweaters",
    rating: 4,
  },
  {
    product_id: "009",
    product_name: "Men's Winter Jacket",
    images: [
      "https://imgmediagumlet.lbb.in/media/2023/05/6474602016cbc35fdad2cd7f_1685348384396.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ea_1685347096447.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ee_1685347096993.jpg?fm=webp&w=750&h=500&dpr=1",
    ],
    available_sizes: ["S", "M", "L"],
    available_colours: [
      "rgba(223, 145, 103, 1)",
      "rgba(123, 97, 255, 1)",
      "rgba(33, 150, 83, 1)",
      "rgba(47, 128, 237, 1)",
    ],
    price: 99,
    category: "Jacket",
    rating: 5,
  },
  {
    product_id: "010",
    product_name: "Women Winter Jacket",
    images: [
      "https://imgmediagumlet.lbb.in/media/2023/05/6474602016cbc35fdad2cd7f_1685348384396.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ea_1685347096447.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ee_1685347096993.jpg?fm=webp&w=750&h=500&dpr=1",
    ],
    available_sizes: ["XS", "M", "XL"],
    available_colours: [
      "rgba(223, 145, 103, 1)",
      "rgba(123, 97, 255, 1)",
      "rgba(33, 150, 83, 1)",
    ],
    price: 999,
    category: "Sweaters",
    rating: 4,
  },
];
const shop = () => {
  // const productDetails = useContext(AppContext);
  const [selected, setSelected] = useState<{
    categories: string[];
    color_ids: string[];
  }>({ categories: [], color_ids: [] });
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const [isClear, setIsClear] = useState<boolean>(false);
  const handleClear = () => {
    setIsClear(true);
    setSelected({ categories: [], color_ids: [] });
    setTimeout(() => {
      setIsClear(false);
    }, 100);
  };

  const handleInput = (name: string, value: string | string[]) => {
    setSelected((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex">
      {/* Filter div */}
      <div className="mt-[17px] w-[20%] sticky top-[60px] pt-[20px] overflow-auto h-[100%]">
        <div className="flex flex-row gap-[8px] items-baseline">
          <div className="font-primary font-semibold text-[22px] leading-[30px] tracking-[-0.55px] text-borderColor">
            Filters
          </div>
          <Button
            buttonClassName="underline font-normal font-primary text-[14px] leading-[20px] tracking-[-0.4px] !text-[#979797]"
            buttonName="Clear filters"
            onClick={handleClear}
          />
        </div>
        <div className="font-primary font-bold text-[14px] leading-[20px] tracking-[-0.4px] mt-[19px] text-[#000000] mb-[20px]">
          Categories
        </div>
        <CheckBox
          categories={categories.map((category) => ({
            label: category.category_name,
            value: category.category_id,
          }))}
          name="categories"
          className="border-black text-[#111111]"
          selectedItems={selected.categories}
          onSelect={(name, value) => handleInput(name, value)}
        />
        <ColorPicker
          name="color_ids"
          className="mt-[50px] mb-[20px]"
          className2="w-[25px] h-[25px]"
          colors={colors.map((color) => ({
            label: color.color_code,
            value: color.color_id,
          }))}
          multiple={true}
          onSelect={(name, value) => handleInput(name, value)}
          clearFilters={isClear}
        />
      </div>
      {/* products in home page */}
      <div className="ml-[90px] w-[80%]">
        <div className="flex justify-between sticky top-[60px] pt-[20px] bg-[#EFF2F6] mb-[18px]">
          <div></div>
          <div className="flex gap-[24px] flex-col items-end">
            <CustomDropDown
              label="Sort by"
              list={dropDownOptions}
              rootClassName="w-[160px] h-[37px]"
              showDefault={true}
              labelClassName="font-inter font-normal text-[13px] leading-[26px] tracking-[-0.3px] px-[5px] text-[#979797]"
              optionClassName="font-secondary font-bold text-[14px] leading-[26px] tracking-[-0.3px] text-borderColor"
              // onClick={handleDropDown}
            />
            <div>Showing 1003 Products</div>
          </div>
        </div>
        <ShopItem rootClassName="mt-[16px]" items={products} />
        <div className="flex justify-center mt-[42px] mb-[50px]">
          <Button
            buttonName="Load more products"
            buttonClassName="w-fit border-[2px] py-[14px] px-[76px] justify-center font-semibold text-[16px] !text-borderColor !border-[#979797]"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default shop;
