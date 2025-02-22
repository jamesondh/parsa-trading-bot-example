import { BN, Program } from "@coral-xyz/anchor";
import {
  PublicKey,
  Transaction,
  VersionedTransaction,
  type Signer,
} from "@solana/web3.js";
import { type Parsa } from "./parsa";

export type PositionDataWithSolanaTypes = Awaited<
  ReturnType<Program<Parsa>["account"]["positionData"]["fetch"]>
>;

export type PositionData =
  PublicKeyAndBNToBasicTypes<PositionDataWithSolanaTypes>;

export type PositionsWithAccounts = {
  positions: PositionData[];
  positionAccounts: string[];
};

export type UserStatsWithSolanaTypes = Awaited<
  ReturnType<Program<Parsa>["account"]["userStats"]["fetch"]>
>;

export type UserStats = PublicKeyAndBNToBasicTypes<UserStatsWithSolanaTypes>;

export type MarketDataWithSolanaTypes = Awaited<
  ReturnType<Program<Parsa>["account"]["marketData"]["fetch"]>
>;

// MarketData excluding padding, initialized_tick_accounts_bitmap, and pending states
export type RelevantMarketDataWithSolanaTypes = Omit<
  MarketDataWithSolanaTypes,
  | "initializedTickAccountsBitmap"
  | "padding0"
  | "padding1"
  | "padding2"
  | "padding3"
  | "padding4"
  | "padding5"
  | "padding6"
  | "oracleProvider"
  | "pendingOpenFeePercentage"
  | "pendingOpenFeeFloor"
  | "pendingCloseFeePercentage"
  | "pendingCloseFeeFloor"
  | "pendingFeeTimestamp"
  | "pendingAlpha"
  | "pendingMinUpdateInterval"
  | "pendingUpdateFrequencyTimestamp"
  | "pendingAdmin"
  | "pendingAdminTimestamp"
  | "pendingFeeCollector"
  | "pendingFeeCollectorTimestamp"
  | "pendingTimelockDuration"
  | "pendingTimelockDurationTimestamp"
  | "pendingFeedId"
  | "pendingPriceUpdate"
  | "pendingOracleProvider"
  | "pendingOracleTimestamp"
>;

export type PublicKeyAndBNToBasicTypes<T> = {
  [K in keyof T]: T[K] extends PublicKey
    ? string
    : T[K] extends BN | string
    ? number
    : T[K];
};

export type RelevantMarketData =
  PublicKeyAndBNToBasicTypes<RelevantMarketDataWithSolanaTypes>;

export function convertToBasicTypes<T extends Record<string, any>>(
  obj: T
): PublicKeyAndBNToBasicTypes<T> {
  return Object.keys(obj).reduce((acc: Record<string, any>, key) => {
    const value = obj[key];

    // Handle actual PublicKey instances
    if (value instanceof PublicKey) {
      acc[key] = value.toBase58();
    }
    // Handle PublicKey-like objects (have _bn property)
    else if (value && typeof value === "object" && "_bn" in value) {
      acc[key] = new PublicKey(value).toBase58();
    }
    // Handle BN instances
    else if (
      value instanceof BN ||
      (value &&
        typeof value === "object" &&
        "words" in value &&
        "negative" in value)
    ) {
      acc[key] = value.toNumber();
    }
    // Handle arrays
    else if (Array.isArray(value)) {
      acc[key] = value.map((item) =>
        typeof item === "object" && item !== null
          ? convertToBasicTypes(item)
          : item
      );
    } else {
      acc[key] = value;
    }

    return acc;
  }, {}) as PublicKeyAndBNToBasicTypes<T>;
}

export type SignerOrWallet =
  | Signer
  | {
      publicKey: PublicKey;
      signTransaction?: <T extends Transaction | VersionedTransaction>(
        transaction: T
      ) => Promise<T>;
    };

export interface TransactionOptions {
  simulateOnly?: boolean;
  priorityFee?: number;
  computeUnitLimit?: number;
  checkExistingAccounts?: boolean; // Optional: check if accounts already exist
  simulationResult?: TransactionCostEstimate;
}

export interface TransactionCostEstimate {
  baseCost: number; // Base transaction fee in SOL
  priorityFee: number; // Priority fee in SOL
  rentCost?: number; // Rent for new accounts in SOL
  totalCost: number; // Total cost in SOL
}

export interface TransactionResult {
  txid: string;
  txLogs?: string[];
  simulation?: TransactionCostEstimate;
}

export interface Tick {
  qWeight: number;
  multiplicator: number;
}
