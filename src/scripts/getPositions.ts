export async function getPositions(user: string) {
  const response = await fetch(
    `https://devnet.parsa.finance/api/positions/${user}`
  );
  const data = await response.json();
  return data;
}
