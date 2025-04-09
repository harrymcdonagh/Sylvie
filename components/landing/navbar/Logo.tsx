import { Cat } from "lucide-react";

const Logo = ({ color = "white" }: { color?: string }) => (
  <div className="flex items-center gap-2">
    <span className="text-2xl font-bold" style={{ color }}>
      Sylvie
    </span>
    <Cat className="text-orange-400 relative inline-block w-8 h-8 align-middle" />
  </div>
);

export default Logo;
