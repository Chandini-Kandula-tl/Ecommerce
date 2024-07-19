import Image from "next/image";
import { FC } from "react";
import star from "../../public/images/star.svg";
interface IReview {
  ratings_count: {
    [key: string]: number;
  };
  average_rating: string;
}
export const Review: FC<IReview> = ({ ratings_count, average_rating }) => {
  const renderList = (n: string) => {
    let num = parseInt(n);
    const stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(<Image src={star} alt="not found" />);
    }
    return stars;
  };

  return (
    <div>
      <div className="font-primary font-semibold text-[36px] leading-[44px] tracking-[-1.5px] text-borderColor mb-[44px]">
        Reviews
      </div>
      <div className="flex text-borderColor mb-[22px]">
        {renderList(average_rating)}
      </div>
      <div className="flex flex-col font-primary font-semibold text-[24px] leading-[28.2px] tracking-[-0.6px] mb-[29px]">
        5 reviews
      </div>
      {Object.entries(ratings_count).map(([key, value]) => (
        <div
          key={key}
          className="flex items-center font-primary font-semibold text-lg leading-[19.98px] tracking-[-0.6px] text-borderColor mb-4"
        >
          {key}
          <div className="border text-borderButton ml-[12.68px] mr-[12px] w-[92.32px]"></div>
          ({value})
        </div>
      ))}
    </div>
  );
};

{
  /* {data.map((item, index) => (
        Object.entries(item).map(([key, value]) => (
          <div key={index} className='flex items-center font-primary font-semibold text-lg leading-[19.98px] tracking-[-0.6px] text-borderColor mb-4'>
            {key} 
            <div className='border text-borderButton ml-[12.68px] mr-[12px] w-[92.32px]' ></div>
            ({value})
          </div>
        ))
      ))} */
}
