"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Card from "./Card";
import { StaticImageData } from "next/image";

interface Course {
  image: StaticImageData;
  title: string;
  subTitle: string;
  timeOfCourse: string;
  activeStudent: number;
  priceOfLessons: string;
  isFree: boolean;
  link: string;
}

interface CarouselControllerProps {
  courses: Course[];
}

export function CarouselController({ courses }: CarouselControllerProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative w-full ">
      <Carousel
        setApi={setApi}
        // opts={{
        //     align: "start",
        // }}
        className="w-full"
      >
        <CarouselContent>
          {courses.map((course, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 pl-4"
            >
              <Card
                subTitle={course.subTitle}
                title={course.title}
                image={course.image}
                activeStudent={course.activeStudent}
                priceOfLessons={course.priceOfLessons}
                link={course.link}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows positioned on the right */}
        <div className="absolute right-14 bottom-[-30px] flex flex-col gap-4">
          <CarouselPrevious
            className={`h-11 w-11 rounded-[8px] translate-x-0 ${
              current === 0
                ? "bg-white text-[#ff782d]"
                : "bg-[#ff782d] text-white"
            } hover:bg-[#ff782d]/90 hover:text-white`}
          />
          <CarouselNext
            className={`h-11 w-11 rounded-[8px] translate-x-0 ${
              current === count - 1
                ? "bg-white text-[#ff782d]"
                : "bg-[#ff782d] text-white"
            } hover:bg-[#ff782d]/90 hover:text-white`}
          />
        </div>
      </Carousel>

      {/* Pagination dots */}
      <div className="mt-[30px] flex justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === current ? "bg-[#ff782d] w-2" : "bg-primary/30"
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
