import HelpHero from "@/components/help/HelpHero";
import HelpContent from "@/components/help/HelpContent";
import FlyoutNav from "@/components/landing/navbar/FlyoutNav";

export default function Help() {
  return (
    <div>
      <FlyoutNav />
      <HelpHero />
      <HelpContent />
    </div>
  );
}
