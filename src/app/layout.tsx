import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Chat notes",
  description: "An AI powered note taking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
