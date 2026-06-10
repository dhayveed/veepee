import { AudioProvider } from "@/lib/AudioContext";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AudioProvider>
          <LenisProvider>
          {children}
          </LenisProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
