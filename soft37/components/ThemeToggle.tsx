"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // avoid hydration mismatch — theme is only known on the client
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-200 text-ink-700 transition-colors duration-200 ease-out hover:bg-ink-100 hover:text-ink-900"
    >
      {mounted ? (
        isDark ? (
          <Sun size={18} strokeWidth={1.75} absoluteStrokeWidth />
        ) : (
          <Moon size={18} strokeWidth={1.75} absoluteStrokeWidth />
        )
      ) : (
        <span className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
