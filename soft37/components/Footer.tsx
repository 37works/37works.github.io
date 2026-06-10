import Link from "next/link";
import { site, company } from "@/content/landing";

export function Footer() {
  return (
    <footer className="border-t border-ink-200">
      <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-16">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-title font-medium text-ink-900">
              {site.name}
            </div>
            <div className="text-caption uppercase tracking-widest text-ink-500">
              by {site.parent}
            </div>
          </div>

          <nav className="flex gap-8 text-body-sm text-ink-700">
            <Link
              href="/privacy"
              className="transition-colors duration-200 ease-out hover:text-ink-900"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors duration-200 ease-out hover:text-ink-900"
            >
              Terms
            </Link>
            <a
              href={`mailto:${site.contactEmail}`}
              className="transition-colors duration-200 ease-out hover:text-ink-900"
            >
              Email
            </a>
          </nav>

          <p className="text-caption text-ink-500">
            © {site.year} {site.name} / {site.parent}. All rights reserved.
          </p>
        </div>

        <p className="mt-8 border-t border-ink-200 pt-8 font-mono text-caption leading-relaxed text-ink-500">
          {company.name} &nbsp;|&nbsp; 대표자: {company.ceo} &nbsp;|&nbsp;
          사업자등록번호: {company.businessRegistration}
          <br />
          통신판매업 신고번호: {company.mailOrderRegistration} &nbsp;|&nbsp; DUNS:{" "}
          {company.duns}
          <br />
          설립일: {company.founded} &nbsp;|&nbsp; 소재지: {company.location}
        </p>
      </div>
    </footer>
  );
}
