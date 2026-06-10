"use client";

import { useState } from "react";

import MobileGate from "@/components/MobileGate";
import MusicButton from "@/components/MusicButton";
import HeroVideo from "@/sections/HeroVideo/HeroVideo";
import Gallery from "@/sections/Gallery/Gallery";
import Donate from "@/sections/Donate/Donate";
import InvitationCard from "@/sections/Opening/InvitationCard";
import WeddingDetails from "@/sections/WeddingDetails/WeddingDetails";

export default function Home() {
  const [opened, setOpened] = useState(false);

  return (
    <MobileGate>
      <HeroVideo />
      <Gallery />
      <WeddingDetails />
      <Donate />

      <MusicButton />

      {!opened && (
        <InvitationCard
          onOpen={() => setOpened(true)}
        />
      )}
    </MobileGate>
  );
}
