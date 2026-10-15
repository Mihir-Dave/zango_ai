import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "ABC Company Fixture",
  description: "Buggy Figma-to-code matching exercise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
