import { ComputeBudgetProgram, PublicKey, Transaction } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from "@solana/spl-token";
import { Program } from "@coral-xyz/anchor";
import { type Parsa } from "./parsa";
import { getTickDataForRange, type TickDataMapping } from "./getTickData";
import { getMarket } from "./getMarket";
import { type SignerOrWallet } from "./types";

export interface CloseAccounts {
  position: PublicKey;
  market: PublicKey;
  mint: PublicKey;
  vault: PublicKey;
  adminTokenAccount: PublicKey;
  tickDataMapping?: TickDataMapping;
}

export interface CloseOptions {
  priorityFee?: number;
}

export async function close(
  program: Program<Parsa>,
  accounts: CloseAccounts,
  signerOrWallet: SignerOrWallet,
  options?: CloseOptions,
  originalOwner?: PublicKey,
  stepSize?: number,
  r1?: number,
  r2?: number
): Promise<string> {
  // Get user token account
  const userTokenAccount = await getAssociatedTokenAddress(
    accounts.mint,
    signerOrWallet.publicKey
  );

  // Find PDA for user stats
  const [userStats] = await PublicKey.findProgramAddress(
    [Buffer.from("user_stats"), signerOrWallet.publicKey.toBuffer()],
    program.programId
  );

  // Fetch position data to get tick range
  let positionData, rangeStart, rangeEnd;
  if (r1 && r2) {
    rangeStart = r1;
    rangeEnd = r2;
  } else {
    positionData = await program.account.positionData.fetch(accounts.position);
    rangeStart = positionData.r1.toNumber();
    rangeEnd = positionData.r2.toNumber();
  }

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
    rangeStart,
    rangeEnd,
    stepSize!,
    accounts.tickDataMapping
  );

  const closeAccounts = {
    market: accounts.market,
    position: accounts.position,
    userStats,
    adminTokenAccount: accounts.adminTokenAccount,
    signer: signerOrWallet.publicKey,
    userTokenAccount,
    vault: accounts.vault,
    tokenProgram: TOKEN_PROGRAM_ID,
    tickData1: tickDataAccounts.tickData1,
    tickData2: tickDataAccounts.tickData2,
  };

  // increase compute unit limit
  const increaseComputeUnitLimitIx = ComputeBudgetProgram.setComputeUnitLimit({
    units: 1_400_000,
  });

  const closeIx = await program.methods
    .close(originalOwner ?? signerOrWallet.publicKey, null)
    .accounts(closeAccounts)
    .instruction();

  const tx = new Transaction().add(increaseComputeUnitLimitIx, closeIx);

  const txid = await program.provider.sendAndConfirm?.(tx);

  if (!txid) {
    throw new Error("Transaction failed");
  }

  // index the tx in parsa's db -- wait a few seconds to ensure we can fetch it
  setTimeout(async () => {
    try {
      const response = await fetch(
        `https://devnet.parsa.finance/api/indexTx/${txid}`
      );
      if (!response.ok) {
        console.error(
          `Failed to index transaction: ${response.status} ${response.statusText}`
        );
        // Optionally add response body for more detail
        const errorBody = await response.text();
        console.error("Error body:", errorBody);
      }
    } catch (e) {
      console.error("Failed to index transaction:", e);
    }
  }, 7000);

  return txid;
}
