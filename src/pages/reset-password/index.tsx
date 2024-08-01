import { patchApi } from "@/api-client/methods";
import { Button } from "@/components/Button";
import { CustomInput } from "@/components/CustomInput";
import { validatePassword } from "@/utils/helpers";
import { IResetPasswordData } from "@/utils/interfaces";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const fpopin = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const resetPassword = () => {
  const router = useRouter();
  const [input, setInput] = useState<IResetPasswordData>({
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState({
    passwordError: "",
    confirmPasswordError: "",
  });
  const [isValid, setIsValid] = useState<boolean>(false);
  const { id } = router.query;

  const validateForm = () => {
    const passwordValid = validatePassword(input.password);
    const confirmPasswordValid = validatePassword(input.confirmPassword);
    const passwordsMatch = input.password === input.confirmPassword;

    if (passwordValid && confirmPasswordValid && passwordsMatch) {
      setIsValid(true);
      console.log(input);
      console.log("true");
    } else {
      setIsValid(false);
      console.log("false");
    }
  };

  const handleButton = async (e: any) => {
    console.log(id);
    e.preventDefault();
    setLoader(true);
    try {
      const apiData = await patchApi({
        endUrl: "reset-password",
        data: { user_id: id, otp: input.otp, new_password: input.password },
      });
      if (apiData) {
        const { status, message } = apiData;
        if (status) {
          toast.success(message);
          router.push("/login");
        } else {
          toast.error(message);
        }
      }
    } catch (message) {
    } finally {
      setLoader(false);
    }
    if (!isValid) return;
    const data = {
      user_id: id,
      otp: input.otp,
      new_password: input.password,
    };
  };

  const handleInput = (
    name: string,
    valid: boolean,
    value: string,
    errorMessage: string
  ) => {
    setInput((prev) => ({ ...prev, [name]: valid ? value : "" }));
    setError((prev) => ({
      ...prev,
      [`${name}Error`]: valid ? "" : errorMessage,
    }));
  };

  useEffect(() => {
    validateForm();
  }, [input]);

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="bg-[#FFFFFF] w-[40%] py-[30px] px-[29px]">
        <div className="font-primary font-medium text-xxs leading-[26px] tracking-[-0.2px] text-[#A9ABBD] pl-[1px]">
          Reset Password
        </div>
        <form onSubmit={handleButton}>
          <CustomInput
            className="mt-[27px] pl-4 font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD]"
            type="number"
            name="otp"
            placeholder="Enter OTP"
            isValid={({ valid, value, name }) =>
              handleInput(name, valid, value, "Invalid OTP")
            }
            max={6}
            min={6}
            required={true}
          />
          <CustomInput
            className="mt-[10px] pl-4 font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD]"
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
            errorMessage={error?.passwordError}
            max={0}
            min={0}
            required={true}
          />
          <CustomInput
            className="mt-[10px] pl-4 font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD]"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            isValid={({ valid, value, name }) =>
              handleInput(name, valid, value, "Passwords do not match")
            }
            errorMessage={error?.confirmPasswordError}
            max={0}
            min={0}
            required={true}
          />
          <Button
            type="submit"
            buttonName="Reset Password"
            buttonClassName={
              `${fpopin.className} font-medium text-sm leading-[21px] tracking-[-0.3px] !text-[#FFFFFF] py-[5px] px-[11px] ` +
              (!isValid ? "bg-gray-500 cursor-not-allowed" : "bg-[#000000]")
            }
            rootClassName="mt-5 flex items-center justify-center"
            disabled={!isValid}
            isLoading={loader}
          />
        </form>
      </div>
    </div>
  );
};

export default resetPassword;
