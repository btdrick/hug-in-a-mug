import confetti from 'canvas-confetti';

/**
 * Confetti package docs
 * https://www.kirilv.com/canvas-confetti/
 */
export const runConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}