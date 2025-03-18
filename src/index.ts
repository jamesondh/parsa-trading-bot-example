import {
  DEVNET_CONFIG,
  type MarketConfig,
  INITIAL_PROMPT,
  type MarketPrompt,
  type OpenPosition,
  type ChatGPTPrompt,
  type ChatGPTResponse,
  type Market,
  type ProposedPosition,
} from "./config";
import { open, type OpenAccounts, type OpenParams } from "./scripts/open";
import { close, type CloseAccounts } from "./scripts/close";
import { getMarket } from "./scripts/getMarket";
import { Connection, PublicKey } from "@solana/web3.js";
import { Program, setProvider } from "@coral-xyz/anchor";
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { priceToTick } from "./scripts/priceToTick";
import { getYield } from "./scripts/getYield";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { PARSA_IDL } from "./scripts/idl";
import type { Parsa } from "./scripts/parsa";
import { getUserStats } from "./scripts/getUserStats";
import { getPositions } from "./scripts/getPositions";
import { tickToPriceLower, tickToPriceUpper } from "./scripts/tickToPrice";
import OpenAI from "openai";

// initialize openai client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// prepare the solana connection, provider, program, and wallet
console.log(new Date(), "Starting trading bot");
const connection = new Connection(process.env.ANCHOR_PROVIDER_URL!);
const user = AnchorProvider.env().wallet as Wallet;
const provider = new AnchorProvider(connection, user);
setProvider(provider);
const program = new Program(PARSA_IDL as Parsa, provider) as Program<Parsa>;

// output wallet address and current usdc balance
console.log(new Date(), "Using wallet", user.publicKey.toBase58());
console.log(
  new Date(),
  `https://devnet.parsa.finance/dashboard/${user.publicKey.toBase58()}`
);
const userTokenAccount = await getAssociatedTokenAddress(
  new PublicKey(DEVNET_CONFIG.token),
  user.publicKey
);
const usdcBalance = (await connection.getTokenAccountBalance(userTokenAccount))
  .value.uiAmount;
console.log(new Date(), "USDC balance", usdcBalance);

/**
 * Open a proposed position for a given market
 * @param proposedPosition - The proposed position to open
 * @param marketConfig - The market configuration for the proposed position
 */
async function openPosition(
  proposedPosition: ProposedPosition,
  marketConfig: MarketConfig
) {
  const { lowerPrice, upperPrice } = proposedPosition;
  console.log(
    "  ",
    new Date(),
    "Proposed position range",
    lowerPrice,
    upperPrice
  );

  // Measure the yield of the proposed position
  const getYieldResult = await getYield(
    marketConfig.address,
    lowerPrice,
    upperPrice,
    100
  );
  const estYield = getYieldResult.estYield;
  console.log("  ", new Date(), "Proposed position yield", estYield);

  // Return early if the estimated yield is below the minimum yield
  if (estYield < DEVNET_CONFIG.minYield) {
    console.log(
      "  ",
      new Date(),
      "Skipping proposed position due to low yield",
      estYield
    );
    return;
  }

  // Open the position
  const openParams: OpenParams = {
    rangeStart: priceToTick(lowerPrice, marketConfig.stepSize),
    rangeEnd: priceToTick(upperPrice, marketConfig.stepSize),
    positionSize: DEVNET_CONFIG.positionSize * 10 ** 6,
    tickDataMapping: marketConfig.tickDataAccounts,
  };
  const openAccounts: OpenAccounts = {
    market: new PublicKey(marketConfig.address),
    mint: new PublicKey(DEVNET_CONFIG.token),
    vault: new PublicKey(marketConfig.vault),
    adminTokenAccount: new PublicKey(DEVNET_CONFIG.adminTokenAccount),
  };
  const openResult = await open(program, openParams, openAccounts, user);

  console.log(
    "  ",
    new Date(),
    "Opened proposed position",
    openResult.position.toBase58()
  );
  console.log("  ", new Date(), "TX ID", openResult.txid);
  console.log(
    "  ",
    new Date(),
    `https://devnet.parsa.finance/position/${openResult.position.toBase58()}`
  );
}

/**
 * Open a random position for a given market
 * @param market - The market to open a position for
 */
async function openRandomPosition(market: MarketConfig) {
  // get the current price of the market
  const marketData = await getMarket(connection, new PublicKey(market.address));
  const price = marketData.currentPrice;
  console.log("  ", new Date(), "Current price", price);

  let lower: number, upper: number;
  let estYield = 0;
  let openAttempts = 0;
  do {
    // generate two random prices deltas
    const delta1 = Math.random() * market.maxRandomPriceDelta;
    const delta2 = Math.random() * market.maxRandomPriceDelta;

    // subtract delta1 from price and add delta2 to price
    lower = Math.max(price - delta1, 0);
    upper = price + delta2;

    // get yield of position of only itm tick
    const getYieldResult = await getYield(market.address, lower, upper, 100);
    estYield = getYieldResult.estYield;
    console.log(
      "  ",
      new Date(),
      "Lower",
      lower,
      "Upper",
      upper,
      "Yield",
      estYield
    );
    openAttempts++;
  } while (
    estYield < DEVNET_CONFIG.minYield &&
    openAttempts < DEVNET_CONFIG.maxOpenAttempts
  );

  // Add check to prevent opening position if yield is too low
  if (estYield < DEVNET_CONFIG.minYield) {
    console.log(
      "  ",
      new Date(),
      "Skipping position due to low yield",
      estYield
    );
    return;
  }

  // open the position
  const openParams: OpenParams = {
    rangeStart: priceToTick(lower, market.stepSize),
    rangeEnd: priceToTick(upper, market.stepSize),
    positionSize: DEVNET_CONFIG.positionSize * 10 ** 6,
    tickDataMapping: market.tickDataAccounts,
  };
  const openAccounts: OpenAccounts = {
    market: new PublicKey(market.address),
    mint: new PublicKey(DEVNET_CONFIG.token),
    vault: new PublicKey(market.vault),
    adminTokenAccount: new PublicKey(DEVNET_CONFIG.adminTokenAccount),
  };
  const openResult = await open(program, openParams, openAccounts, user);

  console.log(
    "  ",
    new Date(),
    "Opened position",
    openResult.position.toBase58()
  );
  console.log("  ", new Date(), "TX ID", openResult.txid);
  console.log(
    "  ",
    new Date(),
    `https://devnet.parsa.finance/position/${openResult.position.toBase58()}`
  );
}

/**
 * Close a position with a given id
 * @param position - The position to close
 * @param markets - The markets to search through
 */
async function closePosition(position: OpenPosition, markets: Market[]) {
  console.log("    ", new Date(), "Closing position", position.id);
  const market = markets.find((m: any) => m.name === position.marketName)!;
  const marketConfig = DEVNET_CONFIG.markets.find(
    (m: MarketConfig) => m.address === market.address
  )!;
  const closeAccounts: CloseAccounts = {
    position: new PublicKey(position.id),
    market: new PublicKey(marketConfig.address),
    mint: new PublicKey(DEVNET_CONFIG.token),
    vault: new PublicKey(marketConfig.vault),
    adminTokenAccount: new PublicKey(DEVNET_CONFIG.adminTokenAccount),
    tickDataMapping: marketConfig.tickDataAccounts,
  };
  const closeResult = await close(program, closeAccounts, user);
  console.log("    ", new Date(), "Closed position", position.id);
  console.log("    ", new Date(), "TX ID", closeResult);
  console.log(
    "    ",
    new Date(),
    `https://devnet.parsa.finance/position/${position.id}`
  );
}

/**
 * Close all negative yield positions
 */
async function closeNegativeYieldPositions() {
  // get all open positions
  const getPositionsResult = await getPositions(user.publicKey.toBase58());
  const positions = getPositionsResult.positions;

  if (!getPositionsResult.markets) {
    console.log(new Date(), "No open positions");
    return;
  }

  const markets = getPositionsResult.markets;
  for (const position of positions) {
    // skip closed positions
    if (position.status === "Closed") {
      continue;
    }

    console.log("  ", new Date(), "Processing position", position.id);

    // if position.yield is negative, close the position
    console.log("    ", new Date(), "Yield", position.yield);

    if (position.yield < DEVNET_CONFIG.minYield) {
      await closePosition(position, markets);
    }
  }
}

/**
 * Fetch general sentiment from LunarCrush
 */
async function getGeneralSentiment(): Promise<any> {
  const sentimentResponse = await fetch(
    "https://lunarcrush.com/api4/public/topic/bitcoin/v1",
    {
      headers: {
        Authorization: `Bearer ${process.env.LUNARCRUSH_API_KEY}`,
      },
    }
  ).then((res) => res.json());

  const { topic_rank, types_sentiment, trend } = sentimentResponse.data;
  return { topic_rank, types_sentiment, trend };
}

/**
 * Fetch news from LunarCrush
 */
async function getNews(): Promise<any[]> {
  const newsResponse = await fetch(
    "https://lunarcrush.com/api4/public/topic/bitcoin/news/v1",
    {
      headers: {
        Authorization: `Bearer ${process.env.LUNARCRUSH_API_KEY}`,
      },
    }
  ).then((res) => res.json());

  return newsResponse.data.map((item: any) => ({
    post_title: item.post_title,
    post_created: item.post_created,
    post_sentiment: item.post_sentiment,
    creator_display_name: item.creator_display_name,
  }));
}

/**
 * Query ChatGPT 4o mini with the initial prompt and data payload
 */
async function queryChatGPT(prompt: string): Promise<ChatGPTResponse | null> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [{ role: "user", content: INITIAL_PROMPT + "\n\n" + prompt }],
    });

    let jsonResponse = completion.choices[0].message.content!;

    // Remove backticks and the "json" string from the beginning
    jsonResponse = jsonResponse.replace(/```json|```/g, "").trim();

    // Parse the JSON response
    const parsedData = JSON.parse(jsonResponse);

    // Type assertion to ensure the parsed data matches the ChatGPTResponse interface
    const chatGPTResponse: ChatGPTResponse = {
      marketAnalysis: {
        currentPrice: parsedData.marketAnalysis.currentPrice,
        generalSentiment: parsedData.marketAnalysis.generalSentiment,
        significantNews: parsedData.marketAnalysis.significantNews,
        oneHourPricePrediction:
          parsedData.marketAnalysis.oneHourPricePrediction,
        oneDayPricePrediction: parsedData.marketAnalysis.oneDayPricePrediction,
        oneWeekPricePrediction:
          parsedData.marketAnalysis.oneWeekPricePrediction,
      },
      proposedPositions: parsedData.proposedPositions,
      positionsToClose: parsedData.positionsToClose,
      reasonForClosing: parsedData.reasonForClosing,
    };

    return chatGPTResponse;
  } catch (error) {
    console.error("Error querying or parsing ChatGPT response:", error);
    return null;
  }
}

/**
 * Simple strategy that closes negative yield positions and opens random new positive yield positions
 */
async function strategy1() {
  try {
    // close negative yield positions
    console.log(new Date(), "Closing any negative yield positions");
    await closeNegativeYieldPositions();

    // wait a few seconds so that the txs are indexed
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // get number of open positions
    const userStats = await getUserStats(program, user.publicKey.toBase58());
    let numOpenPositions = userStats?.numOpen ?? 0;
    console.log(new Date(), "Number of open positions", numOpenPositions);

    // process each market
    const shuffledMarkets = [...DEVNET_CONFIG.markets].sort(
      () => Math.random() - 0.5
    );
    for (const market of shuffledMarkets) {
      console.log(new Date(), "Processing market", market.name);

      // if number of open positions is less than max open positions, open a random position
      if (numOpenPositions < DEVNET_CONFIG.maxOpenPositions) {
        console.log(new Date(), "Opening position for market", market.name);
        await openRandomPosition(market);
        numOpenPositions++;
      } else {
        console.log(new Date(), "Max open positions reached");
      }
    }
  } catch (error) {
    console.error(new Date(), "Error running trades:", error);
  }
}

/**
 * LLM-powered strategy that uses sentiment data, news and a thesis to open and close positions
 */
async function strategy2() {
  try {
    // get and format open positions
    const getPositionsResult = await getPositions(user.publicKey.toBase58());
    const openPositionsRaw = getPositionsResult.positions.filter(
      (p: any) => p.status === "Open"
    );
    const openPositions: OpenPosition[] = openPositionsRaw.map((p: any) => {
      const stepSize = DEVNET_CONFIG.markets.find(
        (m: MarketConfig) => m.address === p.marketId
      )?.stepSize;
      return {
        marketName: p.marketName,
        id: p.id,
        lowerPrice: tickToPriceLower(p.r1, stepSize!),
        upperPrice: tickToPriceUpper(p.r2, stepSize!),
        yield: p.yield,
      };
    });
    console.log(new Date(), "Open positions", openPositions);

    // get and format data for each market
    console.log(new Date(), "Fetching and formatting market data...");
    let markets: MarketPrompt[] = [];
    for (const market of getPositionsResult.markets) {
      const price = market.currentPrice;
      const generalSentiment = await getGeneralSentiment();
      const news = await getNews();
      markets.push({
        name: market.name,
        timescale: market.timeframe,
        price,
        generalSentiment,
        news,
      });
    }

    // combine data
    const combinedData: ChatGPTPrompt = {
      markets,
      openPositions,
    };

    // query chatgpt
    console.log(new Date(), "Querying ChatGPT...");
    const chatGPTResponse = await queryChatGPT(JSON.stringify(combinedData));
    console.log(new Date(), "Parsed response", chatGPTResponse);

    // close positions
    console.log(new Date(), "Closing positions...");
    for (const positionId of chatGPTResponse?.positionsToClose ?? []) {
      const position = openPositions.find((p) => p.id === positionId)!;
      await closePosition(position, getPositionsResult.markets);
    }
    console.log(
      new Date(),
      "Closed positions",
      chatGPTResponse?.positionsToClose
    );

    // open proposed positions
    console.log(new Date(), "Opening proposed positions...");
    let numOpenPositions = openPositions.length;
    for (const proposedPosition of chatGPTResponse?.proposedPositions ?? []) {
      if (numOpenPositions >= DEVNET_CONFIG.maxOpenPositions) {
        console.log(new Date(), "Max open positions reached");
        break;
      }

      const marketConfig = DEVNET_CONFIG.markets.find(
        (m: MarketConfig) => m.name === proposedPosition.marketName
      );

      if (marketConfig) {
        await openPosition(proposedPosition, marketConfig);
        numOpenPositions++;
      } else {
        console.log(
          new Date(),
          "Market config not found for",
          proposedPosition.marketName
        );
      }
    }
  } catch (error) {
    console.error(new Date(), "Error running trades:", error);
  }
}

/**
 * Schedule the next run with a random delay
 */
function scheduleNextRun() {
  const delaySeconds =
    Math.floor(
      Math.random() *
        (DEVNET_CONFIG.maxSecondsBetweenRuns -
          DEVNET_CONFIG.minSecondsBetweenRuns +
          1)
    ) + DEVNET_CONFIG.minSecondsBetweenRuns;

  console.log(new Date(), `Scheduling next run in ${delaySeconds} seconds`);

  setTimeout(async () => {
    if (process.env.STRATEGY === "1") {
      await strategy1();
    } else if (process.env.STRATEGY === "2") {
      await strategy2();
    }
    scheduleNextRun(); // Schedule next run after completion
  }, delaySeconds * 1000);
}

// Start the trading loop
if (process.env.STRATEGY === "1") {
  strategy1().then(() => scheduleNextRun());
} else if (process.env.STRATEGY === "2") {
  strategy2().then(() => scheduleNextRun());
}
