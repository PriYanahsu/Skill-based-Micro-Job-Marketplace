import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { UserProvider } from "../context/UserContext";

export const metadata: Metadata = {
  title: "JobMaker - Micro Jobs Platform",
  description: "Short-duration local and remote micro jobs platform",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <UserProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
