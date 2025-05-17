import React from "react";
import Image from "next/image";

export default function LandingImage() {
  return (
    <div className="relative h-[85vh] w-full">
      <Image
        src="/icons/home/landingImage.png"
        alt="Landing"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center text-white">
        landing image
      </div>
    </div>
  );
}
