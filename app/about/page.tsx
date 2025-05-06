import AboutHero from "@/components/about/AboutHero";
import AboutContent from "@/components/about/AboutContent";
import FlyoutNav from "@/components/landing/navbar/FlyoutNav";

export default function About() {
  return (
    <div>
      <FlyoutNav />
      <AboutHero />
      <AboutContent />
    </div>
  );
}
