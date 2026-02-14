import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Granth Rawtani",
  description: "Finance • AI • Entrepreneurship",
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
        <main className="ml-[230px] min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
