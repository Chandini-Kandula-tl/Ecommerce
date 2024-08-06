import { postApi } from "@/api-client/methods";
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

const ForgotPassword = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ email: string }>({ email: "" });
  const [error, setError] = useState({ emailError: "" });
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();

  const validateForm = () => {
    if (!error.emailError.length && formData.email.length) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    try {
      if (!isValid) return;
      const data = {
        email: formData.email,
      };
      const apiData = await postApi({
        endUrl: "generate-otp",
        data,
      });
      if (apiData) {
        toast.success(apiData?.message);
      } else {
        toast.error("Error");
      }
    } catch (message: any) {
      toast.error(message?.message);
    } finally {
      setLoader(false);
    }
  };

  const handleInput = (
    name: string,
    valid: boolean,
    value: string,
    errorMessage: string
  ) => {
    setFormData((prev) => ({ ...prev, [name]: valid ? value : "" }));
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
      <div className="bg-[#FFFFFF] px-[29px] py-[30px] w-[40%]">
        <div className="pl-[1px] font-primary font-medium text-xxs leading-[26px] tracking-[-0.2px] text-[#A9ABBD]">
          Forgot Password
        </div>
        <div className="pt-[12px] font-primary font-medium text-xxs leading-[26px] tracking-[-0.2px] text-[#979797]">
          Please enter your registered email address where we’ll send you an OTP
          to reset password
        </div>
        <form onSubmit={handleSubmit}>
          <CustomInput
            className="pl-4 mt-[11px]"
            placeholder="Email"
            type="email"
            name="email"
            isValid={({ valid, value, name }) =>
              handleInput(name, valid, value, "Invalid Email")
            }
            errorMessage={error?.emailError}
            max={0}
            min={0}
            required={true}
          />
          <Button
            type="submit"
            buttonName="Send OTP"
            buttonClassName={
              `bg-[#000000] !text-[#FFFFFF] py-[5px] px-[17px] mt-5 font-medium text-sm leading-[21px] tracking-[-0.3px] ${fpopin.className} ` +
              (!isValid ? "bg-gray-500 cursor-not-allowed" : "bg-[#000000]")
            }
            disabled={!isValid}
            rootClassName="flex items-center justify-center"
            isLoading={loader}
          />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
