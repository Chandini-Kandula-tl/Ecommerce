import { postApi } from "@/api-client/methods";
import { Button } from "@/components/Button";
import { CustomInput } from "@/components/CustomInput";
import { validateEmail, validatePassword } from "@/utils/helpers";
import { IRegistrationData } from "@/utils/interfaces";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const fpopin = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});
interface IError {
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
}

const registration = () => {
  const router = useRouter();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [formData, setFormData] = useState<IRegistrationData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<IError>({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const validateForm = () => {
    const emailValid = validateEmail(formData.email);
    const passwordValid = validatePassword(formData.password);
    const confirmPasswordValid = validatePassword(formData.confirmPassword);
    const passwordsMatch = formData.password === formData.confirmPassword;

    setError({
      emailError: emailValid ? "" : "Invalid Email",
      passwordError: passwordValid
        ? ""
        : "Password must be 8-12 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
      confirmPasswordError: passwordsMatch ? "" : "Passwords do not match",
    });

    if (emailValid && passwordValid && confirmPasswordValid && passwordsMatch) {
      setIsValid(true);
    } else {
      setIsValid(false);
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
      [`${name}Error`]: valid ? "" : errorMessage,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    try {
      const data = await postApi({
        endUrl: "user/create-user",
        data: {
          full_name: formData.name,
          email: formData.email,
          password: formData.password,
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
    } catch (message) {
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

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

            <Button
              type="submit"
              rootClassName="flex justify-center mt-4"
              buttonClassName={
                `px-[19px] py-[5px] bg-[#000000] !text-[#FFFFFF] ${fpopin.className} ` +
                (!isValid ? "bg-gray-500 cursor-not-allowed" : "bg-[#000000]")
              }
              buttonName="Sign Up"
              disabled={!isValid}
              isLoading={loader}
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
