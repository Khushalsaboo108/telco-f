"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface CardProps {
  subTitle: string;
  title: string;
  image: StaticImageData | string;
  // timeOfCourse: string;
  activeStudent: number;
  priceOfLessons: string;
  link: string;
  isFree?: boolean;
}

function Card(props: CardProps) {
  const pathname = usePathname();
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="relative h-48">
        <span className="absolute z-10 top-2 left-2 bg-card text-sm px-2 py-1 rounded">
          Topic
        </span>
        <div className="w-full h-full">
          <Image
            src={props.image}
            alt="Course thumbnail"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold capitalize mb-2">{props.title}</h3>
        <div className="flex gap-4 text-sm text-muted-foreground mb-4">
          <span>{props.activeStudent} Students</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-primary font-semibold">
            Rs. {props.priceOfLessons}
          </span>
          <Link
            href={`${pathname}/${props.link}`}
            className="text-sm text-primary hover:underline"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
