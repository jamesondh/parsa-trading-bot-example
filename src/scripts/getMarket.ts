import { Connection, PublicKey } from "@solana/web3.js";
import { MARKET_DATA_HEADER_SIZE } from "./constants";
import {
  type RelevantMarketData,
  type RelevantMarketDataWithSolanaTypes,
  convertToBasicTypes,
} from "./types.ts";
import { BN } from "@coral-xyz/anchor";

export async function getMarket(
  connection: Connection,
  marketAddress: PublicKey
): Promise<RelevantMarketData> {
  let accountInfo;
  try {
    accountInfo = await connection.getAccountInfo(marketAddress, {
      dataSlice: {
        offset: 0,
        length: MARKET_DATA_HEADER_SIZE,
      },
    });
  } catch (e) {
    console.error(e);
  }

  if (!accountInfo) {
    throw new Error("Market account not found");
  }

  // Skip the 8-byte discriminator
  const data = accountInfo.data.slice(8);
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  let offset = 0;

  // Helper function to advance offset
  const advance = (bytes: number) => {
    const current = offset;
    offset += bytes;
    return current;
  };

  const market: RelevantMarketDataWithSolanaTypes = {
    tokenMint: new PublicKey(data.slice(advance(32), offset)),
    decimals: view.getUint8(advance(1)),
  } as RelevantMarketDataWithSolanaTypes;

  // 7 bytes padding
  advance(7);

  market.admin = new PublicKey(data.slice(advance(32), offset));
  market.customUserFeeSetter = new PublicKey(data.slice(advance(32), offset));
  market.tickDataAccountCreator = new PublicKey(
    data.slice(advance(32), offset)
  );

  market.alpha = view.getFloat64(advance(8), true);
  market.feedId = Array.from(data.slice(advance(32), offset));
  market.priceUpdate = new PublicKey(data.slice(advance(32), offset));
  market.lastUpdateTimestamp = new BN(
    view.getBigInt64(advance(8), true).toString()
  );
  market.minUpdateInterval = view.getUint16(advance(2), true);

  // 6 bytes padding
  advance(6);

  market.totalDeposited = view.getFloat64(advance(8), true);
  market.totalExited = view.getFloat64(advance(8), true);
  market.totalFeesCollected = view.getFloat64(advance(8), true);
  market.numOpen = new BN(view.getBigInt64(advance(8), true).toString());
  market.numClosed = new BN(view.getBigInt64(advance(8), true).toString());

  advance(
    8 + // pending_open_fee_percentage
      8 + // pending_open_fee_floor
      8 + // pending_close_fee_percentage
      8 + // pending_close_fee_floor
      8 + // pending_fee_timestamp
      8 + // pending_alpha
      2 + // pending_min_update_interval
      6 + // _padding4
      8 + // pending_update_frequency_timestamp
      32 + // pending_admin
      8 + // pending_admin_timestamp
      32 + // pending_feed_id
      32 + // pending_price_update
      1 + // pending_oracle_provider
      7 + // _padding5
      8 // pending_oracle_timestamp
  );

  market.isOpenPaused = view.getUint8(advance(1));
  market.isPriceFeedPaused = view.getUint8(advance(1));

  advance(
    6 + // padding6
      32 + // pending_custom_user_fee_setter
      8 // pending_custom_user_fee_setter_timestamp
  );

  market.currentPrice = view.getFloat64(advance(8), true);
  market.stepSize = view.getFloat64(advance(8), true);
  market.openInterest = view.getFloat64(advance(8), true);
  market.numPriceFeedCalls = new BN(
    view.getBigInt64(advance(8), true).toString()
  );
  market.globalShift = view.getFloat64(advance(8), true);
  market.openFeePercentage = view.getFloat64(advance(8), true);
  market.openFeeFloor = view.getFloat64(advance(8), true);
  market.closeFeePercentage = view.getFloat64(advance(8), true);
  market.closeFeeFloor = view.getFloat64(advance(8), true);

  return convertToBasicTypes(market);
}
