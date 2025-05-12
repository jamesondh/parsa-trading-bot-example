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

export interface PositionSizeConfig {
  type: "constant" | "range" | "max_balance";
  value?: number; // for constant
  min?: number; // for range
  max?: number; // for range
}

export interface NetworkConfig {
  token: string;
  markets: MarketConfig[];
  adminTokenAccount: string;
  positionSize: PositionSizeConfig;
  maxOpenAttempts: number;
  maxOpenPositions: number;
  minSecondsBetweenRuns: number;
  maxSecondsBetweenRuns: number;
  minYield: number;
  maxYield: number;
  yieldAdjustNarrowFactor: number;
  yieldAdjustWidenFactor: number;
}

export const DEVNET_CONFIG: NetworkConfig = {
  token: "3kE1QbVM4ek15Jk2dpYfo7sWagKXzcFgiHYhMh1Wxq8N", // spl-token-faucet USDC
  adminTokenAccount: "9XTjgmuqgqSQB51r3JYCRAB6JGGympvetgZb9RaHDmKA",
  positionSize: {
    type:
      (process.env.POSITION_SIZE_TYPE as
        | "constant"
        | "range"
        | "max_balance") || "constant",
    value: Number(process.env.POSITION_SIZE) || 100,
    min: Number(process.env.MIN_POSITION_SIZE) || 50,
    max: Number(process.env.MAX_POSITION_SIZE) || 200,
  },
  maxOpenAttempts: Number(process.env.MAX_OPEN_ATTEMPTS) || 3,
  maxOpenPositions: Number(process.env.MAX_OPEN_POSITIONS) || 10,
  minSecondsBetweenRuns: Number(process.env.MIN_SECONDS_BETWEEN_RUNS) || 60,
  maxSecondsBetweenRuns:
    Number(process.env.MAX_SECONDS_BETWEEN_RUNS) || 60 * 10,
  minYield: Number(process.env.MIN_YIELD) || 5,
  maxYield: Number(process.env.MAX_YIELD) || 999999,
  yieldAdjustNarrowFactor:
    Number(process.env.YIELD_ADJUST_NARROW_FACTOR) || 0.75,
  yieldAdjustWidenFactor: Number(process.env.YIELD_ADJUST_WIDEN_FACTOR) || 1.25,
  markets: [
    {
      name: "Solana",
      address: "CzJBmeVvDTjeH5xYbzp32hUURjbDqDNE3ykbdVJ8Nv3M",
      vault: "43ojwju9CCtceWXXJu9ZdY5sG44ZEHVfXmG3AG5Fw7iu",
      stepSize: 0.5,
      maxRandomPriceDelta: 10,
      tickDataAccounts: new Map([
        [0, "5bCHbBZQAH3pb8MLkPFAQYW7zHtfQJxQoqfiNa23Cq5U"], // $0 - $1300
      ]),
    },
  ],
};
