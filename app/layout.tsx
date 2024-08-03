import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          data-rh="true"
          rel="icon"
          href="https://pintashymkent.kz/thumb/2/lzOLviPj8rS6TMwBcwl5iQ/750r750/d/63315fb39faf8-removebg-preview_1.png"
        />
      </head>
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
