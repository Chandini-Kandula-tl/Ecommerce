import { IUserData } from "@/utils/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import searchIcon from "../../public/images/Search White.svg";
import bag from "../../public/images/bag.svg";
import DropDown from "./DropDown";
import { SearchBar } from "./SearchBar";
export const NavBar = () => {
  const router = useRouter();
  const path = router.pathname;
  const isActiveShop = path.startsWith("/shop");
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

  return (
    <div className="flex justify-between bg-borderColor fixed w-[100%] top-0 z-50 h-[60px] px-[7%]">
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
        <SearchBar
          placeholder="Search"
          src={searchIcon}
          className2="bg-black text-white"
        />
      </div>
      <div className="flex items-center">
        <Link href="">
          <Image src={bag} alt="image not found" className="text-borderColor" />
        </Link>
        <div className="font-secondary font-normal text-lg leading-[20.57px] tracking-[-0.6px]  text-navFont ml-[7.72px]">
          3
        </div>
        <DropDown
          label={userData?.full_name ?? "Login"}
          options={["Sign out"]}
        />
      </div>
    </div>
  );
};

// "data": {
//         "role": "customer",
//         "email": "chandinik488@gmail.com",
//         "full_name": "chandiniK",
//         "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNGQ0OTZlNjItOGNkNS00ZjM5LWE2NzgtNWY0NDA5ZTFkNTU2IiwiaWF0IjoxNzIxMTMyNDExLCJleHAiOjE3MjExMzYwMTF9.f06f98aCVDECBPTpK27AaDDnXNl-MDZEddK_PJZs1E4",
//         "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNGQ0OTZlNjItOGNkNS00ZjM5LWE2NzgtNWY0NDA5ZTFkNTU2IiwiaWF0IjoxNzIxMTMyNDExLCJleHAiOjE3MjM3MjQ0MTF9.AxmDWuMh5bi5KB79LZy5ZNaC8xTQ3nadiFO0GdoCG9s"
//     }
