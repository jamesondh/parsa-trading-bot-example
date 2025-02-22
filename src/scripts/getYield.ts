export async function getYield(
  marketAddress: string,
  r1: number,
  r2: number,
  size: number
) {
  const response = await fetch(
    `https://devnet.parsa.finance/api/getYield/${marketAddress}/${r1}/${r2}/${size}`
  );
  const data = await response.json();
  return data;
}
