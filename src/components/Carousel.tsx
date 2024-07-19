import Image from "next/image";
import { FC, useState } from "react";
import arrow from "../../public/images/RightSide.svg";

interface ICarousel {
  slides: string[];
}

export const Carousel: FC<ICarousel> = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const nextSlide = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    }
  };

  return (
    <div className="relative h-[70vh]">
      <div className="flex h-full w-full">
        {slides?.map((slide, index) => (
          <div
            key={index}
            className={`h-full w-full bg-black  ${
              index === current ? "block" : "hidden"
            }`}
          >
            <Image
              src={slide}
              alt=""
              layout="fill"
              objectFit="center"
              // className="bg-"
            />
          </div>
        ))}
      </div>
      <div className="absolute top-0 left-0 h-full w-full flex justify-between items-center">
        <button
          onClick={previousSlide}
          className={`${current === 0 ? "invisible" : "visible"}`}
        >
          <Image src={arrow} alt="Previous" className="rotate-180" />
        </button>
        <button
          onClick={nextSlide}
          className={`${
            current === slides.length - 1 ? "invisible" : "visible"
          }`}
        >
          <Image src={arrow} alt="Next" />
        </button>
      </div>
    </div>
  );
};
