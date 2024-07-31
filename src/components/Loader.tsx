import Image from "next/image";
import loader from "../../public/images/loader.svg";
interface ILoader {
  className?: string;
}
export const Loader = ({ className }: ILoader) => {
  return <Image src={loader} alt="loading" className={className} />;
};
