"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { FiMenu, FiArrowRight, FiX, FiChevronDown } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useMotionValueEvent, AnimatePresence, useScroll, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { Cat } from "lucide-react";
import Link from "next/link";
import { FiZap, FiUserCheck, FiCalendar, FiHeart } from "react-icons/fi";
import { signIn, signOut } from "next-auth/react";

const Example = () => {
  return <FlyoutNav />;
};

const FlyoutNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 250 ? true : false);
  });

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-6 text-white 
      transition-all duration-300 ease-out lg:px-12
      ${
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

const Logo = ({ color = "white" }: { color?: string }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl font-bold" style={{ color }}>
        Sylvie
      </span>
      <Cat className="text-orange-400 relative inline-block w-8 h-8 align-middle" />
    </div>
  );
};

const Links = () => {
  return (
    <div className="flex items-center gap-6">
      {LINKS.map((l) => (
        <NavLink key={l.text} href={l.href} FlyoutContent={l.component}>
          {l.text}
        </NavLink>
      ))}
    </div>
  );
};

const NavLink = ({
  children,
  href,
  FlyoutContent,
}: {
  children: React.ReactNode;
  href: string;
  FlyoutContent?: React.ElementType;
}) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative h-fit w-fit"
    >
      <a href={href} className="relative">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
        />
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CTAs = () => {
  return (
    <div className="flex items-center gap-3">
      <button
        className="flex items-center gap-2 rounded-lg border-2 border-white px-4 py-2 font-semibold text-white transition-colors hover:bg-white hover:text-black"
        onClick={() => signIn()}
      >
        <FaUserCircle />
        <span>Sign in</span>
      </button>
      <Link href="/register">
        <button className="rounded-lg border-2 border-orange-400 bg-orange-400 px-4 py-2 font-semibold text-black transition-colors hover:border-orange-600 hover:bg-orange-600 hover:text-white">
          Register
        </button>
      </Link>
    </div>
  );
};

const FeaturesContent = () => {
  return (
    <div className="grid h-fit w-full grid-cols-12 shadow-xl lg:h-72 lg:w-[600px] lg:shadow-none xl:w-[750px] overflow-hidden rounded-xl border">
      <div className="col-span-12 flex flex-col justify-center bg-orange-400 p-6 text-white lg:col-span-4">
        <h1 className="mb-2 text-2xl font-bold">Features</h1>
        <p className="text-sm">
          Explore how Sylvie supports UEA students with intelligent tools and a
          well-being-first approach.
        </p>
      </div>

      <div className="col-span-12 grid grid-cols-2 gap-4 bg-white p-6 lg:col-span-8">
        <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 shadow-sm transition hover:shadow-md">
          <FiZap className="text-orange-400 text-xl" />
          <h3 className="text-sm font-semibold">Chat Support 24/7</h3>
          <p className="text-xs text-muted-foreground">
            Ask anything about UEA, mental health, or student life — anytime.
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 shadow-sm transition hover:shadow-md">
          <FiUserCheck className="text-orange-400 text-xl" />
          <h3 className="text-sm font-semibold">Personalised Experience</h3>
          <p className="text-xs text-muted-foreground">
            Save chats and get responses tailored to your needs and profile.
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 shadow-sm transition hover:shadow-md">
          <FiCalendar className="text-orange-400 text-xl" />
          <h3 className="text-sm font-semibold">UEA Integration</h3>
          <p className="text-xs text-muted-foreground">
            Access timetables, events, and services directly from Sylvie.
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 shadow-sm transition hover:shadow-md">
          <FiHeart className="text-orange-400 text-xl" />
          <h3 className="text-sm font-semibold">Well-being Focused</h3>
          <p className="text-xs text-muted-foreground">
            Get emotional support, tips, and trusted well-being resources.
          </p>
        </div>
      </div>
    </div>
  );
};

const MobileMenuLink = ({
  children,
  href,
  FoldContent,
  setMenuOpen,
}: {
  children: React.ReactNode;
  href: string;
  FoldContent?: React.ElementType;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative text-neutral-950">
      {FoldContent ? (
        <div
          className="flex w-full cursor-pointer items-center justify-between border-b border-neutral-300 py-6 text-start text-2xl font-semibold"
          onClick={() => setOpen((pv) => !pv)}
        >
          <a
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(false);
            }}
            href={href}
          >
            {children}
          </a>
          <motion.div
            animate={{ rotate: open ? "180deg" : "0deg" }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <FiChevronDown />
          </motion.div>
        </div>
      ) : (
        <a
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(false);
          }}
          href="#"
          className="flex w-full cursor-pointer items-center justify-between border-b border-neutral-300 py-6 text-start text-2xl font-semibold"
        >
          <span>{children}</span>
          <FiArrowRight />
        </a>
      )}
      {FoldContent && (
        <motion.div
          initial={false}
          animate={{
            height: open ? height : "0px",
            marginBottom: open ? "24px" : "0px",
            marginTop: open ? "12px" : "0px",
          }}
          className="overflow-hidden"
        >
          <div ref={ref}>
            <FoldContent />
          </div>
        </motion.div>
      )}
    </div>
  );
};

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="block lg:hidden">
      <button onClick={() => setOpen(true)} className="block text-3xl">
        <FiMenu />
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            exit={{ x: "100vw" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed left-0 top-0 flex h-screen w-full flex-col bg-white"
          >
            <div className="flex items-center justify-between p-6">
              <Logo color="black" />
              <button onClick={() => setOpen(false)}>
                <FiX className="text-3xl text-neutral-950" />
              </button>
            </div>
            <div className="h-screen overflow-y-scroll bg-neutral-100 p-6">
              {LINKS.map((l) => (
                <MobileMenuLink
                  key={l.text}
                  href={l.href}
                  FoldContent={l.component}
                  setMenuOpen={setOpen}
                >
                  {l.text}
                </MobileMenuLink>
              ))}
            </div>
            <div className="flex justify-end bg-neutral-950 p-6">
              <CTAs />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Example;

const LINKS = [
  {
    text: "About",
    href: "/about",
  },
  {
    text: "Features",
    href: "/features",
    component: FeaturesContent,
  },
  {
    text: "Help",
    href: "/help",
  },
];
