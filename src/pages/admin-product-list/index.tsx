import { getApi } from "@/api-client/methods";
import { Button } from "@/components/Button";
import { CheckBox } from "@/components/CheckBox";
import { CustomInput } from "@/components/CustomInput";
import { formatCost } from "@/utils/helpers";
import { IListProduct, IProductParameters } from "@/utils/interfaces";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const AdminDashboardProductList = () => {
  const [isSelected, setIsSelected] = useState<{
    categories: string[];
  }>({ categories: [] });
  const router = useRouter();
  const [products, setProducts] = useState<IListProduct[]>([]);
  const [parameters, setParameters] = useState<IProductParameters>({
    colors: [],
    sizes: [],
    categories: [],
  });
  const [selected, setSelected] = useState<{
    categories: string[];
  }>({ categories: [] });

  const handleClear = () => {
    setIsSelected({ categories: [] });
  };

  useEffect(() => {
    getProductsData();
    getProductParameters();
  }, []);

  const getProductsData = async () => {
    const response = await getApi({ endUrl: "list-products" });
    setProducts((prev) => [...prev, ...response?.data?.products]);
    console.log(response?.data?.products);
  };

  const getProductParameters = async () => {
    const response = await getApi({ endUrl: "get-product-parameters" });
    const { colors, sizes, categories } = response?.data;
    setParameters({ colors, sizes, categories });
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

  const handleInput = (name: string, value: string | string[]) => {
    setSelected((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditButton = async (id: string) => {
    router.push(`/edit-product/${id}`);
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
            <CheckBox
              categories={parameters.categories.map((category) => ({
                label: category.category_name,
                value: category.category_id,
              }))}
              name="categories"
              className="border-black text-[#111111]"
              selectedItems={selected.categories}
              onSelect={(name, value) => handleInput(name, value)}
            />
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
                      {formatCost(product.price)}
                    </div>
                  </div>
                </div>
                <div className="flex gap-[42px] w-[40%]">
                  <Button
                    buttonName="Edit"
                    buttonClassName="font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px] !border !border-[#0D0D0D] w-full h-[46px]"
                    rootClassName="w-[50%]"
                    onClick={() => handleEditButton(product.product_id)}
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
