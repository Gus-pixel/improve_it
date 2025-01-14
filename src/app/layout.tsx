import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./_components/navbar";
import AuthWrapper from "./_components/authWrapper/AuthWrapper";
import { AuthContextProvider } from "./auth/auth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Improve IT",
  description:
    "Improve IT é uma plataforma de implementação de melhorias em processos da empresa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthContextProvider>
          <AuthWrapper>
            <Navbar />
            {children}
          </AuthWrapper>
        </AuthContextProvider>
      </body>
    </html>
  );
}
