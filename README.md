# parsa-trading-bot-example

A simple trading bot for Parsa on Solana Devnet. Not recommended for use as-is, but rather as an example of how to use the Parsa API and scripts to open and close positions.

## Setup

1. [Set up Solana CLI](https://solana.com/docs/intro/installation) and [fund it with some devnet SOL](https://faucet.solana.com/).

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables (make sure to set `ANCHOR_WALLET` to your wallet key location):

```bash
cp .env.example .env
```

4. Run the bot:

```bash
bun run start
```
