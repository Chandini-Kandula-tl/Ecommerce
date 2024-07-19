import { Review } from "@/components/Review";
import { ReviewDetails } from "@/components/ReviewDetails";

const reviewScreen = () => {
  return (
    <div className="mt-[51px] flex gap-[100px]">
      <Review
        ratings_count={{
          "5 stars": 5,
          "4 stars": 1,
          "3 stars": 0,
          "2 stars": 0,
          "1 stars": 0,
        }}
        average_rating="5"
      />
      <div className="mt-[100px] flex-1">
        <ReviewDetails
          reviews={[
            {
              user_id: "String",
              user_name: "Ryan M",
              title: "Amazing and durable jacket",
              description:
                "It was a gift for a friend and she completely loved it and her warm and stylish she could wear it with almost everything that she has in her wardbode. She uses it for many things including hiking and put it through the test of actual outdoors being involved in her purchase. And whenever she doesnt use it for the outdoors she uses it casually, which is a great alternative for her because she likes it to be disverified in her closet.",
              rating: "5",
              useful_count: "4",
              not_useful_count: "0",
              created_at: "October 21, 2020",
            },
            {
              user_id: "String",
              user_name: "Ryan M",
              title: "Amazing and durable jacket",
              description:
                "It was a gift for a friend and she completely loved it and her warm and stylish she could wear it with almost everything that she has in her wardbode. She uses it for many things including hiking and put it through the test of actual outdoors being involved in her purchase. And whenever she doesnt use it for the outdoors she uses it casually, which is a great alternative for her because she likes it to be disverified in her closet.",
              rating: "3",
              useful_count: "4",
              not_useful_count: "0",
              created_at: "October 21, 2020",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default reviewScreen;
