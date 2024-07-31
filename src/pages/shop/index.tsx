import { getApi } from "@/api-client/methods";
import { Button } from "@/components/Button";
import { CheckBox } from "@/components/CheckBox";
import { ColorPicker } from "@/components/ColorPicker";
import { CustomDropDown } from "@/components/CustomDropDown";
import { Loader } from "@/components/Loader";
import { ShopItem } from "@/components/ShopItem";
import { LIMIT } from "@/utils/constants";
import {
  IGetProducts,
  IListProduct,
  IProductParameters,
  ISelectedParameters,
} from "@/utils/interfaces";
import { useEffect, useState } from "react";
const dropDownOptions = [
  {
    label: "Popular",
    value: "rating",
  },
  { label: "Price", value: "price" },
  { label: "Recent", value: "recent" },
];

const shop = () => {
  const [parameters, setParameters] = useState<IProductParameters>({
    colors: [],
    sizes: [],
    categories: [],
  });
  const [selected, setSelected] = useState<ISelectedParameters>({
    categories: [],
    color_ids: [],
  });
  const [dropDownSelection, setDropDownSelection] = useState<string>("rating");
  const [props, setProps] = useState({
    pageNumber: 1,
    totalProducts: 0,
    currentPageNumber: "1",
    totalPages: 0,
  });
  const [products, setProducts] = useState<IListProduct[]>([]);
  const [loader, setLoader] = useState({
    pageLoader: false,
    imagesLoader: false,
    buttonLoader: false,
  });

  const getProductParameters = async () => {
    const response = await getApi<IProductParameters>({
      endUrl: "get-product-parameters",
    });
    const { colors, sizes, categories } = response?.data;
    setParameters({ colors, sizes, categories });
  };

  const getProductList = async () => {
    const categoryQuery = handleQuery("category_id", selected.categories);
    console.log({ categoryQuery });
    const colorQuery = handleQuery("color_id", selected.color_ids);
    const response = await getApi<IGetProducts>({
      endUrl: `list-products?page=${
        props.pageNumber
      }&limit=${LIMIT}&sort_by=${dropDownSelection}${
        categoryQuery ? `&${categoryQuery}` : ""
      }${colorQuery ? `&${colorQuery}` : ""}`,
    });
    setProducts((prev) => [...prev, ...response?.data?.products]);
    setProps((prev) => ({
      ...prev,
      totalProducts: response?.data?.total_productss,
      currentPageNumber: response?.data?.current_page,
      totalPages: response?.data?.totalPages,
    }));
  };

  const handleInput = (name: string, value: string | string[]) => {
    if (name === "sortBy") {
      setDropDownSelection(value as string);
    }
    setProps((prev) => ({ ...prev, pageNumber: 1 }));
    setProducts([]);
    setSelected((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuery = (type: string, array: string[]) => {
    const res = array.map((item) => `${type}=${item}`).join("&");
    return res;
  };

  const handleClear = () => {
    setSelected({ categories: [], color_ids: [] });
    setProducts([]);
    setProps((prev) => ({ ...prev, pageNumber: 1 }));
  };

  const handlePageNumber = () => {
    const newPageNumber = props.pageNumber + 1;
    setLoader((prev) => ({ ...prev, buttonLoader: true }));
    setProps((prev) => ({
      ...prev,
      pageNumber: newPageNumber,
    }));
  };

  useEffect(() => {
    setLoader((prev) => ({ ...prev, pageLoader: true }));
    getProductParameters().finally(() => {
      setLoader((prev) => ({ ...prev, pageLoader: false }));
    });
  }, []);

  useEffect(() => {
    if (props.pageNumber === 1) {
      setLoader((prev) => ({ ...prev, imagesLoader: true }));
      getProductList().finally(() => {
        setLoader((prev) => ({
          ...prev,
          imagesLoader: false,
          buttonLoader: false,
        }));
      });
    } else {
      getProductList().finally(() => {
        setLoader((prev) => ({ ...prev, buttonLoader: false }));
      });
    }
  }, [props.pageNumber, selected, dropDownSelection]);

  return (
    <div className="flex relative">
      {loader.pageLoader && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
      {/* Filter div */}
      {loader.imagesLoader && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
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
          categories={parameters.categories.map((category) => ({
            label: category.category_name,
            value: category.category_id,
          }))}
          name="categories"
          className="border-black text-[#111111]"
          selectedItems={selected.categories}
          onSelect={(name, value) => handleInput(name, value)}
          isMultiple={true}
        />
        <ColorPicker
          name="color_ids"
          className="mt-[50px] mb-[20px]"
          className2="w-[25px] h-[25px]"
          colors={parameters.colors.map((color) => ({
            label: color.color_code,
            value: color.color_id,
          }))}
          multiple={true}
          onSelect={(name, value) => handleInput(name, value)}
          selectedColors={selected.color_ids}
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
              name="sortBy"
              onSelect={(name, value) => handleInput(name, value)}
            />
            <div>{`Showing ${props.totalProducts} Products`}</div>
          </div>
        </div>
        {!loader.imagesLoader && props.totalProducts === 0 ? (
          <div className="absolute flex items-center justify-center inset-5 font-primary text-[30px] text-[#979797]">
            No products available&#128543;
          </div>
        ) : (
          <div>
            <ShopItem rootClassName="mt-[16px]" items={products} />
            {!loader.imagesLoader &&
              Number(props.currentPageNumber) < props.totalPages && (
                <div className="flex justify-center mt-[42px] mb-[50px]">
                  <Button
                    buttonName="Load more products"
                    buttonClassName="w-fit border-[2px] py-[14px] px-[76px] justify-center font-semibold text-[16px] !text-borderColor !border-[#979797]"
                    onClick={handlePageNumber}
                    isLoading={loader.buttonLoader}
                  />
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default shop;
