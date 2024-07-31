import { getApi, postApi } from "@/api-client/methods";
import { Button } from "@/components/Button";
import { CustomDropDown } from "@/components/CustomDropDown";
import { CustomInput } from "@/components/CustomInput";
import {
  IAddProduct,
  ICategory,
  Icolor,
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
    quantity: 0,
    size_ids: [],
    price: 0,
    color_ids: [],
    category_id: "",
    description: "",
  });

  const [parametersData, setParametersData] = useState<IProductParameters>({
    colors: [],
    sizes: [],
    categories: [],
  });

  const [selectedParameters, setSelectedParameters] = useState({
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

  useEffect(() => {
    getParametersData();
    // if (mode === "Edit") {
    //   setIntialValues();
    // }
  }, []);

  // const setIntialValues = () => {
  //   if (initialValues) {
  //     setProductDetails({
  //       product_name: initialValues.product_name || "",
  //       images: initialValues.images || [],
  //       quantity: initialValues.quantity || 0,
  //       size_ids: initialValues.size_ids || [],
  //       price: initialValues.price || 0,
  //       color_ids: initialValues.color_ids || [],
  //       category_id: initialValues.category_id || "",
  //       description: initialValues.description || "",
  //     });
  //   }
  // };

  const handleInput = (name: string, value: string | string[] | number) => {
    if (name === "category_id") {
      setProductDetails((prev) => ({ ...prev, [name]: value.toString() }));
    } else {
      setProductDetails((prev) => ({ ...prev, [name]: value }));
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<string[]>([]);
  const handleButton = async () => {
    // e.preventDefault();
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
      const data = await postApi({
        endUrl: "admin/edit-product",
        data: productDetails,
      });
    }
  };

  useEffect(() => {
    setProductDetails((prev) => ({ ...prev, images: files }));
  }, [files]);

  const handleRemoveImage = (index: number) => {
    // console.log("clicked");
    setFiles((prev) => prev.filter((file, i) => i !== index));
  };

  // console.log(files, "sdfghj");
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
    const base64Files: string[] = [];
    files.forEach((file) => {
      convertFileToBase64(file, (base64) => {
        base64Files.push(base64);
        if (base64Files.length === files.length) {
          setFiles((prev) => [...prev, ...base64Files]);
        }
      });
    });
  };
  // console.log(initialValues, "IV");
  // console.log(parametersData.colors, "colors");
  // console.log(initialValues.color_ids);
  // console.log(initialValues.size_ids, "sizes");
  // console.log(initialValues.price);
  // console.log(initialValues.color_id, "asdbn");

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

  const getCategoryObject = (
    categories: ICategory[],
    category_id: string
  ): ICategory | undefined => {
    return categories.find((category) => category.category_id === category_id);
  };

  // const handleCategories = () => {
  //   const selectedCategory = getCategoryObject(
  //     parametersData.categories,
  //     initialValues.category_id
  //   );

  //   // If a category is found, update the selectedParameters state
  //   if (selectedCategory) {
  //     setSelectedParameters((prev) => ({
  //       ...prev,
  //       category: selectedCategory,
  //     }));
  //   } else {
  //     setSelectedParameters((prev) => ({
  //       ...prev,
  //       category: [],
  //     }));
  //   }
  // };

  useEffect(() => {
    if (mode === "Edit" && initialValues) {
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
      // handleCategories();
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
    <div className="mt-[154px]">
      <div className="h-[100%] sticky top-[154px]">
        <div className="font-primary font-semibold text-[36px] leading-[44px] tracking-[-1.5px] text-[#000000]">
          {`${mode} Product`}
        </div>
        <div className="mt-[77px] flex gap-[42px] h-[100%]">
          {/* left side for images */}
          <div className="flex flex-col w-[30%] mt-[20px] h-[100%]">
            <div className=" grid grid-cols-4 gap-4 h-[100%]">
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
              rootClassName="border border-[#979797] mt-[57.5%] flex items-center justify-center cursor-pointer"
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
                selectedItems={selectedParameters.sizes.map((size: ISize) => ({
                  label: size.size_type,
                  value: size.size_id,
                }))}

                // handleArrayInput
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
                selectedItems={selectedParameters.colors.map(
                  (color: Icolor) => ({
                    label: color.color_name,
                    value: color.color_id,
                  })
                )}
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
                // handle array productDetails
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

        {/* <form>
        <productDetails
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
        buttonName="Add images"
        buttonClassName="font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px] !text-[#0D0D0D] py-[14px] text-center pl-10"
        rootClassName="border border-[#979797] mt-10 flex items-center justify-center"
        onClick={() => inputRef.current?.click()}
      /> */}
        <div className="mt-[123px] flex justify-center gap-[66px]">
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
