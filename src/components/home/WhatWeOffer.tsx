import React from "react";
import VideoBlock from "../global/VideoBlock";

const data = [
  {
    title: "Telco Labs",
    content:
      "Enhance your skills and capabilities through immersive, practical cloud labs designed to simulate real telco network environments. From troubleshooting to network operations to optimization, gain the experience that matters most in the field.",
    videoPath: "/videos/labs.mp4",
    poster: "/images/labs-thumbnail.jpg",
  },
  {
    title: "Telco Course",
    content:
      "Learn from industry experts with courses that cover Digital, Cloud and Wireless Technologies i.e. Generative AI, 5G, IoT, Network Optimization, Containerization, Distributed Clouds, Cyber Security and more. Develop your expertise with structured, comprehensive content customized for telco professionals.",
    videoPath: "/videos/courses.mp4",
    poster: "/images/courses-thumbnail.jpg",
  },
  {
    title: "Telco Assessments",
    content:
      "Test your knowledge and identify areas of improvement with assessments designed to align with industry standards. Track your progress and showcase your capabilities with ease.",
    videoPath: "/videos/workshops.mp4",
    poster: "/images/workshops-thumbnail.jpg",
  },
];

const WhatWeOffer: React.FC = () => {
  return (
    <div className="m-auto max-w-desktop p-commonPadding">
      <section className="my-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-semibold mb-12">What do we offer?</h2>
          <div className="grid grid-cols-1 gap-12">
            {data.map((item, index) => (
              <div
                key={index}
                className={`flex lg:flex-row flex-col-reverse items-center gap-x-3 justify-between lg:gap-x-16 ${
                  index % 2 === 0 ? "lg:flex-row-reverse flex-col" : ""
                }`}
              >
                <div className="w-full lg:w-1/2">
                  {/* <VideoBlock src={item.videoPath} poster={item.poster} /> */}
                  <iframe
                    className=" w-full lg:w-[481.8px] h-[255.3px] rounded-lg"
                    src="https://www.youtube.com/embed/88BmgCTAE3g?si=jS6I9sFpHg4mDS4Z"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="mt-6 lg:mt-0 w-full lg:w-1/2  lg:text-left px-4">
                  <h3 className="text-3xl font-semibold">{item.title}</h3>
                  <p className="text-gray-400 mt-2">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatWeOffer;
