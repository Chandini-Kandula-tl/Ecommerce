import { useTotalContext } from "@/context/productContext";
import { IUserData } from "@/utils/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import bag from "../../public/images/bag.svg";
import DropDown from "./DropDown";
const specialRoutes = [
  "/add-products",
  "/admin-home-screen",
  "/admin-product-list",
  "/edit-product",
  "/order-summary",
];
export const NavBar = () => {
  const router = useRouter();
  const { state } = useTotalContext();
  const path = router.pathname;
  const isActiveShop = path.startsWith("/shop");
  const isSpecialRoute = specialRoutes.includes(path);
  const [userData, setUserData] = useState<IUserData | null>(null);
  // const userData = JSON.parse(localStorage?.getItem("userData") ?? "");
  // const userName = userData?.full_name;

  useEffect(() => {
    const storedData = localStorage?.getItem("userData");
    if (storedData) {
      const userInfo = JSON.parse(storedData);
      setUserData(userInfo);
    }
  }, []);

  const handleBagClick = () => {
    router.push("/cart");
  };

  return (
    <div className="flex justify-between bg-borderColor fixed w-[100%] top-0 z-50 h-[60px] px-[7%]">
      <div className="flex items-center">
        {!isSpecialRoute && (
          <div className="flex items-center">
            <Link
              className={`font-secondary ${
                path === "/home" ? "font-bold" : "font-normal"
              } text-[20px] leading-[24.2px] tracking-[-0.6px] mr-8 text-navFont`}
              href="/home"
            >
              Ecommerce
            </Link>
            <Link
              className={`font-secondary ${
                isActiveShop ? "font-bold" : "font-normal"
              } text-lg leading-[20.57px] tracking-[-0.6px] mr-8  text-navFont`}
              href="/shop"
            >
              Shop
            </Link>
            <Link
              className={`font-secondary ${
                path === "/stories" ? "font-bold" : "font-normal"
              } text-lg leading-[20.57px] tracking-[-0.6px] mr-8  text-navFont`}
              href="/stories"
            >
              Stories
            </Link>
            <Link
              className={`font-secondary ${
                path === "/about" ? "font-bold" : "font-normal"
              } text-lg leading-[20.57px] tracking-[-0.6px] mr-8  text-navFont`}
              href="/about"
            >
              About
            </Link>
            {/* <SearchBar
              placeholder="Search"
              src={searchIcon}
              className2="bg-black text-white"
            /> */}
          </div>
        )}
      </div>
      <div className="flex items-center">
        {!isSpecialRoute && (
          <div className="flex items-cen">
            <Link href="/cart">
              <Image
                src={bag}
                alt="image not found"
                className="text-borderColor"
                onClick={handleBagClick}
              />
            </Link>
            <div className="font-secondary font-normal text-lg leading-[20.57px] tracking-[-0.6px]  text-navFont ml-[7.72px]">
              {state.cart.cartCount}
            </div>
          </div>
        )}

        <DropDown
          label={userData?.full_name ?? "Login"}
          options={["Sign out"]}
          // options={[{option : Sign Out, path : login}]}
        />
      </div>
    </div>
  );
};
