import { FC } from "react";
interface ISteps {
  steps: string[];
  activeStepIndex: number;
  rootClassName?: string;
  onClickStep?: (index: number) => void;
}
export const Steps: FC<ISteps> = ({
  steps,
  activeStepIndex,
  rootClassName,
  onClickStep,
}) => {
  return (
    <div className={"flex w-full " + rootClassName}>
      {steps.map((step, index) => (
        <div
          key={index}
          className="w-full flex items-center"
          onClick={() => onClickStep?.(index)}
        >
          <div
            className={`flex items-center justify-center font-primary ${
              index === activeStepIndex ? "font-bold" : "font-normal"
            } text-borderColor text-lg leading-[28px] tracking-[-0.4px]`}
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
