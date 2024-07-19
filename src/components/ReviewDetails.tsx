import Image from "next/image";
import { FC } from "react";
import star from "../../public/images/star.svg";
interface Review {
  user_id: string;
  user_name: string;
  title: string;
  description: string;
  rating: string;
  useful_count: string;
  not_useful_count: string;
  created_at: string;
}

interface IReviewDetailsProps {
  reviews: Review[];
}

export const ReviewDetails: FC<IReviewDetailsProps> = ({ reviews }) => {
  const renderList = (n: string) => {
    let num = Number(n);
    const stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(<Image src={star} alt="not found" />);
    }
    return stars;
  };

  // const reviews = [
  //   {
  //     user_id: "String",
  //     user_name: "Ryan M",
  //     title: "Amazing and durable jacket",
  //     description:
  //       "It was a gift for a friend and she completely loved it and her warm and stylish she could wear it with almost everything that she has in her wardbode. She uses it for many things including hiking and put it through the test of actual outdoors being involved in her purchase. And whenever she doesnt use it for the outdoors she uses it casually, which is a great alternative for her because she likes it to be disverified in her closet.",
  //     rating: "5",
  //     useful_count: "4",
  //     not_useful_count: "0",
  //     created_at: "October 21, 2020",
  //   },
  //   {
  //     user_id: "String",
  //     user_name: "Ryan M",
  //     title: "Amazing and durable jacket",
  //     description:
  //       "It was a gift for a friend and she completely loved it and her warm and stylish she could wear it with almost everything that she has in her wardbode. She uses it for many things including hiking and put it through the test of actual outdoors being involved in her purchase. And whenever she doesnt use it for the outdoors she uses it casually, which is a great alternative for her because she likes it to be disverified in her closet.",
  //     rating: "3",
  //     useful_count: "4",
  //     not_useful_count: "0",
  //     created_at: "October 21, 2020",
  //   },
  // ];

  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index}>
          <div className="">
            <div className="flex justify-between mt-[39px] w-full">
              <div className="flex mb-[15px]">{renderList(review.rating)}</div>
              <div className="font-primary font-normal text-sm leading-5 tracking-[-0.4px] text-borderColor">
                {review.created_at}
              </div>
            </div>
            <div className="flex justify-between mb-[15px] font-primary">
              <div className="font-semibold text-xxl leading-[30px] tracking-[-0.55px]">
                {review.title}
              </div>
              <div className="font-bold text-sm leading-[20px] tracking-[-0.4px]">
                {review.user_name}
              </div>
            </div>
            <div className="font-primary font-medium text-xxs leading-[26px] tracking-[-0.2px] text-borderColor mb-[15px] max-w-[684px]">
              {review.description}
            </div>
            <div className="font-primary font-normal text-sm leading-5 tracking-[-0.4px] text-borderColor flex">
              <div className="mr-[15px]">
                Was this review helpful?Yes({review.useful_count})No(
                {review.not_useful_count})
              </div>
              <div className="w-[17px] border-r border-borderColor"></div>
              <div className="ml-[15px]">Flag as inapproriate</div>
            </div>
          </div>
        </div>
      ))}
    </div>
    // <div>
    //   <div className="flex justify-between">
    //     <div className="flex mb-[15px]">{renderList(5)}</div>
    //     <div className="font-primary font-normal text-sm leading-5 tracking-[-0.4px] text-borderColor">
    //       October 21, 2020
    //     </div>
    //   </div>
    //   <div className="flex justify-between mb-[15px] font-primary">
    //     <div className="font-semibold text-xxl leading-[30px] tracking-[-0.55px]">
    //       Amazing and durable jacket
    //     </div>
    //     <div className="font-bold text-sm leading-[20px] tracking-[-0.4px]">
    //       Ryan M
    //     </div>
    //   </div>
    //   <div className="font-primary font-medium text-xxs leading-[26px] tracking-[-0.2px] text-borderColor mb-[15px]">
    //     It was a gift for a friend and she completely loved it and her warm and
    //     stylish she could wear it
    //     <br />
    //     with almost everything that she has in her wardbode. She uses it for
    //     many things including
    //     <br />
    //     hiking and put it through the test of actual outdoors being involved in
    //     her purchase. And <br />
    //     whenever she doesnt use it for the outdoors she uses it casually, which
    //     is a great alternative <br />
    //     for her because she likes it to be disverified in her closet.
    //   </div>
    //   <div className="font-primary font-normal text-sm leading-5 tracking-[-0.4px] text-borderColor flex">
    //     <div className="mr-[15px]">Was this review helpful?Yes(4)No(0)</div>
    //     <div className="w-[17px] border-r border-borderColor"></div>
    //     <div className="ml-[15px]">Flag as inapproriate</div>
    //   </div>
    // </div>
  );
};
