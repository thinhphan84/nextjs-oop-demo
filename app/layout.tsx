import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "User Management Demo",
  description:
    "A simple user management system with Next.js, Supabase, TypeScript, and Tailwind CSS",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
