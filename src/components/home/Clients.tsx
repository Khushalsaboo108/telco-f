"use client";
import React, { useState } from "react";
import Marquee from "../ui/marquee";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { type CarouselApi } from "../ui/carousel";

const clients = [
  "/logos/Accenture.png",
  "/logos/Airtel.png",
  "/logos/Alstom.png",
  "/logos/Amity University.png",
  "/logos/AT&T.jpeg",
  "/logos/Capgemini.jpeg",
  "/logos/CISCO.png",
];

const Clients = () => {
  const [api, setApi] = useState<CarouselApi>();
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="m-auto max-w-desktop p-commonPadding">
      <div className="flex flex-col items-center lg:p-20 text-center m-4 md:m-20">
        <p className="gradient-text text-medium text-textSizeMobile md:text-textSizeDesktop font-medium">
          OUR CLIENTS
        </p>
        <h1 className="md:text-headingSizeDesktop text-headingSizeMobile mt-5">
          Trusted By Leading Brands And Institutions
        </h1>
        <div className="mt-20 w-full max-w-screen-lg">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current as any]}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {clients.map((client, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/4">
                  <div className="relative w-[160px] h-[80px] flex items-center justify-center">
                    <Image
                      src={client}
                      alt={
                        client.split("/").pop()?.split(".")[0] ||
                        `logo-${index}`
                      }
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Clients;
