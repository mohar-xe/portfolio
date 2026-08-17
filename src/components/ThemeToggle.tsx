"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";

const emptySubscribe = () => () => {};

function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const hydrated = useHydrated();
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, hydrated]);

  if (!hydrated) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-1.5 rounded-full border border-background/30 px-2.5 py-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-widest transition-colors duration-150 hover:bg-background hover:text-foreground"
    >
      <span aria-hidden className="inline-flex w-4 justify-center text-sm leading-none">
        {isDark ? "☾" : "☀"}
      </span>
      {isDark ? "dark" : "light"}
    </button>
  );
}