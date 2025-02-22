export function getPositionAccountSize(numTicks: number): number {
  return (
    8 + // discriminator
    32 + // owner
    32 + // market
    16 + // position_seed
    8 + // deposited
    8 + // open_fee
    8 + // r1
    8 + // r2
    8 + // opened_timestamp
    1 + // bump
    4 + // Vec length prefix
    16 * numTicks // Tick data (each Tick is 2 f64s = 16 bytes)
  );
}
