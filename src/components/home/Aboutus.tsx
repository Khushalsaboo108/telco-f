import React from "react";
import AboutCard from "./AboutCard";
// import { cardsData } from "../_data/aboutus";

export const cardsData = [
  {
    icon: "/icons/home/about1.svg",
    title: "Transforming Learning",
    description:
      "We redefine how to address skill gaps in telecom by creating customized learning solutions that incorporate interactive technologies, hands-on practice, and industry-specific scenarios. Our approach encourage not only knowledge but also the confidence and ability to apply skills in real-world situations effectively.",
  },
  {
    icon: "/icons/home/about2.svg",
    title: "Mission-Driven Excellence",
    description:
      "We bridge current capabilities with future aspirations by designing impactful, goal-oriented training programs. Our focus on aligning learning initiatives with strategic business needs ensures measurable results, sustained growth, and meaningful contributions to individual careers and organizational success in highly competitive environments.",
  },
  {
    icon: "/icons/home/about3.svg",
    title: "Future-Ready Workforce",
    description:
      "We help businesses stay ahead by building agile, skilled, and innovative teams equipped to meet tomorrow’s challenges. Through customized learning paths and cutting-edge content, we prepare professionals to thrive in telecom industry shaped by rapid digital advancements and increasing global competition.",
  },
  {
    icon: "/icons/home/about4.svg",
    title: "Cutting-Edge Resources",
    description:
      "We empower learners with state-of-the-art cloud labs, advanced tools, and dynamic training environments. By combining theoretical learning with practical applications, we provide an immersive experience that enhances understanding, builds expertise, and ensures learners are equipped to succeed in their careers.",
  },
];

const AboutUs = () => {
  return (
    <div className="m-auto max-w-desktop p-commonPadding">
      <section id="about-us" className="mt-16">
        <div className="mx-auto px-4 text-left">
          <p className="text-textSizeMobile lg:text-textSizeDesktop font-medium text-primary mb-2 gradient-text">
            ABOUT US
          </p>
          <h1 className="text-headingSizeMobile lg:text-headingSizeDesktop font-extrabold text-foreground mb-4">
            Who We Are?
          </h1>
          <p className="text-subTextSizeMobile lg:text-subTextSizeDesktop text-muted-foreground mb-8">
            We are dedicated to transforming how individuals and organizations
            in telecom industry approach learning and development by providing
            advanced, innovative, and practical training solutions that address
            real-world challenges while preparing learners and businesses for
            future opportunities in an ever-evolving global landscape.
          </p>

          <div className="grid grid-cols-1 mt-3 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {cardsData.map((card, index) => (
              <AboutCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
