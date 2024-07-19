import { Button } from "@/components/Button";
import { CustomInput } from "@/components/CustomInput";
import { validatePassword } from "@/utils/helpers";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";

const fpopin = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const resetPassword = () => {
  const [input, setInput] = useState<{
    otp: string;
    password: string;
    confirmPassword: string;
  }>({ otp: "", password: "", confirmPassword: "" });

  const [error, setError] = useState({
    passwordError: "",
    confirmPasswordError: "",
  });

  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    validateForm();
  }, [input]);

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
  const handleButton = () => {
    if (!isValid) return;
    const data = {
      email: "",
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
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="bg-[#FFFFFF] w-[40%] py-[30px] px-[29px]">
        <div className="font-primary font-medium text-xxs leading-[26px] tracking-[-0.2px] text-[#A9ABBD] pl-[1px]">
          Reset Password
        </div>
        <form onSubmit={() => handleButton()}>
          <CustomInput
            className="mt-[27px] pl-4 font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD]"
            type="number"
            name="otp"
            placeholder="Enter OTP"
            isValid={({ valid, value, name }) =>
              handleInput(name, valid, value, "Invalid OTP")
            }
            max={0}
            min={0}
            required={true}
          />
          <CustomInput
            className="mt-[10px] pl-4 font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD]"
            type="password"
            name="password"
            placeholder="Password"
            isValid={({ valid, value, name }) =>
              handleInput(name, valid, value, "Invalid Password")
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
          />
        </form>
      </div>
    </div>
  );
};

export default resetPassword;
