import { postApi } from "@/apiClient/methods";
import { Button } from "@/components/Button";
import { CustomInput } from "@/components/CustomInput";
import { validateEmail, validatePassword } from "@/utils/helpers";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const fpopin = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const registration = () => {
  const router = useRouter();
  const [isCheck, setIsCheck] = useState(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [input, setInput] = useState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState<{
    emailError: string;
    passwordError: string;
    confirmPasswordError: string;
  }>({ emailError: "", passwordError: "", confirmPasswordError: "" });

  useEffect(() => {
    validateForm();
  }, [input]);

  const validateForm = () => {
    const emailValid = validateEmail(input.email);
    const passwordValid = validatePassword(input.password);
    const confirmPasswordValid = validatePassword(input.confirmPassword);
    const passwordsMatch = input.password === input.confirmPassword;

    setError({
      emailError: emailValid ? "" : "Invalid Email",
      passwordError: passwordValid ? "" : "Invalid Password",
      confirmPasswordError: passwordsMatch ? "" : "Passwords do not match",
    });

    if (emailValid && passwordValid && confirmPasswordValid && passwordsMatch) {
      setIsValid(true);
      console.log("true");
    } else {
      setIsValid(false);
      console.log("false");
    }
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

  const handleCheck = () => {
    setIsCheck((prev) => !prev);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await postApi({
        endUrl: "user/create-user",
        data: {
          full_name: input.name,
          email: input.email,
          password: input.password,
        },
      });
      if (data) {
        const { status, message } = data;
        if (status && message !== "User already exist") {
          toast.success(message);
          router.push("/login");
        } else {
          toast.error(message);
        }
      }
    } catch (message) {}
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="w-[40%]">
        <div className="bg-[#FFFFFF] px-[29px] pb-[35px] pt-[30px]">
          <div className="pl-[1px]  font-sans font-medium text-xxs leading-[26px] tracking-[-0.2px] text-[#A9ABBD]">
            Create an account
          </div>
          <form onSubmit={handleSubmit}>
            <CustomInput
              className="mt-4 pl-[16px] py-[11.5px] font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD]"
              placeholder="Name"
              type="text"
              name="name"
              isValid={({ valid, value, name }) =>
                handleInput(name, valid, value, "Invalid Name")
              }
              max={0}
              min={5}
              required={true}
            />
            <CustomInput
              className="mt-[10px] pl-4 py-[11.5px] font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD]"
              type="email"
              name="email"
              placeholder="Email"
              isValid={({ valid, value, name }) =>
                handleInput(name, valid, value, "Invalid Email")
              }
              errorMessage={error?.emailError}
              max={0}
              min={0}
              required={true}
            />
            <CustomInput
              className="mt-[10px] pl-4 py-[11.5px] font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD]"
              type="password"
              name="password"
              placeholder="Password"
              isValid={({ name, valid, value }) =>
                handleInput(name, valid, value, "Invalid Password")
              }
              errorMessage={error?.passwordError}
              max={0}
              min={0}
              required={true}
            />
            <CustomInput
              className="mt-[10px] pl-4 py-[11.5px] font-primary font-normal text-sm leading-[16.45px] tracking-[-0.3px] text-[#A9ABBD]"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              isValid={({ name, valid, value }) =>
                handleInput(name, valid, value, "Passwords do not match")
              }
              errorMessage={error?.confirmPasswordError}
              max={0}
              min={0}
              required={true}
            />
            <div className="flex gap-1 mt-4">
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
            <Button
              type="submit"
              rootClassName="flex justify-center mt-4"
              buttonClassName={
                `px-[19px] py-[5px] bg-[#000000] !text-[#FFFFFF] ${fpopin.className} ` +
                (!isValid ? "bg-gray-500 cursor-not-allowed" : "bg-[#000000]")
              }
              buttonName="Sign Up"
              disabled={!isValid}
            />
          </form>
        </div>
        <div
          className="mt-[14px] flex cursor-pointer justify-center"
          onClick={() => router.push("/login")}
        >
          <div
            className={`${fpopin.className} font-medium  text-sm leading-[21px] tracking-[-0.3px] text-[#A9ABBD]`}
          >
            Already have an account. &nbsp;
            <span className="{`${fpopin.className} border-none underline font-semibold text-sm leading-[21px] tracking-[-0.3px] text-[#A9ABBD]`}">
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default registration;

// const { email, password, confirmPassword } = input;
//     const { emailError, passwordError, confirmPasswordError } = error;

//     if (
//       !emailError &&
//       !passwordError &&
//       !confirmPasswordError &&
//       email.length > 0 &&
//       password.length > 0 &&
//       confirmPassword.length > 0 &&
//       password === confirmPassword
//     ) {
//       setIsValid(true);
//       console.log("true");
//     } else {
//       setIsValid(false);
//       console.log("false");
//     }
