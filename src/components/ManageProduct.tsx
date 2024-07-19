import { getApi, postApi } from "@/apiClient/methods";
import { Button } from "@/components/Button";
import { CustomDropDown } from "@/components/CustomDropDown";
import { CustomInput } from "@/components/CustomInput";
import { IAddProduct, IProductParameters } from "@/utils/interfaces";
import React, { useEffect, useRef, useState } from "react";

interface ManageProductProps {
  mode: "Add" | "Edit";
  initialValues: any;
}

export const ManageProducts = ({
  mode = "Add",
  initialValues = {},
}: ManageProductProps) => {
  const [input, setInput] = useState<IAddProduct>({
    product_name: "",
    images: [],
    quantity: 0,
    size_ids: [],
    price: 0,
    color_ids: [],
    category_id: "",
    description: "",
  });
  const [apiData, setApiData] = useState<IProductParameters>({
    colors: [],
    sizes: [],
    categories: [],
  });

  const getData = async () => {
    const response = await getApi<IProductParameters>({
      endUrl: "get-product-parameters",
    });
    console.log(response);
    console.log(response?.data);
    const { colors, sizes, categories } = response?.data;
    setApiData({
      colors: colors,
      sizes: sizes,
      categories: categories,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInput = (name: string, value: string | string[] | number) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<string[]>([]);
  const handleButton = async () => {
    // e.preventDefault();
    if (mode === "Add") {
      const data = await postApi({
        endUrl: "admin/add-product",
        data: input,
      });
    } else {
      const data = await postApi({
        endUrl: "admin/edit-product",
        data: input,
      });
    }
  };

  // const handleArrayInput = (name: string, value: string[] | string) => {
  //   console.log(name, value);
  //   setInput((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  useEffect(() => {
    setInput((prev) => ({ ...prev, images: files }));
  }, [files]);

  const handleRemoveImage = (index: number) => {
    console.log("clicked");
    setFiles((prev) => prev.filter((file, i) => i !== index));
  };
  console.log(files, "sdfghj");
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

  return (
    <div className="mt-[154px]">
      <div className="h-[100%] sticky top-[30%] bg-red-300">
        <div className="font-primary font-semibold text-[36px] leading-[44px] tracking-[-1.5px] text-[#000000]">
          {`${mode} Products`}
        </div>
        <div className="mt-[77px] flex gap-[42px] h-[100%]">
          {/* left side for images */}
          <div className="flex flex-col w-[30%] mt-[20px] h-[100%]">
            <div className=" grid grid-cols-4 gap-4 h-[100%] overflow-auto">
              {files.map((file, index) => (
                <div key={index} className="relative w-full h-full">
                  <img
                    src={file}
                    alt="Uploaded Image Preview"
                    // width={270}
                    // height={270}
                  />
                  {/* <button
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </button> */}
                  <Button
                    buttonName="x"
                    buttonClassName="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    onClick={() => handleRemoveImage(index)}
                  />
                </div>
              ))}
            </div>
            <form onClick={() => inputRef.current?.click()}>
              <input
                type="file"
                name="file"
                ref={inputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
                accept=".png,.jpg,.jpeg"
              />
              <Button
                buttonName={`${mode} images`}
                buttonClassName="font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px] !text-[#0D0D0D] py-[14px] text-center flex items-center justify-center"
                rootClassName="border border-[#979797] mt-[57.5%] flex items-center justify-center cursor-pointer"
                // onClick={() => inputRef.current?.click()}
                onClick={() => handleFileChange}
              />
            </form>
          </div>
          {/* right side for input fields */}
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
                defaultValue={initialValues.quantity}
              />
            </div>
            <div className="mt-[24px] flex gap-[54px]">
              <CustomDropDown
                showDefault={false}
                list={apiData.sizes.map((size) => ({
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
                defaultValue={initialValues.price}
              />
            </div>
            <div className="mt-[30px] flex gap-[54px] h-10">
              {/* <div className="flex w-full gap-4 border border-black"> */}
              <CustomDropDown
                showDefault={false}
                list={apiData.colors.map((color) => ({
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
              />
              {/* handleArrayInput */}
              {/* </div> */}

              <CustomDropDown
                showDefault={false}
                list={apiData.categories.map((category) => ({
                  label: category.category_name,
                  value: category.category_id,
                }))}
                optionClassName="bg-transparent pl-2 border-[#979797] font-primary font-semibold text-sm leading-[16.45px] tracking-[-0.3px] text-[#000000]"
                rootClassName="flex w-full gap-4 border border-black"
                name="category_id"
                onSelect={(name, value) => handleInput(name, value)}
                placeholder={mode === "Add" ? "Category" : `${mode} Category`}
                // handle array input
              />
            </div>
            <CustomInput
              className="mt-[30px] h-[120px] pl-4 bg-transparent font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD] border-[#979797]"
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
        buttonName="Add images"
        buttonClassName="font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px] !text-[#0D0D0D] py-[14px] text-center pl-10"
        rootClassName="border border-[#979797] mt-10 flex items-center justify-center"
        onClick={() => inputRef.current?.click()}
      /> */}
        <div className="mt-[123px] flex justify-center gap-[66px]">
          <Button
            buttonName="Add"
            buttonClassName="bg-[#000000] !text-[#FFFFFF] w-[149px] h-[50px]"
            onClick={handleButton}
          />
          <Button
            buttonName="Back"
            buttonClassName="bg-[#000000] !text-[#FFFFFF] w-[149px] h-[50px]"
          />
        </div>
      </div>
    </div>
  );
};
