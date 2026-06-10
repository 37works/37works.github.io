import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";
import { termsDoc } from "@/content/terms";

type SearchParams = Promise<{ app?: string }>;

const DEFAULT_APP = "Soft37";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { app } = await searchParams;
  const name = app?.trim() || DEFAULT_APP;
  return {
    title: { absolute: `${name} — ${termsDoc.title}` },
    description: `Terms of Service for ${name}`,
  };
}

export default async function TermsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { app } = await searchParams;
  const appName = app?.trim() || DEFAULT_APP;
  return <LegalDoc doc={termsDoc} appName={appName} />;
}
