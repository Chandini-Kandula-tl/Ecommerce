import AuthProvider from "@/components/authenticator";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import CartContextProvider from "@/context/productContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { createContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppContext = createContext<any>(null);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showHeader = router.pathname === "/shop";
  const path = router.pathname;
  const paths = [
    "/login",
    "/forgot-password",
    "/reset-password",
    "/registration",
    "/order-placed",
  ];
  const showNavBar = !paths.some((item) => path.startsWith(item));
  const showFooter = router.pathname === "/home";
  return (
    <div className="bg-[#EFF2F6] h-[100vh]">
      <AuthProvider>
        <CartContextProvider>
          {/* <AppContext.Provider value={{ productDetails, setProductDetails }}> */}
          {showNavBar && <NavBar />}
          {showHeader && <Header />}
          <ToastContainer />
          <div className={"h-max bg-[#EFF2F6] px-[7%] pt-[43px] pb-12"}>
            <Component {...pageProps} />
            {showFooter && <Footer />}
          </div>
        </CartContextProvider>
      </AuthProvider>
      {/* </AppContext.Provider> */}
    </div>
  );
}
