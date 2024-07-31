import { postApi } from "@/api-client/methods";
import { Button } from "@/components/Button";
import { CustomInput } from "@/components/CustomInput";
import { IAuthData, IUserData } from "@/utils/interfaces";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const fpopin = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const login = () => {
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [formData, setFormData] = useState<IAuthData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState({ emailError: "", passwordError: "" });
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();

  const validateForm = () => {
    if (
      !(error?.emailError?.length || error?.passwordError?.length) &&
      formData.email?.length &&
      formData.password?.length
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await postApi<IUserData>({
        endUrl: "login",
        data: formData,
      });

      console.log({ response });

      if (response) {
        const { status, message, data } = response;
        if (status) {
          localStorage.setItem("userData", JSON.stringify(data));
          let accessToken = response?.data?.accessToken;
          let refreshToken = response?.data?.refreshToken;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          const userData = JSON.parse(localStorage.getItem("userData") ?? "");
          if (data?.role === "customer") {
            toast.success("Login Successful");
            router.push("/home");
          } else {
            toast.success("Admin login success");
            router.push("/admin-home-screen");
          }
        } else {
          toast.error(message);
        }
      }
    } catch (message) {
    } finally {
      setLoader(false);
    }
  };

  const handleCheck = () => {
    setIsCheck((prev) => !prev);
  };

  const handleInput = (
    name: string,
    valid: boolean,
    value: string,
    errorMessage: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: valid ? value : "",
    }));
    setError((prev) => ({
      ...prev,
      [`${name}Error`]: valid || !value.length ? "" : errorMessage,
    }));
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="w-[40%] h-auto">
        <div className="pl-[30.46px] bg-white pr-[28px] pb-[15px]">
          <div className="pt-[30px] font-primary font-semibold text-xxl leading-[30px] tracking-[-0.55px] text-textSecondary">
            Welcome Back
          </div>
          <div className="pt-2 font-primary font-medium text-xxs leading-[26px] tracking-[-0.2px] text-[#A9ABBD]">
            Login with email
          </div>
          <form onSubmit={handleSubmit}>
            <CustomInput
              className="mt-[14px] py-[11.5px] pl-[16px] font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD]"
              type="email"
              name="email"
              placeholder="Email"
              isValid={({ valid, value, name }) =>
                handleInput(name, valid, value, "Invalid Email")
              }
              max={0}
              errorMessage={error?.emailError}
              min={0}
              required={true}
            />
            <CustomInput
              className="mt-[10px] py-[11.5px] pl-[16px] font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] !text-[#000000]"
              type="password"
              name="password"
              placeholder="Password"
              isValid={({ valid, value, name }) =>
                handleInput(
                  name,
                  valid,
                  value,
                  "Password must be 8-12 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
                )
              }
              max={0}
              min={0}
              errorMessage={error?.passwordError}
              required={true}
            />
            <div className="flex justify-between pt-[19px]">
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  checked={isCheck}
                  className="font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#979797]"
                  onChange={() => handleCheck()}
                  id="remember me"
                />
                <label className="font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#979797]">
                  Remember me
                </label>
              </div>
              <div
                className="font-primary font-bold text-sm leading-[16.45px] tracking-[-0.3px] text-[#979797] cursor-pointer"
                onClick={() => router.push("/forgot-password")}
              >
                Forgot Password?
              </div>
            </div>
            <Button
              buttonName="Login"
              type="submit"
              disabled={!isValid}
              buttonClassName={
                `${fpopin.className} !font-medium text-sm leading-[21px] tracking-[-0.3px] py-[5px] px-[30px] !text-[#FFFFFF] ` +
                (!isValid ? "bg-gray-500 cursor-not-allowed" : "bg-[#000000]")
              }
              rootClassName="flex justify-center mt-[21px]"
              isLoading={loader}
            />
          </form>
        </div>
        <div
          className="cursor-pointer mt-[14px] leading-[21px] tracking-[-0.3px] flex justify-center"
          onClick={() => router.push("/registration")}
        >
          <div
            className={` px-[156px] font-normal text-sm  text-[#A9ABBD] ${fpopin.className} `}
          >
            Or create an{" "}
            <span
              className={`${fpopin.className} font-bold text-sm text-[#A9ABBD]`}
            >
              account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
