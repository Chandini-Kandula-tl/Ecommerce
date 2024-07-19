import { postApi } from "@/apiClient/methods";
import { Button } from "@/components/Button";
import { CustomInput } from "@/components/CustomInput";
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
  const [input, setInput] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [error, setError] = useState({ emailError: "", passwordError: "" });
  const router = useRouter();

  useEffect(() => {
    validateForm();
  }, [input]);

  const validateForm = () => {
    if (
      !(error?.emailError?.length || error?.passwordError?.length) &&
      input.email?.length &&
      input.password?.length
    ) {
      setIsValid(true);
      console.log("true");
    } else {
      setIsValid(false);
      console.log("false");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await postApi({
        endUrl: "login",
        data: input,
      });
      console.log(response, "before check");
      if (response) {
        const { status, message, data } = response;
        localStorage.setItem("userData", JSON.stringify(data));
        const userData = JSON.parse(localStorage?.getItem("userData") ?? "");
        if (status) {
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
      console.log("button CLicked");
      console.log(response, "response");
      const accessToken = response?.data?.accessToken;
      localStorage.setItem("accessToken", accessToken);
    } catch (message) {}
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
    setInput((prev) => ({
      ...prev,
      [name]: valid ? value : "",
    }));
    setError((prev) => ({
      ...prev,
      [`${name}Error`]: valid || !value.length ? "" : errorMessage,
    }));
  };

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
                handleInput(name, valid, value, "Invalid Password")
              }
              max={0}
              min={0}
              errorMessage={error?.passwordError}
              required={true}
            />
            <div className="flex justify-between pt-[19px]">
              {/* <CheckBox
                text="Remember me"
                className="font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#979797]"
                checked={isCheck}
                onChange={() => handleCheck()}
              /> */}
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
