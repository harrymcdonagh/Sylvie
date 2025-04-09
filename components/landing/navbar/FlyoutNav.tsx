// components/navbar/FlyoutNav.tsx
"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Logo from "./Logo";
import Links from "./Links";
import CTAs from "./CTAs";
import MobileMenu from "./MobileMenu";

const FlyoutNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 250);
  });

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-6 text-white transition-all duration-300 ease-out lg:px-12 ${
        scrolled ? "bg-neutral-950 py-3 shadow-xl" : "bg-neutral-950/0 py-6 shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
        <div className="hidden gap-6 lg:flex">
          <Links />
          <CTAs />
        </div>
        <MobileMenu />
      </div>
    </nav>
  );
};

export default FlyoutNav;
