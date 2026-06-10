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
      <head>
      <script src="https://js.paystack.co/v1/inline.js"></script>
      </head>
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
