import { PublicKey } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import { type Parsa } from "./parsa";
import {
  type UserStats,
  type UserStatsWithSolanaTypes,
  convertToBasicTypes,
} from "./types";

export async function getUserStats(
  program: Program<Parsa>,
  user: string
): Promise<UserStats | undefined> {
  // calculate PDA
  const [userStatsPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("user_stats"), new PublicKey(user).toBuffer()],
    program.programId
  );

  let userStats: UserStatsWithSolanaTypes;
  try {
    const userStatsAccount = await program.account.userStats.fetch(
      userStatsPda
    );
    userStats = userStatsAccount as UserStatsWithSolanaTypes;
  } catch (e) {
    console.log("User stats not found");
    return undefined;
  }

  return convertToBasicTypes(userStats);
}
