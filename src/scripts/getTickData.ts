import { PublicKey } from "@solana/web3.js";
import { NUM_TICKS_PER_ACCOUNT } from "./constants";

export class TickDataMap {
  private static instance: TickDataMap;
  // Map market address -> (bitmap index -> tick data address)
  private tickDataAccounts: Map<string, Map<number, string>>;

  private constructor() {
    this.tickDataAccounts = new Map();
  }

  public static getInstance(): TickDataMap {
    if (!TickDataMap.instance) {
      TickDataMap.instance = new TickDataMap();
    }
    return TickDataMap.instance;
  }

  public setTickData(
    market: string,
    bitmapIndex: number,
    address: string
  ): void {
    let marketMap = this.tickDataAccounts.get(market);
    if (!marketMap) {
      marketMap = new Map();
      this.tickDataAccounts.set(market, marketMap);
    }
    marketMap.set(bitmapIndex, address);
  }

  public getTickData(market: string, bitmapIndex: number): string | undefined {
    return this.tickDataAccounts.get(market)?.get(bitmapIndex);
  }

  public clear(): void {
    this.tickDataAccounts.clear();
  }
}

export type TickDataRange = {
  tickData1: PublicKey;
  tickData2: PublicKey | null;
  startBitmapIndex: number;
  endBitmapIndex: number;
};

/**
 * Convert a price to its corresponding tick data index information
 */
export function tickToTickDataIndex(
  tick: number,
  stepSize: number
): {
  bitmapIndex: number;
  minPrice: number;
  maxPrice: number;
} {
  const bitmapIndex = Math.floor(tick / NUM_TICKS_PER_ACCOUNT);
  const minPrice = bitmapIndex * NUM_TICKS_PER_ACCOUNT * stepSize;
  const maxPrice = (bitmapIndex + 1) * NUM_TICKS_PER_ACCOUNT * stepSize;
  return { bitmapIndex, minPrice, maxPrice };
}

export type TickDataMapping = Map<number, string>;

/**
 * Get relevant TickData accounts for a given price range
 */
export async function getTickDataForRange(
  market: PublicKey,
  tickStart: number,
  tickEnd: number,
  stepSize: number,
  tickDataMapping?: TickDataMapping
): Promise<TickDataRange> {
  const startIndex = tickToTickDataIndex(tickStart, stepSize);
  const endIndex = tickToTickDataIndex(tickEnd, stepSize);

  // Use provided mapping or fallback to singleton
  const getTickData = (bitmapIndex: number): string | undefined => {
    if (tickDataMapping) {
      return tickDataMapping.get(bitmapIndex);
    }
    return TickDataMap.getInstance().getTickData(
      market.toString(),
      bitmapIndex
    );
  };

  const tickData1 = getTickData(startIndex.bitmapIndex);
  if (!tickData1) {
    throw new Error(
      `TickData not found for bitmap index ${startIndex.bitmapIndex}`
    );
  }

  let tickData2 = null;
  if (startIndex.bitmapIndex !== endIndex.bitmapIndex) {
    tickData2 = getTickData(endIndex.bitmapIndex);
    if (!tickData2) {
      throw new Error(
        `TickData not found for bitmap index ${endIndex.bitmapIndex}`
      );
    }
  }

  return {
    tickData1: new PublicKey(tickData1),
    tickData2: tickData2 ? new PublicKey(tickData2) : null,
    startBitmapIndex: startIndex.bitmapIndex,
    endBitmapIndex: endIndex.bitmapIndex,
  };
}
