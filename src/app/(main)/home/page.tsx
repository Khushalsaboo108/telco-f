import AboutUs from "@/components/home/Aboutus";
import LandingHero from "@/components/home/LandingHero";
import Services from "@/components/home/Services";
import Clients from "@/components/home/Clients";
import Skills from "@/components/home/Skills";
import WhatWeOffer from "@/components/home/WhatWeOffer";
import WhyTLXPSection from "@/components/home/EnhanceExp";

export default function page() {
  return (
    <>
      <LandingHero />
      <Services />
      <Clients />
      <Skills />
      <AboutUs />
      <WhatWeOffer />
      <WhyTLXPSection />
    </>
  );
}
