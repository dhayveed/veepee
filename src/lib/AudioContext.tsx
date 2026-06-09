"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

type AudioContextType = {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
};

const AudioContext = createContext<AudioContextType | null>(
  null
);

export function AudioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const ensureAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        "/audio/Na_you_1.wav"
      );

      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }

    return audioRef.current;
  };

  const play = async () => {
    const audio = ensureAudio();

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.error(err);
    }
  };

  const pause = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setIsPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        play,
        pause,
        toggle,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error(
      "useAudio must be used inside AudioProvider"
    );
  }

  return context;
}
