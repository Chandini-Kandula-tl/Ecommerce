import { postApi } from "@/api-client/methods";
import { IUserData } from "@/utils/interfaces";
import { Button, Checkbox, Form, FormProps, Input } from "antd";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import useCookie, { getCookie } from "react-use-cookie";

const fpopin = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [userEmail, setUserEmail, removeUserEmail] = useCookie("email", "");
  const [userPassword, setUserPassword, removeUserPassword] = useCookie(
    "password",
    ""
  );

  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoader(true);
    let formData = { email: values.email, password: values.password };
    try {
      const response = await postApi<IUserData>({
        endUrl: "login",
        data: formData,
      });
      if (response) {
        const { status, message, data } = response;
        if (status) {
          localStorage.setItem("userData", JSON.stringify(data));
          let accessToken = response?.data?.accessToken;
          let refreshToken = response?.data?.refreshToken;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("role", data?.role);

          if (values?.remember) {
            setUserEmail(values?.email || "");
            setUserPassword(values?.password || "");
          } else {
            removeUserEmail();
            removeUserPassword();
          }

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
    } catch (message: any) {
      toast.error(message?.message);
    } finally {
      setLoader(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    setIsValid(false);
    console.log("Failed:", errorInfo);
  };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  // };

  const initialValues = {
    email: getCookie("email"),
    password: getCookie("password"),
    remember: getCookie("email") && getCookie("password"),
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
          <Form
            name="basic"
            initialValues={initialValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            onValuesChange={(changedValues, values) =>
              console.log({ changedValues, values })
            }
          >
            <Form.Item<FieldType>
              name="email"
              rules={[
                { required: true, message: "Invalid email" },
                {
                  type: "email",
                  message: "Invalid email",
                },
                () => ({
                  validator(rule, value, callBack) {
                    if (!value) {
                      return Promise.resolve();
                    }
                    if (
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/.test(
                        value
                      )
                    ) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("");
                    }
                  },
                }),
              ]}
              // initialValue={getCookie("email")}
            >
              <Input
                className="mt-[10px] py-[11.5px] font-primary font-normal text-sm leading-[16.45px] tracking-[-0.2px] border-[1px] border-black"
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                {
                  min: 8,
                  max: 12,
                  message: "Invalid Password",
                },
                () => ({
                  validator(rule, value, callBack) {
                    if (!value) {
                      return Promise.resolve();
                    }
                    if (
                      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&\-+=()]).{8,12}$/.test(
                        value
                      )
                    ) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("");
                    }
                  },
                }),
              ]}
              // initialValue={getCookie("password")}
            >
              <Input.Password
                className="py-[11.5px] font-primary font-normal text-sm leading-[16.45px] tracking-[-0.2px] border-[1px] border-black"
                placeholder="Password"
              />
            </Form.Item>

            <div className="flex justify-between">
              <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 0, span: 30 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <div
                className="text-[#979797] font-bold text-sm leading-[16.45px] tracking-[-0.3px] cursor-pointer"
                onClick={() => router.push("/forgot-password")}
              >
                Forgot Password?
              </div>
            </div>

            <Form.Item className="flex items-center justify-center">
              <Button
                type="primary"
                htmlType="submit"
                className="bg-black font-bold text-sm"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div
          className="cursor-pointer mt-[14px] leading-[21px] tracking-[-0.3px] flex justify-center text-[#A9ABBD] font-semibold text-[14px]"
          onClick={() => router.push("/registration")}
        >
          or create an account
        </div>
      </div>
    </div>
  );
};

export default Login;
