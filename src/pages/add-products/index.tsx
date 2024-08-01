import { ManageProducts } from "@/components/ManageProduct";

const AddProducts = () => {
  return <ManageProducts initialValues={""} mode="Add" />;
};

export default AddProducts;

// import { getApi, postApi } from "@/apiClient/methods";
// import { Button } from "@/components/Button";
// import { CustomDropDown } from "@/components/CustomDropDown";
// import { CustomInput } from "@/components/CustomInput";
// import { IAddProduct, IProductParameters } from "@/utils/interfaces";
// import React, { useEffect, useRef, useState } from "react";

// interface ManageProductProps {
//   mode: "Add" | "Edit";
//   initialValues: any;
// }

// const addProducts = ({
//   mode = "Add",
//   initialValues = {},
// }: ManageProductProps) => {
//   const [input, setInput] = useState<IAddProduct>({
//     product_name: "",
//     images: [],
//     quantity: 0,
//     size_ids: [],
//     price: 0,
//     color_ids: [],
//     category_id: "",
//     description: "",
//   });
//   const [apiData, setApiData] = useState<IProductParameters>({
//     colors: [],
//     sizes: [],
//     categories: [],
//   });

//   const getData = async () => {
//     const response = await getApi<IProductParameters>({
//       endUrl: "get-product-parameters",
//     });
//     console.log(response);
//     console.log(response?.data);
//     const { colors, sizes, categories } = response?.data;
//     setApiData({
//       colors: colors,
//       sizes: sizes,
//       categories: categories,
//     });
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const handleInput = (name: string, value: any) => {
//     setInput((prev) => ({ ...prev, [name]: value }));
//   };
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [files, setFiles] = useState<string[]>([]);
//   const handleButton = async () => {
//     // e.preventDefault();
//     const data = await postApi({
//       endUrl: "admin/add-product",
//       data: input,
//     });
//   };

//   const handleArrayInput = (name: string, value: string[] | string) => {
//     console.log(name, value);
//     setInput((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     setInput((prev) => ({ ...prev, images: files }));
//   }, [files]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const fileList = e.target.files;
//     if (fileList) {
//       const filesArray = Array.from(fileList);
//       convertFilesArrayToBase64(filesArray);
//     }
//   };

//   const convertFileToBase64 = (
//     file: File,
//     callback: (base64: string) => void
//   ) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       callback(e.target?.result as string);
//     };
//     reader.readAsDataURL(file);
//   };

//   const convertFilesArrayToBase64 = (files: File[]) => {
//     const base64Files: string[] = [];
//     files.forEach((file) => {
//       convertFileToBase64(file, (base64) => {
//         base64Files.push(base64);
//         if (base64Files.length === files.length) {
//           setFiles((prev) => [...prev, ...base64Files]);
//         }
//       });
//     });
//   };

//   return (
//     <div className="mt-[154px] h-[100%]">
//       <div className="font-primary font-semibold text-[36px] leading-[44px] tracking-[-1.5px] text-[#000000]">
//         Add Products
//       </div>
//       <div className="mt-[77px] flex gap-[42px] h-[100%]">
//         {/* left side for images */}
//         <div className="flex flex-col w-[30%] mt-[20px] h-[100%]">
//           <div className=" grid grid-cols-4 gap-4 h-[100%]">
//             {files.map((file, index) => (
//               <div key={index} className="w-full h-full">
//                 <img
//                   src={file}
//                   alt="Uploaded Image Preview"
//                   // width={270}
//                   // height={270}
//                 />
//               </div>
//             ))}
//           </div>
//           <form>
//             <input
//               type="file"
//               name="file"
//               ref={inputRef}
//               onChange={handleFileChange}
//               className="hidden"
//               multiple
//               accept=".png,.jpg,.jpeg"
//             />
//           </form>
//           <Button
//             buttonName="Add images"
//             buttonClassName="font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px] !text-[#0D0D0D] py-[14px] text-center flex items-center justify-center"
//             rootClassName="border border-[#979797] mt-40 flex items-center justify-center"
//             onClick={() => inputRef.current?.click()}
//           />
//         </div>
//         {/* right side for input fields */}
//         <div className="w-[70%]">
//           <div className="flex gap-[54px]">
//             <CustomInput
//               className="bg-transparent pl-4 border-[#979797] font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD]"
//               placeholder="Name"
//               type="text"
//               name="product_name"
//               max={0}
//               min={0}
//               required={true}
//               isText={({ value, name }) => handleInput(name, value)}
//             />
//             <CustomInput
//               className="bg-transparent pl-4 border-[#979797] font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD]"
//               placeholder="Quantity"
//               type="number"
//               name="quantity"
//               max={10}
//               min={1}
//               required={true}
//               isValid={({ value }) =>
//                 handleInput("quantity", parseFloat(value))
//               }
//             />
//           </div>
//           <div className="mt-[24px] flex gap-[54px]">
//             <CustomDropDown
//               showDefault={false}
//               list={apiData.sizes.map((size) => ({
//                 label: size.size_id,
//                 value: size.size_type,
//               }))}
//               optionClassName=""
//               rootClassName="flex w-full gap-4 border border-black"
//               name="size_ids"
//               isMultiple={true}
//               onSelect={(name, value) => handleArrayInput(name, value)}
//               placeholder="Available Sizes"
//             />
//             <CustomInput
//               className="bg-transparent pl-4 border-[#979797] font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD]"
//               placeholder="Price"
//               type="number"
//               name="price"
//               max={10}
//               min={1}
//               required={true}
//               isValid={({ value }) => handleInput("price", parseFloat(value))}
//             />
//           </div>
//           <div className="mt-[30px] flex gap-[54px] h-10">
//             {/* <div className="flex w-full gap-4 border border-black"> */}
//             <CustomDropDown
//               showDefault={false}
//               list={apiData.colors.map((color) => ({
//                 label: color.color_id,
//                 value: color.color_name,
//               }))}
//               optionClassName="bg-transparent pl-2 border-[#979797] font-primary font-semibold text-sm leading-[16.45px] tracking-[-0.3px] text-[#000000]"
//               rootClassName="flex w-full gap-4 border border-black"
//               isMultiple={true}
//               name="color_ids"
//               onSelect={(name, value) => handleArrayInput(name, value)}
//               placeholder="Available Colors"
//             />
//             {/* </div> */}

//             <CustomDropDown
//               showDefault={false}
//               list={apiData.categories.map((category) => ({
//                 label: category.category_id,
//                 value: category.category_name,
//               }))}
//               optionClassName="bg-transparent pl-2 border-[#979797] font-primary font-semibold text-sm leading-[16.45px] tracking-[-0.3px] text-[#000000]"
//               rootClassName="flex w-full gap-4 border border-black"
//               name="category_id"
//               onSelect={(name, value) => handleArrayInput(name, value)}
//               placeholder="Category"
//             />
//           </div>
//           <CustomInput
//             className="mt-[30px] h-[120px] pl-4 bg-transparent font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD] border-[#979797]"
//             placeholder="Description"
//             type="text"
//             name="description"
//             max={0}
//             min={0}
//             isText={({ value, name }) => handleInput(name, value)}
//           />
//         </div>
//       </div>

//       {/* <form>
//         <input
//           type="file"
//           name="file"
//           ref={inputRef}
//           onChange={handleFileChange}
//           className="hidden"
//           multiple
//           accept=".png,.jpg,.jpeg"
//         />
//       </form>
//       <Button
//         buttonName="Add images"
//         buttonClassName="font-primary font-semibold text-xxs leading-[22px] tracking-[-0.4px] !text-[#0D0D0D] py-[14px] text-center pl-10"
//         rootClassName="border border-[#979797] mt-10 flex items-center justify-center"
//         onClick={() => inputRef.current?.click()}
//       /> */}
//       <div className="mt-[123px] flex justify-center gap-[66px]">
//         <Button
//           buttonName="Add"
//           buttonClassName="bg-[#000000] !text-[#FFFFFF] w-[149px] h-[50px]"
//           onClick={handleButton}
//         />
//         <Button
//           buttonName="Back"
//           buttonClassName="bg-[#000000] !text-[#FFFFFF] w-[149px] h-[50px]"
//         />
//       </div>
//     </div>
//   );
// };

// export default addProducts;
