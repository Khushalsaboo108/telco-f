import { Button } from "@/components/ui/button";
import HeroImage from "@/../public/labs/labsHeroImage.jpg";
import imageBackDots from "@/../public/labs/imageBackDots.png";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="labes-background-image">
      <div className="relative flex max-w-[1360px] mx-auto items-center">
        <div className=" mx-auto  px-[40px] py-[128px] grid lg:grid-cols-2 gap-8">
          <div className="flex w-[100%] flex-col text-center lg:text-start items-center lg:items-start gap-7 animate-fadeInSlideUp">
            <p className=" uppercase text-subHeadingOrange text-subTextSizeDesktop ">
              TelcoLearn Cloud Labs Services
            </p>
            <h1 className="text-headingSizeMobile lg:text-headingSizeDesktop font-bold  leading-tight">
              Hands-On Learning with Real-World Scenarios
            </h1>
            <p className="text-textSizeMobile lg:text-textSizeDesktop ">
              Enhance your skills and capabilities through immersive, practical
              cloud labs designed to simulate real telco network environments.
              From troubleshooting to network operations to optimization, gain
              the experience that matters most in the field.
            </p>
            <button className=" border w-[232px] py-[16px] px-[20px] rounded-[12px] border-gray-300 ">
              Explore
            </button>
          </div>
          <div className="flex w-[100%] ">
            <div className="relative w-full  ">
              <div className=" left-[-66px] top-[6%] hidden lg:block absolute z-[-999]  w-[502px] h-[443px] ">
                <Image
                  src={imageBackDots}
                  alt="Telecom professionals in a modern learning environment"
                  className="rounded-lg object-cover w-full"
                />
              </div>
              <Image
                src={HeroImage}
                alt="Telecom professionals in a modern learning environment"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
