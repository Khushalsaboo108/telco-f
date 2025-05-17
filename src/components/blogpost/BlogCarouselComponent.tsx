"use client"

import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useEffect, useState } from "react"

import { Card } from "../ui/card";
import Image, { StaticImageData } from "next/image";

interface IBlogVarousel {
    image: any;
    title: string;
    subTitle: string;
    timeOfCourse: string;
    activeStudent: string;
    priceOfLessons: string;
    isFree: boolean;
    link: string;
}

interface CarouselControllerProps {
    courses: IBlogVarousel[];
}

export function BlogCarouselComponent({ courses }: CarouselControllerProps) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0);
    const [darkMode, setDarkMode] = useState(false)
    const [slidesToShow, setSlidesToShow] = useState(4)

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        document.documentElement.classList.toggle("dark")
    }

    useEffect(() => {
        // Update slidesToShow based on window width
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSlidesToShow(1) // Mobile: 1 card
            } else if (window.innerWidth < 1024) {
                setSlidesToShow(2) // md: 2 cards
            } else {
                setSlidesToShow(4) // lg and above: 4 cards
            }
        }

        // Initial call
        handleResize()

        // Set up event listener
        window.addEventListener('resize', handleResize)

        // Clean up
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <div className="relative w-full">
            <Carousel
                setApi={setApi}
                opts={{
                    align: "start",
                    slidesToScroll: 1, // Changed to 1 to allow smooth transitions between different screen sizes
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {courses.map((course, index) => (
                        <CarouselItem key={index} className="pl-4 basis-full my-3 md:basis-1/2 lg:basis-1/4">
                            <div className="transition-colors duration-300">
                                <div className="bg-newBackgroundColor p-4 shadow-lg rounded-[8px]">
                                    <div className="flex flex-col gap-4 items-center justify-center">
                                        <div>
                                            <Image src={course.image} alt={course.title} className="object-cover rounded-[8px]" />
                                        </div>
                                        <div className="flex  items-center flex-col gap-2">
                                            <div> Client {index} </div>
                                            <div>Occupation</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation arrows positioned on the right */}
                <div className="absolute right-10 md:right-14 bottom-[-30px] flex flex-col gap-4">
                    <CarouselPrevious className={`h-11 w-11 rounded-[8px] translate-x-0 ${current === 0 ? "bg-white text-[#ff782d]" : "bg-[#ff782d] text-white"} hover:bg-[#ff782d]/90 hover:text-white`} />
                    <CarouselNext className={`h-11 w-11 rounded-[8px] translate-x-0 ${current === count - 1 ? "bg-white text-[#ff782d]" : "bg-[#ff782d] text-white"} hover:bg-[#ff782d]/90 hover:text-white`} />
                </div>
            </Carousel>

            {/* Pagination dots */}
            <div className="mt-[30px] flex justify-center gap-2">
                {Array.from({ length: count }).map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 w-2 rounded-full transition-all ${index === current ? "bg-[#ff782d] w-2" : "bg-primary/30"}`}
                        onClick={() => api?.scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
