"use client";

import { useTotalContext } from "@/context/productContext";

export default function Home() {
  const { state, dispatch } = useTotalContext();
  console.log(state, "contextData");
  return (
    <div>
      {/* <CheckoutForm /> */}
      {/* <SearchBar
        className="top-[50px]"
        className2=""
        src={search}
        placeholder="search"
      /> */}
      {/* <CustomInput className = "tracking-[-0.3px] leading-[16.45px] pl-[11.5px] text-sm" type="email" placeholder="Email" isSearch = {false} onChange={() => { } } errorMessage="invalid email" min={0} max={0} /> */}
      {/* <Button buttonName="continue with facebook" onClick={() => { }} className="h-[50px] font-normal text-sm tracking-[-0.4px] leading-[22px] text-black bg-white" src={logo}/> */}
      {/* <DropDown label="Login" options={["sign out"]} /> */}
      {/* <CheckBox className="ml-[12px] text-[13px] font-normal leading-[17px] tracking-[-0.4px] text-borderColor" text="Remember me"/> */}
      {/* <Switch /> */}
      {/* <Quantity /> */}
      {/* <Collapse
        data={[
          {
            title: "Return Policy",
            content:
              "This is our example return policy is which everything you need to know about our returns.",
          },
          {
            title: "Shipping options",
            content:
              "This is our shipping option  policy is which everything you need to know about our returns.",
          },
          {
            title: "Payment Policy",
            content:
              "This is our payment policy is which everything you need to know about our returns.",
          },
        ]}
      /> */}
      {/* <SizePicker /> */}
      {/* <ColorPicker className="font-normal text-large leading-[26px] tracking-[-0.3px]" className2 = "h-[50px] w-[50px]" colors={["rgba(255, 0, 0)","rgb(165, 42, 42)","rgb(255, 255, 255)"]}/> */}
      {/* <MultipleImages images={["https://imgmediagumlet.lbb.in/media/2023/05/6474602016cbc35fdad2cd7f_1685348384396.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ea_1685347096447.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ee_1685347096993.jpg?fm=webp&w=750&h=500&dpr=1"
      ]}/> */}
      {/* <ShopItem item = {[{"image" : "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1","productName" : "Men's Winter Jacket", "size" : "M", "cost" : "$99"}]}/> */}
      {/* <Carousel slides={["https://imgmediagumlet.lbb.in/media/2023/05/6474602016cbc35fdad2cd7f_1685348384396.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ea_1685347096447.jpg?fm=webp&w=750&h=500&dpr=1",
      "https://imgmediagumlet.lbb.in/media/2023/05/64745b1816cbc35fdad2c6ee_1685347096993.jpg?fm=webp&w=750&h=500&dpr=1"
      ]}/>  */}
      {/* <Steps selectedStep="Address" /> */}
      {/* <Cart
        item={[
          {
            image:
              "https://imgmediagumlet.lbb.in/media/2023/05/64745b1716cbc35fdad2c6e6_1685347095802.jpg?fm=webp&w=750&h=500&dpr=1",
            productName: "Men's Winter Jacket",
            size: "L",
            quantity: "1",
            cost: "$99",
          },
        ]}
      /> */}
      {/* <Review
        ratings_count={{
          "5 stars": 5,
          "4 stars": 1,
          "3 stars": 0,
          "2 stars": 0,
          "1 stars": 0,
        }}
        average_rating="5"
      /> */}
      {/* <ReviewDetails
        reviews={[
          {
            user_id: "String",
            user_name: "Ryan M",
            title: "Amazing and durable jacket",
            description:
              "It was a gift for a friend and she completely loved it and her warm and stylish she could wear it with almost everything that she has in her wardbode. She uses it for many things including hiking and put it through the test of actual outdoors being involved in her purchase. And whenever she doesnt use it for the outdoors she uses it casually, which is a great alternative for her because she likes it to be disverified in her closet.",
            rating: "5",
            useful_count: "4",
            not_useful_count: "0",
            created_at: "October 21, 2020",
          },
          {
            user_id: "String",
            user_name: "Ryan M",
            title: "Amazing and durable jacket",
            description:
              "It was a gift for a friend and she completely loved it and her warm and stylish she could wear it with almost everything that she has in her wardbode. She uses it for many things including hiking and put it through the test of actual outdoors being involved in her purchase. And whenever she doesnt use it for the outdoors she uses it casually, which is a great alternative for her because she likes it to be disverified in her closet.",
            rating: "3",
            useful_count: "4",
            not_useful_count: "0",
            created_at: "October 21, 2020",
          },
        ]}
      /> */}
      {/* <Footer /> */}
      {/* <Product /> */}
      {/* <CustomDropDown label="Sort by" /> */}
      {/* <OrderSummary
        data={{
          sub_amount: 200,
          total_amount: 200,
        }}
      /> */}
      {/* <DragDrop /> */}
    </div>
  );
}

// import { Button } from "@/components/Button";
// import { CheckBox } from "@/components/CheckBox";
// import { CustomInput } from "@/components/CustomInput";
// import { validateEmail } from "@/utils/helpers";
// import { Poppins } from "next/font/google";
// import { useRouter } from "next/router";
// import { useState } from "react";

// const fpopin = Poppins({
//   weight: ["400", "700"],
//   subsets: ["latin"],
// });

// const login = () => {
//   const [isCheck, setIsCheck] = useState<boolean>(false);
//   const [isValid, setIsValid] = useState<boolean>(false);
//   const [error, setError] = useState({ emailError: "", passwordError: "" });
//   const router = useRouter();

//   const handleChange = (e: any) => {
//     // router.push("/shop");
//     const { value, type } = e.target;

//     console.log(type, "============type");

//     if (type === "email") {
//       if (!validateEmail(value) && value.length > 0) {
//         setError((prev) => ({ ...prev, emailError: "Invalid Email" }));
//       } else {
//         setError((prev) => ({ ...prev, emailError: "" }));
//       }
//     } else if (type === "password") {
//       if (value.length < 6 && value.length > 0) {
//         setError((prev) => ({ ...prev, passwordError: "Password too short" }));
//       } else {
//         setError((prev) => ({ ...prev, passwordError: "" }));
//       }
//     }
//   };

//   const activeButton = () => {
//     // console.log("object");
//     // router.push("/shop");
//     // if (!error?.emailError && !error?.passwordError) {
//     //   console.log("test");
//     //   setIsValid(false);
//     // } else {
//     //   setIsValid(true);
//     // }
//   };

//   console.log(isValid, "=============isvlaid");

//   return (
//     <div className="flex flex-col justify-center items-center">
//       <div className="bg-white mt-[300px] w-[456px] min-h-[300px] mx-[438px] h-auto">
//         <div className="pl-[30.46px] pr-[28px]">
//           <div className="pt-[30px] font-primary font-semibold text-xxl leading-[30px] tracking-[-0.55px] text-textSecondary">
//             Welcome Back
//           </div>
//           <div className="pt-2 font-primary font-medium text-xxs leading-[26px] tracking-[-0.2px] text-[#A9ABBD]">
//             Login with email
//           </div>
//           <form>
//             <CustomInput
//               className="mt-[14px] py-[11.5px] pl-[16px] font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD]"
//               type="email"
//               name="email"
//               placeholder="Email"
//               isSearch={false}
//               onChange={handleChange}
//               max={0}
//               errorMessage={error?.emailError}
//               min={0}
//             />
//             <CustomInput
//               className="mt-[10px] py-[11.5px] pl-[16px] font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] !text-[#000000]"
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={handleChange}
//               isSearch={false}
//               max={0}
//               min={0}
//               errorMessage={error?.passwordError}
//             />
//             <div className="flex justify-between pt-[19px]">
//               <CheckBox
//                 text="Remember me"
//                 className="font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#979797]"
//                 checked={isCheck}
//                 onChange={() => setIsCheck((prev) => !prev)}
//               />
//               <div className="font-primary font-bold text-sm leading-[16.45px] tracking-[-0.3px] text-[#979797]">
//                 Forgot Password?
//               </div>
//             </div>

//             <Button
//               buttonName="Login"
//               disabled={isValid}
//               buttonClassName={`${fpopin.className} !font-medium text-sm leading-[21px] tracking-[-0.3px] py-[5px] px-[30px] bg-[#000000] !text-[#FFFFFF]`}
//               rootClassName="flex justify-center mt-[21px]"
//               onClick={activeButton}
//             />
//           </form>
//         </div>
//       </div>
//       <div
//         className="cursor-pointer mt-[14px] leading-[21px] tracking-[-0.3px]"
//         onClick={() => {}}
//       >
//         <div
//           className={` px-[156px] font-normal text-sm  text-[#A9ABBD] ${fpopin.className} `}
//         >
//           Or create an{" "}
//           <span
//             className={`${fpopin.className} font-bold text-sm text-[#A9ABBD]`}
//           >
//             account
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default login;
