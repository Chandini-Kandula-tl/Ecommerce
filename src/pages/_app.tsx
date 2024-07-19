import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import "@/styles/globals.css";
import { IProductDetails } from "@/utils/interfaces";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { createContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppContext = createContext<any>(null);

export default function App({ Component, pageProps }: AppProps) {
  const [productDetails, setProductDetails] = useState<IProductDetails>({
    product_id: "",
    product_name: "",
    images: "",
    available_sizes: [],
    available_colours: [],
    price: 0,
    category: "",
    rating: 0,
  });
  const router = useRouter();
  const showHeader = router.pathname === "/shop";
  const path = router.pathname;
  const paths = [
    "/login",
    "/forgot-password",
    "/reset-password",
    "/registration",
  ];
  const showNavBar = !paths.some((item) => path.startsWith(item));
  const showFooter = router.pathname === "/home";
  return (
    <div className="bg-[#EFF2F6] h-[100vh]">
      <AppContext.Provider value={{ productDetails, setProductDetails }}>
        {showNavBar && <NavBar />}
        {showHeader && <Header />}
        <ToastContainer />
        <div className={"h-max bg-[#EFF2F6] px-[7%] pt-[43px]"}>
          <Component {...pageProps} />
          {showFooter && <Footer />}
        </div>
      </AppContext.Provider>
    </div>
  );
}
