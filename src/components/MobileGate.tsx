"use client";

import { useEffect, useState } from "react";

export default function MobileGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  if (!isMobile) {
    return (
      <main className="desktop-warning">
        <div className="desktop-card">
          <h1>Mobile Only</h1>
          <p>
            This invitation was designed to be viewed on a mobile device.
          </p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
