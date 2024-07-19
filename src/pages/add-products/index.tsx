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

// // "colors": [
// //             {
// //                 "color_id": "eceb9c64-dc1d-400a-aa9a-96acea6540ab",
// //                 "color_name": "Red",
// //                 "color_code": "#EB5757"
// //             },
// //             {
// //                 "color_id": "683e16c9-7b12-444c-8635-88815fc796db",
// //                 "color_name": "Light Blue",
// //                 "color_code": "#56CCF2"
// //             },
// //             {
// //                 "color_id": "49714c3d-b511-4f07-806e-7d1132a92736",
// //                 "color_name": "Orange",
// //                 "color_code": "#DF9167"
// //             },
// //             {
// //                 "color_id": "8bb2b153-6f7b-448e-81ec-57598a3704e4",
// //                 "color_name": "Purple",
// //                 "color_code": "#7B61FF"
// //             },
// //             {
// //                 "color_id": "9f1e7277-1e65-47cd-91df-4105559e4ba1",
// //                 "color_name": "Violet",
// //                 "color_code": "#BB6BD9"
// //             },
// //             {
// //                 "color_id": "14589614-09ec-4efb-b47a-13d513a15d6b",
// //                 "color_name": "Green",
// //                 "color_code": "#219653"
// //             },
// //             {
// //                 "color_id": "f4e5f040-76e0-44c6-898b-0544bc5c9fc2",
// //                 "color_name": "Blue",
// //                 "color_code": "#2F80ED"
// //             },
// //             {
// //                 "color_id": "f5d149bd-a703-40e0-9b89-c5c30439a4d4",
// //                 "color_name": "Black",
// //                 "color_code": "#4F4F4F"
// //             },
// //             {
// //                 "color_id": "0f3b61f9-9315-4a1b-b398-a4ab7397ea92",
// //                 "color_name": "White",
// //                 "color_code": "#F2F2F2"
// //             },
// //             {
// //                 "color_id": "c0966c81-87ab-4fc3-bb3c-af32ac2f0eff",
// //                 "color_name": "Light Green",
// //                 "color_code": "#6FCF97"
// //             }
// //         ],
// //         "sizes": [
// //             {
// //                 "size_id": "ed352331-3079-46d8-b84d-d3c9232ceadc",
// //                 "size_type": "XS"
// //             },
// //             {
// //                 "size_id": "cfca2f5e-dfc5-4ff5-a90f-c4f7e300f105",
// //                 "size_type": "S"
// //             },
// //             {
// //                 "size_id": "a5376391-5223-4f23-927e-c15c326942c2",
// //                 "size_type": "M"
// //             },
// //             {
// //                 "size_id": "cf442b22-abe8-4222-befe-1ee98d7f5a29",
// //                 "size_type": "L"
// //             },
// //             {
// //                 "size_id": "fe7e65ec-ef43-4fdd-80d2-ad99b7d4ac85",
// //                 "size_type": "XL"
// //             },
// //             {
// //                 "size_id": "3ea08b1b-8338-4163-a21e-144164fde067",
// //                 "size_type": "XXL"
// //             },
// //             {
// //                 "size_id": "191b6a56-f170-4656-8351-09d668f21636",
// //                 "size_type": "3Xl"
// //             }
// //         ],
// //         "categories": [
// //             {
// //                 "category_id": "73ae6199-426d-4864-8f24-347b797c5110",
// //                 "category_name": "Jackets"
// //             },
// //             {
// //                 "category_id": "38259a82-088c-4be2-bae1-b29407d752a9",
// //                 "category_name": "Sweatshirts & Hoodies"
// //             },
// //             {
// //                 "category_id": "8ebdc39d-5d1b-438f-904f-66e908d91e4e",
// //                 "category_name": "Sweaters"
// //             },
// //             {
// //                 "category_id": "d2ef4f6c-2a23-4d48-b808-be100846af46",
// //                 "category_name": "Shirts"
// //             },
// //             {
// //                 "category_id": "307c050e-19b3-4277-9ea1-cf7b3e97102a",
// //                 "category_name": "T-Shirts"
// //             },
// //             {
// //                 "category_id": "a4b50ffe-661c-429b-801d-6c9ee60132da",
// //                 "category_name": "Pants & Jeans"
// //             }
// //         ]
// //     }
