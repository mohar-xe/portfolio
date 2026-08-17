"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
  { id: "top", num: "00", name: "me" },
  { id: "projects", num: "01", name: "projects" },
  { id: "experience", num: "02", name: "experience" },
  { id: "education", num: "03", name: "education" },
  { id: "opensource", num: "04", name: "open source" },
  { id: "blog", num: "05", name: "blog", page: true },
];

export default function NavBar() {
  const pathname = usePathname();
  const [active, setActive] = useState(
    pathname.startsWith("/blog") ? "blog" : links[0].id
  );

  useEffect(() => {
    if (pathname !== "/") return;
    let raf = 0;
    const update = () => {
      const line = window.innerHeight * 0.4;
      let current = links[0].id;
      for (const { id } of links) {
        if (id === "blog") continue;
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <nav
      aria-label="Section navigation"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:bottom-6"
    >
      <ul className="pointer-events-auto flex items-center gap-1 rounded-full border border-black/10 bg-foreground px-2 py-1.5 text-background shadow-lg shadow-black/20 sm:gap-1.5 sm:px-3">
        {links.map((link, i) => (
          <li key={link.id} className="flex items-center">
            {i > 0 && (
              <span aria-hidden className="mx-0.5 text-background/30">
                /
              </span>
            )}
            <a
              href={link.page ? "/blog" : `${pathname === "/" ? "" : "/"}#${link.id}`}
              aria-label={link.name}
              aria-current={active === link.id ? "true" : undefined}
              className={`rounded-full px-2 py-1 font-mono text-[0.65rem] uppercase tracking-widest transition-colors duration-150 sm:px-2.5 sm:text-[0.7rem] ${
                active === link.id
                  ? "bg-background text-foreground"
                  : "hover:bg-background hover:text-foreground"
              }`}
            >
              {link.num}
              <span className="hidden sm:inline"> {link.name}</span>
            </a>
          </li>
        ))}
        <li className="ml-1.5 flex items-center sm:ml-2.5">
          <span aria-hidden className="mx-0.5 text-background/30 sm:mx-1">
            /
          </span>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
}