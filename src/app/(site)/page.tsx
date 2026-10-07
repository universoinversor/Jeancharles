import { Hero } from "@/components/sections/home/Hero";
import { About, Marquee } from "@/components/sections/home/About";
import { Journey, Method, Services } from "@/components/sections/home/Method";
import { Book, MarketStrip, Performance, Testimonials } from "@/components/sections/home/Showcase";
import { Journal, Media } from "@/components/sections/home/Media";
import { CinemaBand, Universe } from "@/components/sections/home/Cinema";
import { Contact } from "@/components/sections/home/Contact";
import { SectionRail } from "@/components/ui/SectionRail";

export default function HomePage() {
  return (
    <>
      <SectionRail />
      <Hero />
      <Marquee />
      <About />
      <CinemaBand />
      <Method />
      <Services />
      <Journey />
      <Universe />
      <MarketStrip />
      <Performance />
      <Testimonials />
      <Book />
      <Media />
      <Journal />
      <Contact />
    </>
  );
}
