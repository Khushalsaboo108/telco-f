import React from "react";
import GradientBackground from "../global/GradientBackground";
import { Button } from "../ui/button";
import Link from "next/link";

const Contact = () => {
  return (
    <GradientBackground>
      <div>
        <h1 className=" text-headingSizeMobile lg:text-headingSizeDesktop ">
          Get Your Hands-On Training Labs <br /> Designed by Experts
        </h1>
      </div>

      <Button asChild className="mt-10" size={"lg"}>
        <Link href={"/contact-us"}>Get In Touch</Link>
      </Button>
    </GradientBackground>
  );
};

export default Contact;
