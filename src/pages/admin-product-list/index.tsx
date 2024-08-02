import { deleteApi, getApi } from "@/api-client/methods";
import { Button } from "@/components/Button";
import { CheckBox } from "@/components/CheckBox";
import { CustomInput } from "@/components/CustomInput";
import { Loader } from "@/components/Loader";
import Spinner from "@/components/Spinner";
import { LIMIT } from "@/utils/constants";
import { formatCost } from "@/utils/helpers";
import {
  IGetProducts,
  IListProduct,
  IProductParameters,
} from "@/utils/interfaces";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const AdminDashboardProductList = () => {
  const [isSelected, setIsSelected] = useState<{
    categories: string[];
  }>({ categories: [] });
  const router = useRouter();
  const [products, setProducts] = useState<IListProduct[]>([]);
  const [props, setProps] = useState({
    pageNumber: 1,
    totalProducts: 0,
    currentPageNumber: "1",
    totalPages: 0,
  });
  const [searchParams, setSearchParams] = useState<string>("");
  const [parameters, setParameters] = useState<IProductParameters>({
    colors: [],
    sizes: [],
    categories: [],
  });
  const [selected, setSelected] = useState<{
    categories: string[];
  }>({ categories: [] });
  const [loader, setLoader] = useState({
    pageLoader: false,
    imagesLoader: false,
    buttonLoader: false,
  });

  const getProductsData = async () => {
    const categoryQuery = handleQuery("category_id", selected.categories);
    const response = await getApi<IGetProducts>({
      endUrl: `list-products?page=${
        props.pageNumber
      }&limit=${LIMIT}&search=${searchParams}&${
        categoryQuery ? `&${categoryQuery}` : ""
      }`,
    });
    setProducts((prev) => [...prev, ...response?.data?.products]);
    setProps((prev) => ({
      ...prev,
      totalProducts: response?.data?.total_productss,
      currentPageNumber: response?.data?.current_page,
      totalPages: response?.data?.totalPages,
    }));
  };

  const getProductParameters = async () => {
    const response = await getApi<IProductParameters>({
      endUrl: "get-product-parameters",
    });
    const { colors, sizes, categories } = response?.data;
    setParameters({ colors, sizes, categories });
  };

  const handleQuery = (type: string, array: string[]) => {
    const res = array.map((item) => `${type}=${item}`).join("&");
    return res;
  };

  const handleClear = () => {
    setSelected({ categories: [] });
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

  const handleInput = (name: string, value: string | string[]) => {
    if (name === "search") {
      setSearchParams(value as string);
    }
    setProps((prev) => ({ ...prev, pageNumber: 1 }));
    setProducts([]);
    setSelected((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditButton = async (id: string) => {
    router.push(`/edit-product/${id}`);
  };

  const routeBack = () => {
    router.back();
  };

  const handleDeleteButton = async (product_id: string) => {
    try {
      const response = await deleteApi({
        endUrl: `admin/delete-product/${product_id}`,
      });
      if (response?.status) {
        setProducts((prev) =>
          prev.filter((product) => product.product_id !== product_id)
        );
        toast.success(response?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
    }
  };

  useEffect(() => {
    setLoader((prev) => ({ ...prev, pageLoader: true }));
    getProductParameters().finally(() => {
      setLoader((prev) => ({ ...prev, pageLoader: false }));
    });
  }, []);

  useEffect(() => {
    if (props.pageNumber === 1) {
      console.log("if");
      setLoader((prev) => ({ ...prev, imagesLoader: true }));
      getProductsData().finally(() => {
        setLoader((prev) => ({
          ...prev,
          imagesLoader: false,
          buttonLoader: false,
        }));
      });
    } else {
      getProductsData().finally(() => {
        setLoader((prev) => ({ ...prev, buttonLoader: false }));
      });
    }
  }, [props.pageNumber, selected, searchParams]);

  return (
    <Spinner loading={loader.pageLoader}>
      <div className="mt-[154px] relative">
        {/* {loader.pageLoader && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Loader />
        </div>
      )} */}
        {loader.imagesLoader && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <Loader />
          </div>
        )}
        <div className="flex w-full justify-between">
          <div className="font-primary font-semibold text-[36px] leading-[44px] tracking-[-1.5px] text-[#000000] w-[75%]">
            Product List
          </div>
          <div className="w-[25%]">
            <CustomInput
              className="pl-[67px] font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px] bg-transparent"
              placeholder="Search for a product with name or ID"
              type="text"
              name="search"
              max={0}
              min={0}
              isText={({ value, name }) => handleInput(name, value)}
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
                isMultiple={true}
              />
            </div>
          </div>
          <div className="w-[80%]">
            {/* products part */}
            {props.totalProducts === 0 && (
              <div className="absolute self-center text-center inset-20 font-primary text-[30px] text-[#979797]">
                No products available&#128543;
              </div>
            )}
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
                      onClick={() => handleDeleteButton(product.product_id)}
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
          {!loader.imagesLoader &&
            Number(props.currentPageNumber) < props.totalPages && (
              <div className="flex justify-center">
                <Button
                  buttonName="Load more products"
                  buttonClassName="w-fit border-[2px] py-[11px] px-[76px] justify-center font-semibold text-[16px] !text-[#FFFFFF] bg-[#000000]"
                  onClick={handlePageNumber}
                  isLoading={loader.buttonLoader}
                />
              </div>
            )}

          <Button
            buttonName="Back"
            buttonClassName="bg-[#000000] !text-[#FFFFFF] w-[149px] h-[50px] font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px]"
            onClick={routeBack}
          />
        </div>
      </div>
    </Spinner>
  );
};

export default AdminDashboardProductList;
