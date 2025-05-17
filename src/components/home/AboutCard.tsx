"use client";

import React, { useState } from "react";
import Image from "next/image";

interface CardProps {
  icon: string;
  title: string;
  description: string;
}

const AboutCard = ({ icon, title, description }: CardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowReadMore = description.length > 50;

  const truncatedText =
    shouldShowReadMore && !isExpanded
      ? description.slice(0, 50) + "..."
      : description;

  const readMoreButton = shouldShowReadMore && (
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className="text-gray-600 hover:underline font-medium mt-2 focus:outline-none"
    >
      {isExpanded ? "Read less" : "Read more"}
    </button>
  );

  return (
    <div
      data-animate="false"
      className="flex flex-col text-left justify-start border-t border-gray-400 rounded-none "
    >
      <div className="mt-6 mb-4 text-current dark:text-white">
        <Image
          src={icon}
          alt={title}
          width={50}
          height={50}
          className="dark:invert"
        />
      </div>
      <h3 className="text-[31px] font-bold mb-2">{title}</h3>
      <div>
        <p className="text-[20px] text-start tracking-[-0.5px] leading-[32px] text-gray-600">
          {truncatedText}
        </p>
        {readMoreButton}
      </div>
    </div>
  );
};

export default AboutCard;
