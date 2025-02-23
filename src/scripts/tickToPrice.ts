export function tickToPriceLower(tickIndex: number, stepSize: number): number {
  return tickIndex * stepSize;
}

export function tickToPriceUpper(tickIndex: number, stepSize: number): number {
  return (tickIndex + 1) * stepSize;
}
