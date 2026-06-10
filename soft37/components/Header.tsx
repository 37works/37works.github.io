import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { site } from "@/content/landing";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-200 bg-canvas/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 md:px-16">
        <Link
          href="/"
          aria-label="Soft37 home"
          className="flex items-center gap-3"
        >
          {/* 0.5X clearspace via padding around the mark */}
          <span className="p-1">
            <Logo size={28} />
          </span>
          <span className="text-h3 font-semibold tracking-tight text-ink-900">
            Soft37
          </span>
        </Link>

        <div className="flex items-center gap-6 md:gap-8">
          <div className="hidden items-center gap-8 text-body text-ink-700 sm:flex">
            <a
              href={site.rootUrl}
              className="transition-colors duration-200 ease-out hover:text-ink-900"
            >
              Work
            </a>
            <span className="font-medium text-ink-900">Soft37</span>
          </div>
          <a
            href={`mailto:${site.contactEmail}`}
            className="rounded-md bg-sage px-5 py-2 text-label font-medium text-surface transition-colors duration-200 ease-out hover:bg-sage-deep"
          >
            Contact
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
