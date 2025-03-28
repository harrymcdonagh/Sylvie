import Features from "@/components/landing/Features";
import FlyoutNav from "@/components/landing/navbar/FlyoutNav";
import Hero from "@/components/landing/Hero";

export default function Home() {
  return (
    <div>
      <FlyoutNav />
      <Hero />
      <Features />
    </div>
  );
}
