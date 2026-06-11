import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://soft37.working37.net"),
  title: {
    default: "Soft37 — SaaS · Mobile App",
    template: "%s — Soft37",
  },
  description:
    "Soft37은 SaaS와 모바일 앱을 만드는 작은 팀입니다. 일상에 스며드는 자연스러움을 지향합니다.",
  openGraph: {
    title: "Soft37 — SaaS · Mobile App",
    description: "일상에 스며드는 자연스러움.",
    siteName: "Soft37",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
        <ThemeProvider>
          <Header />
          <main className="flex-1 pt-[69px]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
