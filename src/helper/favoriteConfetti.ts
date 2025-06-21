import confetti from "canvas-confetti";

export const fireConfettiAtClickPosition = (x: number, y: number) => {
  confetti({
    particleCount: 10,
    spread: 100,
    startVelocity: 10,
    ticks: 50,
    angle: 90,
    flat: false,
    shapes: ["circle"],
    origin: {
      x: x / window.innerWidth,
      y: y / window.innerHeight,
    },
  });
};
