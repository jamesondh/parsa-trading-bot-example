export interface MarketConfig {
  name: string;
  address: string;
  vault: string;
  stepSize: number;
  maxRandomPriceDelta: number;
  tickDataAccounts: Map<number, string>;
}

export interface NetworkConfig {
  token: string;
  markets: MarketConfig[];
  adminTokenAccount: string;
  positionSize: number;
  maxOpenAttempts: number;
  maxOpenPositions: number;
  minSecondsBetweenRuns: number;
  maxSecondsBetweenRuns: number;
  minYield: number;
}

export const DEVNET_CONFIG: NetworkConfig = {
  token: "3kE1QbVM4ek15Jk2dpYfo7sWagKXzcFgiHYhMh1Wxq8N", // spl-token-faucet USDC
  adminTokenAccount: "D1dcoaG53PNoLDbiHrdZGpojRbQfbPHLTLFKxsBvDGZt",
  positionSize: 100,
  maxOpenAttempts: 3,
  maxOpenPositions: 10,
  minSecondsBetweenRuns: 60,
  maxSecondsBetweenRuns: 60 * 10,
  minYield: 5,
  markets: [
    {
      name: "Bitcoin",
      address: "HTZNaYwecYoBaCh12EsaqkxeGpENXgcHmqhGw3Lr56Jf",
      vault: "JBPbGkkBT97jUyGZsFLbmuC2YzSZM5kLtdB8a9bgDnDH",
      stepSize: 100,
      maxRandomPriceDelta: 2000,
      tickDataAccounts: new Map([
        [0, "FRwyCKzC4RfPMy1Tjs7fnMzRhmJBtG3i2wpieAhnDTDW"], // $0 - $260000
      ]),
    },
    {
      name: "Solana",
      address: "GSm8B3QhRzE3nywcDGW7o6tMFwLGqnB1PitZTBkdRL29",
      vault: "Ld6i6UTLYkcUNDpKzAtNxTfFL6BFiLXjGb9wdDzgmaR",
      stepSize: 0.5,
      maxRandomPriceDelta: 10,
      tickDataAccounts: new Map([
        [0, "ACdQQz1w5acQCDejGTPmih74owzi2iW43J9YrLFLpYc4"], // $0 - $1300
      ]),
    },
  ],
};
