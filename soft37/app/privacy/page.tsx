import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";
import { privacyDoc } from "@/content/privacy";

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
    title: { absolute: `${name} — ${privacyDoc.title}` },
    description: `Privacy Policy for ${name}`,
  };
}

export default async function PrivacyPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { app } = await searchParams;
  const appName = app?.trim() || DEFAULT_APP;
  return <LegalDoc doc={privacyDoc} appName={appName} />;
}
