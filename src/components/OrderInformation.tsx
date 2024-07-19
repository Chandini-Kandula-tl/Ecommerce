import { FC } from "react";
import { Collapse } from "./Collapse";

interface IOrderInformation {
  data: IData[];
  rootClassName?: string;
  mainTitle?: string;
}

interface IData {
  title: string;
  content: string;
}

export const OrderInformation: FC<IOrderInformation> = ({
  data,
  rootClassName,
  mainTitle,
}) => {
  return (
    <div className={rootClassName}>
      <div className="font-primary font-semibold text-xxl leading-[30px] tracking-[-0.55px] mb-[15px]">
        {mainTitle}
      </div>
      <div className="border border-borderColor"></div>
      <Collapse data={data} />
    </div>
  );
};
