import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
const authRoutes = [
  "/login",
  "/forgot-password",
  "/reset-password",
  "/registration",
];
const Auth = createContext<any>(null);
interface AuthProps {
  children: ReactNode;
}
export default function AuthProvider({ children }: AuthProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authToken, setAuthToken] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("accessToken") ?? "";
    if (token) {
      setAuthToken(token);
    }
    const currentPath = router.pathname;
    console.log({ currentPath });
    if (!authToken && !authRoutes.includes(currentPath)) {
      console.log("if");
      router.push("/login");
      setIsLoading(true);
    } else if (authToken && authRoutes.includes(currentPath)) {
      console.log(currentPath);
      console.log("else if");
      router.push("/home");
    } else {
      console.log("else");
      return;
    }
    setIsLoading(false);
  }, [router]);

  //   if (!authToken) return;
  return <Auth.Provider value={{}}>{children}</Auth.Provider>;
}
