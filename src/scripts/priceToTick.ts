export function priceToTick(value: number, stepSize: number): number {
  return Math.floor(value / stepSize);
}
