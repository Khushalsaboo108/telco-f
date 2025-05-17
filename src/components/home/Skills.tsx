import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import VideoBlock from "../global/VideoBlock";

const clients = [
  "/logos/Accenture.png",
  "/logos/Airtel.png",
  "/logos/Alstom.png",
  "/logos/Amity University.png",
  "/logos/AT&T.jpeg",
];

const Skills = () => {
  return (
    <div className="m-auto max-w-desktop p-commonPadding">
      <div className="text-center">
        <h1 className="lg:text-headingSizeDesktop text-headingSizeMobile mt-5">
          Build Real World Skills
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-5 my-6 gap-4 justify-items-center">
          {clients.map((client, index) => (
            <div key={index} className="pl-2 md:pl-4 md:basis-1/4">
              <div className="relative w-[160px] h-[80px] flex items-center justify-center">
                <Image
                  src={client}
                  alt={
                    client.split("/").pop()?.split(".")[0] || `logo-${index}`
                  }
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          {/* <VideoBlock
                    src="/videos/sample-video.mp4"
                    poster="/videos/video-thumbnail.jpg"
                /> */}
          <iframe
            className=" lg:w-[80%] lg:h-[40rem] h-[350px] w-full rounded-lg"
            src="https://www.youtube.com/embed/88BmgCTAE3g?si=jS6I9sFpHg4mDS4Z"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Skills;
