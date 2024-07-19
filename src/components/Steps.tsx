import { useRouter } from "next/router";
import { FC } from "react";
interface ISteps {
  //   steps: string[];
  selectedStep: string;
  rootClassName?: string;
}
export const Steps: FC<ISteps> = ({ selectedStep, rootClassName }) => {
  const steps = ["Address", "Shipping", "Payment"];
  const router = useRouter();
  return (
    <div className={"flex w-full " + rootClassName}>
      {steps.map((step, index) => (
        <div key={index} className="w-full flex items-center">
          <div
            className={`flex items-center justify-center font-primary ${
              step === selectedStep ? "font-bold" : "font-normal"
            } text-borderColor text-lg leading-[28px] tracking-[-0.4px] cursor-pointer`}
            onClick={() => router.push(`/${step.toLowerCase()}`)}
          >
            {step}
          </div>
          {index < steps.length - 1 && (
            <div className="flex-grow mx-[14px]">
              <div className="border-t border-borderColor w-full"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
