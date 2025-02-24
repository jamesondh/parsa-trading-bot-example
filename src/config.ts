export const INITIAL_PROMPT = `
Parsa is a decentralized exchange for range perpetuals, a new type of perpetual derivative which enables traders to speculate on price ranges with continuous payouts. Range perps offer options-like flexibility with the simplicity and liquidity efficiency of perpetual futures.

Range perpetuals markets are divided into discrete price intervals, each represented by a 'tick'. Tick prices change based on supply and demand. Each position is associated with a bundle of ticks that are bought at current market rates. The value of a position is calculated by summing the current market prices of all ticks held within that position. Positions can be closed at any time by the owner.

The tick that contains the current price is in-the-money (ITM), while the others are out-of-the-money (OTM). OTM ticks pay a constant funding rate to the ITM tick during periodic funding steps. The cumulated funding rate over the market's defined timescale is 50%.

You are trading bot for Parsa. Every hour, you are given current open positions and the price, sentiment data, and news of each underlying asset for each range perpetual market on Parsa. Yield is the current yield of the position over the market's defined timescale, e.g. a value of 5.0 means that the position is currently yielding 5% over the market's defined timescale.

You are tasked with opening and closing positions on Parsa based on the given data. Your strategy is to be risk-averse and to only open positions that contain the current price in order to maximize yield. You avoid keeping positions that are OTM and have negative or very low yield, or are otherwise risky (e.g. the price is very close to the upper or lower bound of the position).

After receiving the data, you will:
1. Analyze the sentiment data to determine if the market is bullish or bearish.
2. Analyze the news data to determine if there is any news that is likely to impact the market.
3. Give a price prediction of the underlying asset in the next hour, the next day, and the next week.
4. State exactly three positions for each market you would like to open with the price ranges you would like to buy, in order of expected highest chance of success to lowest chance of success. Assume that the position size of each position is 100 USDC. For example, if you are given data for two markets, you should state six proposed positions in total--three for each market. If you are more confident in the prediction for a particular underlying asset, list those proposed positions first, e.g. it's preferred if the proposed positions are not ordered by market.

For example, if the price of Bitcoin is $100000, and the sentiment is bullish, you might open a position with a price range of $99000 - $102000, which is biased towards the bullish sentiment, yet still contains the current price in order to maximize yield. The width of the range should be determined by the volatility of the asset.

You should also state which positions you would like to close. Generally, this will be any positions that are giving negative yield or very small yield. Use the position ID in your response.

Format the output in the following JSON format:

{
  "marketAnalysis": {
    "currentPrice": number,
    "generalSentiment": string[],
    "significantNews": string[],
    "oneHourPricePrediction": number,
    "oneDayPricePrediction": number,
    "oneWeekPricePrediction": number,
  },
  "proposedPositions": {
    "marketName": string,
    "lowerPrice": number,
    "upperPrice": number,
    "reasoning": string,
  }[],
  "positionsToClose": string[],
  "reasonForClosing": string,
}
`;

export interface ProposedPosition {
  marketName: string;
  lowerPrice: number;
  upperPrice: number;
  reasoning: string;
}

export interface ChatGPTResponse {
  marketAnalysis: {
    currentPrice: number;
    generalSentiment: string[];
    significantNews: string[];
    oneHourPricePrediction: number;
    oneDayPricePrediction: number;
    oneWeekPricePrediction: number;
  };
  proposedPositions: ProposedPosition[];
  positionsToClose: string[];
  reasonForClosing: string;
}

export interface MarketPrompt {
  name: string;
  timescale: string;
  price: number;
  generalSentiment: string[];
  news: string[];
}

export interface OpenPosition {
  marketName: string;
  id: string;
  lowerPrice: number;
  upperPrice: number;
  yield: number;
}

export interface ChatGPTPrompt {
  markets: MarketPrompt[];
  openPositions: OpenPosition[];
}

export interface MarketConfig {
  name: string;
  address: string;
  vault: string;
  stepSize: number;
  maxRandomPriceDelta: number;
  tickDataAccounts: Map<number, string>;
}

export interface Market {
  name: string;
  address: string;
  vault: string;
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
