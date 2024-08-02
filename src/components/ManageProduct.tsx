import { getApi, postApi, putApi } from "@/api-client/methods";
import { Button } from "@/components/Button";
import { CustomDropDown } from "@/components/CustomDropDown";
import { CustomInput } from "@/components/CustomInput";
import {
  IAddProduct,
  ICategory,
  Icolor,
  IParameters,
  IProductParameters,
  ISize,
} from "@/utils/interfaces";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
interface ManageProductProps {
  mode: "Add" | "Edit";
  initialValues: any;
  id?: string;
}

export const ManageProducts = ({
  mode = "Add",
  initialValues = {},
  id,
}: ManageProductProps) => {
  const router = useRouter();
  const [productDetails, setProductDetails] = useState<IAddProduct>({
    product_name: "",
    images: [],
    quantity: undefined,
    size_ids: [],
    price: undefined,
    color_ids: [],
    category_id: "",
    description: "",
  });

  const [parametersData, setParametersData] = useState<IProductParameters>({
    colors: [],
    sizes: [],
    categories: [],
  });
  const [currentMode, setCurrentMode] = useState<string>("");
  const [selectedParameters, setSelectedParameters] = useState<IParameters>({
    colors: [],
    sizes: [],
    category: [],
  });

  const getParametersData = async () => {
    const response = await getApi<IProductParameters>({
      endUrl: "get-product-parameters",
    });
    const { colors, sizes, categories } = response?.data;
    setParametersData({
      colors: colors,
      sizes: sizes,
      categories: categories,
    });
  };

  const isValidProductDetails = (
    details: IAddProduct,
    mode: "Add" | "Edit"
  ): boolean => {
    const {
      product_name,
      images,
      quantity,
      size_ids,
      price,
      color_ids,
      category_id,
      description,
    } = details;
    if (!product_name || !category_id || !description) return false;
    if (mode === "Add" && images.length < 4) return false;
    if (
      quantity === undefined ||
      price === undefined ||
      size_ids.length === 0 ||
      color_ids.length === 0
    )
      return false;
    return true;
  };

  useEffect(() => {
    getParametersData();
  }, []);

  const handleInput = (name: string, value: string | string[] | number) => {
    if (name === "category_id") {
      setProductDetails((prev) => ({ ...prev, [name]: value.toString() }));
    } else {
      setProductDetails((prev) => ({ ...prev, [name]: value }));
    }
    if (name === "size_ids") {
      const selectedSizes = parametersData.sizes.filter((size: ISize) =>
        (value as string[]).includes(size.size_id)
      );
      setSelectedParameters((prev) => ({ ...prev, sizes: selectedSizes }));
    } else if (name === "color_ids") {
      const selectedColors = parametersData.colors.filter((color: Icolor) =>
        (value as string[]).includes(color.color_id)
      );
      setSelectedParameters((prev) => ({ ...prev, colors: selectedColors }));
    } else if (name === "category_id") {
      const selectedCategoryArray = parametersData.categories.filter(
        (category: ICategory) => category.category_id === value
      );
      setSelectedParameters((prev) => ({
        ...prev,
        category: selectedCategoryArray,
      }));
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<string[]>([]);

  const handleButton = async () => {
    if (!isValidProductDetails(productDetails, mode)) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      if (mode === "Add") {
        if (productDetails.images.length >= 4) {
          const response = await postApi({
            endUrl: "admin/add-product",
            data: productDetails,
          });
          if (response?.status) {
            toast.success(response?.message);
          }
        } else {
          toast.error("Images atleast should be four.");
        }
      } else {
        const { id } = router.query;
        const updatedProductDetails = {
          ...productDetails,
          product_id: id as string,
        };

        const response = await putApi({
          endUrl: `admin/edit-product/${id}`,
          data: updatedProductDetails,
        });
        if (response?.status) {
          toast.success(response?.message);
        }
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    setProductDetails((prev) => ({ ...prev, images: files }));
  }, [files]);

  const handleRemoveImage = (index: number) => {
    setFiles((prev) => prev.filter((file, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      convertFilesArrayToBase64(filesArray);
    }
  };

  const convertFileToBase64 = (
    file: File,
    callback: (base64: string) => void
  ) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      callback(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const convertFilesArrayToBase64 = (files: File[]) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    const base64Files: string[] = [];

    files.forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`File type not supported: ${file.name}`);
        return;
      }

      convertFileToBase64(file, (base64) => {
        base64Files.push(base64);
        if (base64Files.length === files.length) {
          setFiles((prev) => [...prev, ...base64Files]);
        }
      });
    });
  };

  const backButton = () => {
    router.back();
  };

  const handleSizes = () => {
    const selectedSizes = initialValues.size_ids
      .map((size_id: string) => {
        return parametersData.sizes.find(
          (size: ISize) => size.size_id === size_id
        );
      })
      .filter((size: any) => size !== undefined);
    setSelectedParameters((prev) => ({ ...prev, sizes: selectedSizes }));
  };

  const handleColors = () => {
    const selectedColors = initialValues.color_ids
      .map((color_id: string) => {
        return parametersData.colors.find(
          (color: Icolor) => color.color_id === color_id
        );
      })
      .filter((size: any) => size !== undefined);
    setSelectedParameters((prev) => ({ ...prev, colors: selectedColors }));
  };

  const handleCategories = () => {
    const selectedCategoryArray: ICategory[] = parametersData.categories.filter(
      (category) => category.category_id === initialValues.category_id
    );
    setSelectedParameters((prev) => ({
      ...prev,
      category: selectedCategoryArray,
    }));
  };

  useEffect(() => {
    if (mode === "Edit" && initialValues) {
      setCurrentMode(mode);
      setProductDetails({
        product_name: initialValues.product_name || "",
        images: initialValues.images || [],
        quantity: initialValues.quantity || 0,
        size_ids: initialValues.size_ids || [],
        price: initialValues.price || 0,
        color_ids: initialValues.color_ids || [],
        category_id: initialValues.category_id || "",
        description: initialValues.description || "",
      });
      setFiles(initialValues.images || []);
      handleSizes();
      handleColors();
      handleCategories();
    }
  }, [
    initialValues.size_ids,
    parametersData.sizes,
    parametersData.colors,
    parametersData.categories,
    mode,
    initialValues,
  ]);

  return (
    <div className="mt-[154px] h-[70vh]">
      <div className="h-[100%]">
        <div className="font-primary font-semibold text-[36px] leading-[44px] tracking-[-1.5px] text-[#000000]">
          {`${mode} Product`}
        </div>
        <div className="mt-[77px] flex gap-[42px] h-[70%]">
          {/* left side for images */}
          <div className="flex flex-col w-[30%] mt-[20px] h-[100%]">
            <div className="grid grid-cols-4 gap-4 h-[341px] overflow-y-auto ">
              {files.map((file, index) => (
                <div key={index} className="relative w-full h-full">
                  <img
                    src={file}
                    alt="Uploaded Image Preview"
                    // width={270}
                    // height={270}
                  />
                  <Button
                    buttonName="x"
                    buttonClassName="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    onClick={() => handleRemoveImage(index)}
                  />
                </div>
              ))}
            </div>
            <form onClick={(e) => e.preventDefault}>
              <input
                type="file"
                name="file"
                ref={inputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
                accept=".png,.jpg,.jpeg"
              />
            </form>
            <Button
              buttonName={`${mode} images`}
              buttonClassName="font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px] !text-[#0D0D0D] py-[14px] text-center flex items-center justify-center"
              rootClassName="border border-[#979797] mt-10 flex items-center justify-center cursor-pointer"
              onClick={() => inputRef.current?.click()}
            />
          </div>
          {/* right side for productDetails fields */}
          <div className="w-[70%]">
            <div className="flex gap-[54px]">
              <CustomInput
                className="bg-transparent pl-4 border-[#979797] font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD]"
                placeholder={mode === "Add" ? "Name" : `${mode} Name`}
                type="text"
                name="product_name"
                max={0}
                min={0}
                required={true}
                isText={({ value, name }) => handleInput(name, value)}
                defaultValue={initialValues.product_name}
              />
              <CustomInput
                className="bg-transparent pl-4 border-[#979797] font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD]"
                placeholder={mode === "Add" ? "Quantity" : `${mode} Quantity`}
                type="number"
                name="quantity"
                max={10}
                min={1}
                required={true}
                isValid={({ value }) =>
                  handleInput("quantity", parseFloat(value))
                }
                defaultValue={initialValues.quantity || ""}
              />
            </div>
            <div className="mt-[24px] flex gap-[54px]">
              <CustomDropDown
                showDefault={false}
                list={parametersData.sizes.map((size) => ({
                  label: size.size_type,
                  value: size.size_id,
                }))}
                optionClassName=""
                rootClassName="flex w-full gap-4 border border-black"
                name="size_ids"
                isMultiple={true}
                onSelect={(name, value) => handleInput(name, value)}
                placeholder={
                  mode === "Add" ? "Available Sizes" : `${mode} Sizes`
                }
                selectedItems={
                  mode === "Edit"
                    ? selectedParameters.sizes.map((size: ISize) => ({
                        label: size.size_type,
                        value: size.size_id,
                      }))
                    : undefined
                }
              />

              <CustomInput
                className="bg-transparent pl-4 border-[#979797] font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD]"
                placeholder={mode === "Add" ? "Price" : `${mode} Price`}
                type="number"
                name="price"
                max={10}
                min={1}
                required={true}
                isValid={({ value }) => handleInput("price", parseFloat(value))}
                defaultValue={initialValues.price || ""}
              />
            </div>
            <div className="mt-[30px] flex gap-[54px] h-10">
              {/* <div className="flex w-full gap-4 border border-black"> */}
              <CustomDropDown
                showDefault={false}
                list={parametersData.colors.map((color) => ({
                  label: color.color_name,
                  value: color.color_id,
                }))}
                optionClassName="bg-transparent pl-2 border-[#979797] font-primary font-semibold text-sm leading-[16.45px] tracking-[-0.3px] text-[#000000]"
                rootClassName="flex w-full gap-4 border border-black"
                isMultiple={true}
                name="color_ids"
                onSelect={(name, value) => handleInput(name, value)}
                placeholder={
                  mode === "Add" ? "Available Colors" : `${mode} Colors`
                }
                selectedItems={
                  mode === "Edit"
                    ? selectedParameters.colors.map((color: Icolor) => ({
                        label: color.color_name,
                        value: color.color_id,
                      }))
                    : undefined
                }
              />

              <CustomDropDown
                showDefault={false}
                list={parametersData.categories.map((category) => ({
                  label: category.category_name,
                  value: category.category_id,
                }))}
                optionClassName="bg-transparent pl-2 border-[#979797] font-primary font-semibold text-sm leading-[16.45px] tracking-[-0.3px] text-[#000000]"
                rootClassName="flex w-full gap-4 border border-black"
                name="category_id"
                onSelect={(name, value) => handleInput(name, value)}
                placeholder={mode === "Add" ? "Category" : `${mode} Category`}
                selectedItems={
                  mode === "Edit"
                    ? selectedParameters.category.map((item: ICategory) => ({
                        label: item.category_name,
                        value: item.category_id, // Changed to category_id
                      }))
                    : undefined
                }
              />
            </div>
            <CustomInput
              className="mt-[30px] h-[120px] pl-4 bg-transparent font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD] border-[#979797] "
              placeholder={
                mode === "Add" ? "Description" : `${mode} Description`
              }
              type="text"
              name="description"
              max={0}
              min={0}
              isText={({ value, name }) => handleInput(name, value)}
              defaultValue={initialValues.description}
            />
          </div>
        </div>
        <div className="flex justify-center gap-[66px]">
          <Button
            buttonName={mode === "Add" ? "Add" : "Save"}
            buttonClassName="bg-[#000000] !text-[#FFFFFF] w-[149px] h-[50px]"
            onClick={handleButton}
          />
          <Button
            buttonName="Back"
            buttonClassName="bg-[#000000] !text-[#FFFFFF] w-[149px] h-[50px]"
            onClick={backButton}
          />
        </div>
      </div>
    </div>
  );
};
