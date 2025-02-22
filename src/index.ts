import { DEVNET_CONFIG, type MarketConfig } from "./markets";
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

async function closeNegativeYieldPositions() {
  // get all open positions
  const getPositionsResult = await getPositions(user.publicKey.toBase58());
  const positions = getPositionsResult.positions;
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
      console.log("    ", new Date(), "Closing position", position.id);
      const market = markets.find((m: any) => m.address === position.marketId);
      const marketConfig = DEVNET_CONFIG.markets.find(
        (m: MarketConfig) => m.address === market.address
      );
      const closeAccounts: CloseAccounts = {
        position: new PublicKey(position.id),
        market: new PublicKey(market.address),
        mint: new PublicKey(DEVNET_CONFIG.token),
        vault: new PublicKey(market.vault),
        adminTokenAccount: new PublicKey(DEVNET_CONFIG.adminTokenAccount),
        tickDataMapping: marketConfig?.tickDataAccounts,
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
  }
}

/**
 * Run the trading bot
 */
async function runTrades() {
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
    await runTrades();
    scheduleNextRun(); // Schedule next run after completion
  }, delaySeconds * 1000);
}

// Start the trading loop
runTrades().then(() => scheduleNextRun());
