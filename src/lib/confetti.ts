import confetti from "canvas-confetti";

export function fireConfetti() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 6,
      spread: 70,
      origin: { y: 0.6 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}
