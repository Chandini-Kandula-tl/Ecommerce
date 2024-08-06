import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";

const Auth = createContext<any>(null);

interface AuthProps {
  children: ReactNode;
}

const authRoutes = [
  "/login",
  "/forgot-password",
  "/reset-password",
  "/registration",
];

const adminRoutes = [
  "/add-products",
  "/admin-home-screen",
  "/admin-product-list",
  "/edit-product",
  "/order-summary",
];

export default function AuthProvider({ children }: AuthProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const handleAuthCheck = () => {
      const pathName = router.pathname;
      const accessToken = localStorage.getItem("accessToken");
      const role = localStorage.getItem("role");
      if (!accessToken) {
        if (!authRoutes.some((route) => pathName.startsWith(route))) {
          // access token is not there and if pathname doesn't starts with auth routes then push to login page
          router.push("/login");
        }
      } else {
        if (
          authRoutes.some((route) => pathName.startsWith(route)) &&
          role !== "admin"
        ) {
          // access token is there and if pathname starts with auth route and role is not an admin then push to home page
          router.push("/home");
        } else if (role === "admin") {
          if (!adminRoutes.some((route) => pathName.startsWith(route))) {
            // if role is admin and path name doesn't starts with admin route then push to admin home screen
            router.push("/admin-home-screen");
          }
        } else if (
          adminRoutes.some((route) => pathName.startsWith(route)) &&
          role !== "admin"
        ) {
          // user is trying to access an admin route
          router.push("/home");
        }
      }
    };

    if (router?.isReady) {
      // ensures that the router object is fully loaded and ready to be used.
      handleAuthCheck();
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <></>;
  }

  return <Auth.Provider value={{}}>{children}</Auth.Provider>;
}
