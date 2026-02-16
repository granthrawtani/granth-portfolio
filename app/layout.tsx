import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Granth Rawtani | Portfolio",
  description:
    "Entrepreneur and builder exploring startups, technology, and ideas that create leverage.",
  metadataBase: new URL("https://granthrawtani.com"),
  icons: {
    icon: "/gr.png",
    apple: "/gr.png",
  },
  openGraph: {
    title: "Granth Rawtani",
    description:
      "Entrepreneur and builder exploring startups, technology, and ideas that create leverage.",
    url: "https://granthrawtani.com",
    siteName: "Granth Rawtani",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Granth Rawtani",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Granth Rawtani",
    description:
      "Entrepreneur and builder exploring startups, technology, and ideas that create leverage.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <main className="md:ml-[230px] pt-14 md:pt-0 min-h-screen md:border-l md:border-retro-border/30">
          {children}
        </main>
      </body>
    </html>
  );
}
