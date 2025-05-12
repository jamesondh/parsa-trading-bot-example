import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  ComputeBudgetProgram,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from "@solana/spl-token";
import { Program, BN } from "@coral-xyz/anchor";
import { type Parsa } from "./parsa";
import { getMarket } from "./getMarket";
import { getTickDataForRange, type TickDataMapping } from "./getTickData";
import type { SignerOrWallet, TransactionCostEstimate } from "./types";
import { getPositionAccountSize } from "./utils";
import { USER_STATS_ACCOUNT_SIZE } from "./constants";

export interface OpenParams {
  rangeStart: number;
  rangeEnd: number;
  positionSize: number;
  tickDataMapping?: TickDataMapping;
  to?: PublicKey;
}

export interface OpenAccounts {
  market: PublicKey;
  mint: PublicKey;
  vault: PublicKey;
  adminTokenAccount: PublicKey;
}

export interface OpenResult {
  position: PublicKey;
  userStats: PublicKey;
  txid: string;
  txLogs?: string[];
  simulation?: TransactionCostEstimate;
}

export interface OpenOptions {
  priorityFee?: number;
  simulateOnly?: boolean;
  checkExistingAccounts?: boolean;
}

export async function open(
  program: Program<Parsa>,
  params: OpenParams,
  accounts: OpenAccounts,
  signerOrWallet: SignerOrWallet,
  options?: OpenOptions,
  stepSize?: number
): Promise<OpenResult> {
  // Get user token account
  const userTokenAccount = await getAssociatedTokenAddress(
    accounts.mint,
    signerOrWallet.publicKey
  );

  // Get position owner
  const to = params.to ?? signerOrWallet.publicKey;

  // Find PDA for user stats
  const [userStats] = await PublicKey.findProgramAddress(
    [Buffer.from("user_stats"), to.toBuffer()],
    program.programId
  );

  // Generate random seed for position PDA
  const positionSeed = crypto.getRandomValues(new Uint8Array(16));

  // Find PDA for position
  const [position] = await PublicKey.findProgramAddress(
    [
      Buffer.from("position"),
      accounts.market.toBuffer(),
      to.toBuffer(),
      new BN(params.rangeStart).toArrayLike(Buffer, "le", 8),
      new BN(params.rangeEnd).toArrayLike(Buffer, "le", 8),
      new BN(params.positionSize).toArrayLike(Buffer, "le", 8),
      positionSeed,
    ],
    program.programId
  );

  // Get step_size from market if not provided
  if (!stepSize) {
    const marketData = await getMarket(
      program.provider.connection,
      accounts.market
    );
    stepSize = marketData.stepSize;
  }

  // Get relevant tick data accounts with optional mapping
  const tickDataAccounts = await getTickDataForRange(
    accounts.market,
    params.rangeStart,
    params.rangeEnd,
    stepSize!,
    params.tickDataMapping
  );

  // increase compute unit limit
  const increaseComputeUnitLimitIx = ComputeBudgetProgram.setComputeUnitLimit({
    units: 1_000_000,
  });

  const openAccounts = {
    market: accounts.market,
    userStats,
    position,
    adminTokenAccount: accounts.adminTokenAccount,
    signer: signerOrWallet.publicKey,
    userTokenAccount,
    vault: accounts.vault,
    mint: accounts.mint,
    tokenProgram: TOKEN_PROGRAM_ID,
    systemProgram: SystemProgram.programId,
    tickData1: tickDataAccounts.tickData1,
    tickData2: tickDataAccounts.tickData2,
  };

  // Calculate rent costs if simulating
  let simulationResult: TransactionCostEstimate | undefined;
  if (options?.simulateOnly) {
    let rentCost = 0;

    // Position account rent (always required)
    const positionRent =
      await program.provider.connection.getMinimumBalanceForRentExemption(
        getPositionAccountSize(params.rangeEnd - params.rangeStart + 1)
      );
    rentCost += positionRent;

    // Check if UserStats account needs to be created
    if (options?.checkExistingAccounts) {
      try {
        const [userStatsAddress] = await PublicKey.findProgramAddress(
          [Buffer.from("user_stats"), to.toBuffer()],
          program.programId
        );

        const userStatsAccount =
          await program.provider.connection.getAccountInfo(userStatsAddress);

        if (!userStatsAccount) {
          const userStatsRent =
            await program.provider.connection.getMinimumBalanceForRentExemption(
              USER_STATS_ACCOUNT_SIZE
            );
          rentCost += userStatsRent;
        }
      } catch (e) {
        console.warn(
          "Failed to check UserStats account, including rent in estimate"
        );
        const userStatsRent =
          await program.provider.connection.getMinimumBalanceForRentExemption(
            USER_STATS_ACCOUNT_SIZE
          );
        rentCost += userStatsRent;
      }
    }

    simulationResult = {
      baseCost: 0,
      priorityFee: 0,
      rentCost: rentCost / LAMPORTS_PER_SOL,
      totalCost: rentCost / LAMPORTS_PER_SOL,
    };
  }

  const openIx = await program.methods
    .open(
      new BN(params.rangeStart),
      new BN(params.rangeEnd),
      new BN(params.positionSize),
      Array.from(positionSeed),
      to,
      null // minLambda TODO implement a parameter for this
    )
    .accounts(openAccounts)
    .instruction();

  const tx = new Transaction().add(increaseComputeUnitLimitIx, openIx);

  const txid = await program.provider.sendAndConfirm?.(tx);

  if (!txid) {
    throw new Error("Transaction failed");
  }

  return {
    position,
    userStats,
    txid,
    simulation: simulationResult,
  };
}
