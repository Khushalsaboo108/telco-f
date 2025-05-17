import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const cardlist = [
  {
    title: "Labs",
    image: "/hero/labs.png",
  },
  {
    title: "Courses",
    image: "/hero/courses.png",
  },
  {
    title: "Assessments",
    image: "/hero/assessments.png",
  },
];

export default function LandingHero() {
  return (
    <div className="lg:m-auto lg:max-w-desktop lg:p-commonPadding">
      <div className="w-full flex lg:flex-nowrap flex-wrap bg-dark-blue text-white lg:my-[6rem]">
        <div className="relative w-[100%] text-center lg:text-start lg:w-[65%] flex flex-col justify-center p-6 lg:p-12 lg:rounded-xl bg-black text-white">
          <div
            className="absolute inset-0 opacity-50 lg:rounded-xl"
            style={{
              backgroundImage: "url('/hero/landingImage.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>

          <div className="relative z-10">
            <h1 className="text-headingSizeMobile lg:text-headingSizeDesktop font-bold leading-tight text-white">
              Empowering Telco Professionals Through Innovative Learning
              Solutions
            </h1>
            <p className="mt-4 lg:text-textSizeDesktop text-textSizeMobile text-white">
              Revolutionize your telecom career with cutting-edge courses,
              interactive labs, and tailored assessments.
            </p>
            <Button className="mt-6 py-6 px-6 lg:rounded-md font-semibold">
              Request A Demo
            </Button>
          </div>
        </div>

        <div className="w-full flex-1 flex flex-col p-3 lg:p-0 space-y-6 mt-6 lg:mt-0 lg:ml-8">
          {cardlist.map((item) => (
            <Card
              key={item.title}
              className="relative rounded-xl flex h-48 overflow-hidden shadow-lg justify-around md:justify-between items-center md:p-10 p-2 "
              style={{
                backgroundImage: `url('${item.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div>
                <div className="absolute bg-black text-white inset-0 opacity-50 rounded-xl"></div>

                <div className="relative z-10 flex flex-col self-center">
                  <p className="text-white text-textSizeMobile md:text-textSizeDesktop ">
                    Telco
                  </p>
                  <h2 className="md:text-[28px] text-[24px] uppercase font-semibold text-white">
                    {item.title}
                  </h2>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center">
                <Button className="px-4 py-2 rounded-md">Explore</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
