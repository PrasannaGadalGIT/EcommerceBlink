
import "./globals.css";
import { Karla } from 'next/font/google'
import SessionWrapper from "@/components/SessionWrapper";
const karla = Karla({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body
          className={karla.className}
        >
          {children}
        </body>
      </SessionWrapper>

    </html>
  );
}
