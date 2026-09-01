import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/layout/header/page";
import Footer from "./components/layout/footer/page";

export const metadata: Metadata = {
  title: "Welcome Holidays International",
  description:
    "Discover memorable holiday experiences, destinations, stays and membership benefits with Welcome Holidays International.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-[#07172a] antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}