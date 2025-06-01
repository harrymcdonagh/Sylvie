import NavLink from "./NavLink";
import FeaturesContent from "./FeaturesContent";

const LINKS = [
  { text: "About", href: "/about" },
  { text: "Features", href: "/", component: FeaturesContent },
  { text: "Help", href: "/help" },
];

const Links = () => (
  <div className="flex items-center gap-6">
    {LINKS.map((l) => (
      <NavLink key={l.text} href={l.href} FlyoutContent={l.component}>
        {l.text}
      </NavLink>
    ))}
  </div>
);

export default Links;
