export const PARSA_IDL = {
  address: "CzQLGepxHuu9sQ66jjgq2osCGRyoTbhaUrKQVxjjy8gV",
  metadata: {
    name: "parsa",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  instructions: [
    {
      name: "cancel_pending_admin",
      discriminator: [96, 213, 92, 102, 118, 54, 82, 93],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [],
    },
    {
      name: "cancel_pending_custom_user_fee_setter",
      discriminator: [237, 200, 135, 17, 130, 171, 221, 200],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [],
    },
    {
      name: "cancel_pending_fee",
      discriminator: [36, 129, 126, 217, 77, 252, 83, 220],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [],
    },
    {
      name: "cancel_pending_oracle",
      discriminator: [127, 101, 42, 204, 128, 70, 107, 52],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [],
    },
    {
      name: "cancel_pending_update_frequency",
      discriminator: [116, 126, 209, 247, 96, 76, 143, 207],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [],
    },
    {
      name: "close",
      discriminator: [98, 165, 201, 177, 108, 65, 206, 96],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "position",
          writable: true,
        },
        {
          name: "user_stats",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [117, 115, 101, 114, 95, 115, 116, 97, 116, 115],
              },
              {
                kind: "account",
                path: "position.owner",
                account: "PositionData",
              },
            ],
          },
        },
        {
          name: "admin_token_account",
          writable: true,
        },
        {
          name: "signer",
          writable: true,
          signer: true,
        },
        {
          name: "user_token_account",
          writable: true,
        },
        {
          name: "vault",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [118, 97, 117, 108, 116],
              },
              {
                kind: "account",
                path: "market",
              },
            ],
          },
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          name: "tick_data_1",
          writable: true,
        },
        {
          name: "tick_data_2",
          writable: true,
          optional: true,
        },
      ],
      args: [
        {
          name: "original_owner",
          type: "pubkey",
        },
        {
          name: "min_amount_to_user",
          type: {
            option: "f64",
          },
        },
      ],
    },
    {
      name: "finalize_set_admin",
      discriminator: [236, 55, 59, 235, 142, 100, 117, 85],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [],
    },
    {
      name: "finalize_set_custom_user_fee_setter",
      discriminator: [31, 208, 232, 17, 189, 224, 86, 91],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [],
    },
    {
      name: "finalize_set_fee",
      discriminator: [103, 101, 254, 135, 120, 9, 144, 134],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [],
    },
    {
      name: "finalize_set_oracle",
      discriminator: [171, 148, 22, 180, 28, 70, 69, 246],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [],
    },
    {
      name: "finalize_set_update_frequency",
      discriminator: [27, 50, 82, 36, 181, 132, 74, 58],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [],
    },
    {
      name: "initialize_market",
      discriminator: [35, 35, 189, 193, 155, 48, 170, 203],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "vault",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [118, 97, 117, 108, 116],
              },
              {
                kind: "account",
                path: "market",
              },
            ],
          },
        },
        {
          name: "signer",
          writable: true,
          signer: true,
        },
        {
          name: "mint",
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
        {
          name: "rent",
          address: "SysvarRent111111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "step_size",
          type: "f64",
        },
        {
          name: "frequency",
          type: "f64",
        },
        {
          name: "feed_id",
          type: {
            array: ["u8", 32],
          },
        },
        {
          name: "price_update",
          type: "pubkey",
        },
        {
          name: "oracle_provider",
          type: "u8",
        },
        {
          name: "min_update_interval",
          type: "u16",
        },
        {
          name: "decimals",
          type: "u8",
        },
        {
          name: "admin",
          type: "pubkey",
        },
        {
          name: "open_fee_percentage",
          type: "f64",
        },
        {
          name: "open_fee_floor",
          type: "f64",
        },
        {
          name: "close_fee_percentage",
          type: "f64",
        },
        {
          name: "close_fee_floor",
          type: "f64",
        },
      ],
    },
    {
      name: "initialize_ticks",
      discriminator: [31, 193, 36, 143, 122, 208, 187, 242],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "tick_data",
          writable: true,
        },
        {
          name: "signer",
          writable: true,
          signer: true,
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "bitmap_index",
          type: "u64",
        },
      ],
    },
    {
      name: "open",
      discriminator: [228, 220, 155, 71, 199, 189, 60, 45],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "tick_data_1",
          writable: true,
        },
        {
          name: "tick_data_2",
          writable: true,
          optional: true,
        },
        {
          name: "user_stats",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [117, 115, 101, 114, 95, 115, 116, 97, 116, 115],
              },
              {
                kind: "arg",
                path: "to.unwrap_or(signer",
              },
            ],
          },
        },
        {
          name: "position",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [112, 111, 115, 105, 116, 105, 111, 110],
              },
              {
                kind: "account",
                path: "market",
              },
              {
                kind: "arg",
                path: "to.unwrap_or(signer",
              },
              {
                kind: "arg",
                path: "r1",
              },
              {
                kind: "arg",
                path: "r2",
              },
              {
                kind: "arg",
                path: "amount",
              },
              {
                kind: "arg",
                path: "position_seed",
              },
            ],
          },
        },
        {
          name: "admin_token_account",
          writable: true,
        },
        {
          name: "signer",
          writable: true,
          signer: true,
        },
        {
          name: "user_token_account",
          writable: true,
        },
        {
          name: "vault",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [118, 97, 117, 108, 116],
              },
              {
                kind: "account",
                path: "market",
              },
            ],
          },
        },
        {
          name: "mint",
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "r1",
          type: "u64",
        },
        {
          name: "r2",
          type: "u64",
        },
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "position_seed",
          type: {
            array: ["u8", 16],
          },
        },
        {
          name: "to",
          type: {
            option: "pubkey",
          },
        },
        {
          name: "min_lambda",
          type: {
            option: "f64",
          },
        },
      ],
    },
    {
      name: "price_feed_pyth",
      discriminator: [99, 109, 3, 143, 42, 211, 235, 191],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "tick_data_1",
          writable: true,
        },
        {
          name: "tick_data_2",
          writable: true,
          optional: true,
        },
        {
          name: "price_update",
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [],
    },
    {
      name: "price_feed_stork",
      discriminator: [125, 132, 251, 152, 41, 100, 26, 132],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "tick_data_1",
          writable: true,
        },
        {
          name: "tick_data_2",
          writable: true,
          optional: true,
        },
        {
          name: "feed",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [115, 116, 111, 114, 107, 95, 102, 101, 101, 100],
              },
              {
                kind: "arg",
                path: "feed_id",
              },
            ],
            program: {
              kind: "const",
              value: [
                13, 9, 158, 172, 160, 66, 246, 238, 223, 39, 184, 53, 115, 54,
                127, 223, 22, 38, 40, 189, 145, 81, 228, 189, 147, 79, 227, 103,
                124, 76, 63, 231,
              ],
            },
          },
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [
        {
          name: "feed_id",
          type: {
            array: ["u8", 32],
          },
        },
      ],
    },
    {
      name: "set_custom_user_fee",
      discriminator: [195, 72, 107, 211, 188, 49, 235, 165],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "user_stats",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [117, 115, 101, 114, 95, 115, 116, 97, 116, 115],
              },
              {
                kind: "account",
                path: "user",
              },
            ],
          },
        },
        {
          name: "user",
        },
        {
          name: "signer",
          writable: true,
          signer: true,
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "open_fee_percentage",
          type: {
            option: "f64",
          },
        },
        {
          name: "open_fee_floor",
          type: {
            option: "f64",
          },
        },
        {
          name: "close_fee_percentage",
          type: {
            option: "f64",
          },
        },
        {
          name: "close_fee_floor",
          type: {
            option: "f64",
          },
        },
      ],
    },
    {
      name: "set_pending_admin",
      discriminator: [248, 204, 95, 229, 240, 21, 219, 3],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [
        {
          name: "admin",
          type: "pubkey",
        },
      ],
    },
    {
      name: "set_pending_custom_user_fee_setter",
      discriminator: [184, 67, 209, 208, 26, 41, 12, 19],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [
        {
          name: "custom_user_fee_setter",
          type: "pubkey",
        },
      ],
    },
    {
      name: "set_pending_fee",
      discriminator: [93, 97, 206, 112, 192, 198, 119, 194],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [
        {
          name: "open_fee_percentage",
          type: "f64",
        },
        {
          name: "open_fee_floor",
          type: "f64",
        },
        {
          name: "close_fee_percentage",
          type: "f64",
        },
        {
          name: "close_fee_floor",
          type: "f64",
        },
      ],
    },
    {
      name: "set_pending_oracle",
      discriminator: [146, 126, 210, 61, 4, 53, 210, 171],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [
        {
          name: "feed_id",
          type: {
            array: ["u8", 32],
          },
        },
        {
          name: "price_update",
          type: "pubkey",
        },
        {
          name: "oracle_provider",
          type: "u8",
        },
      ],
    },
    {
      name: "set_pending_update_frequency",
      discriminator: [148, 35, 189, 248, 154, 46, 85, 131],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [
        {
          name: "frequency",
          type: "f64",
        },
        {
          name: "min_update_interval",
          type: "u16",
        },
      ],
    },
    {
      name: "set_tick_data_account_creator",
      discriminator: [75, 216, 181, 176, 253, 72, 33, 177],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [
        {
          name: "tick_data_account_creator",
          type: "pubkey",
        },
      ],
    },
    {
      name: "toggle_pause_open",
      discriminator: [118, 62, 111, 166, 122, 138, 169, 26],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [],
    },
    {
      name: "toggle_pause_price_feed",
      discriminator: [112, 189, 146, 164, 140, 153, 23, 196],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "signer",
          signer: true,
        },
      ],
      args: [],
    },
    {
      name: "transfer_position",
      discriminator: [139, 130, 102, 147, 135, 77, 113, 222],
      accounts: [
        {
          name: "market",
          writable: true,
        },
        {
          name: "position",
          writable: true,
        },
        {
          name: "from_user_stats",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [117, 115, 101, 114, 95, 115, 116, 97, 116, 115],
              },
              {
                kind: "account",
                path: "signer",
              },
            ],
          },
        },
        {
          name: "to_user_stats",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [117, 115, 101, 114, 95, 115, 116, 97, 116, 115],
              },
              {
                kind: "arg",
                path: "new_owner",
              },
            ],
          },
        },
        {
          name: "signer",
          writable: true,
          signer: true,
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "original_owner",
          type: "pubkey",
        },
        {
          name: "new_owner",
          type: "pubkey",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "MarketData",
      discriminator: [90, 40, 242, 109, 150, 54, 18, 172],
    },
    {
      name: "PositionData",
      discriminator: [85, 195, 241, 79, 124, 192, 79, 11],
    },
    {
      name: "PriceUpdateV2",
      discriminator: [34, 241, 35, 99, 157, 126, 244, 205],
    },
    {
      name: "TemporalNumericValueFeed",
      discriminator: [37, 166, 65, 196, 29, 105, 97, 161],
    },
    {
      name: "TickData",
      discriminator: [245, 142, 47, 181, 161, 183, 31, 221],
    },
    {
      name: "UserStats",
      discriminator: [176, 223, 136, 27, 122, 79, 32, 227],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "NotPositionOwner",
      msg: "User is not the owner of the position.",
    },
    {
      code: 6001,
      name: "InvalidTokenMint",
      msg: "Invalid token mint for this market.",
    },
    {
      code: 6002,
      name: "UpdateTooFrequent",
      msg: "Price update too frequent.",
    },
    {
      code: 6003,
      name: "NotAdmin",
      msg: "Caller is not the admin.",
    },
    {
      code: 6004,
      name: "NotCustomUserFeeSetter",
      msg: "Caller is not the custom user fee setter.",
    },
    {
      code: 6005,
      name: "InvalidUserTokenAccount",
      msg: "Invalid user token account.",
    },
    {
      code: 6006,
      name: "InvalidAdminTokenAccount",
      msg: "Invalid admin token account.",
    },
    {
      code: 6007,
      name: "InvalidPriceUpdate",
      msg: "Invalid price update account.",
    },
    {
      code: 6008,
      name: "NoPendingChange",
      msg: "No pending change.",
    },
    {
      code: 6009,
      name: "ChangeLocked",
      msg: "Change locked.",
    },
    {
      code: 6010,
      name: "OpenPaused",
      msg: "Opening positions are paused.",
    },
    {
      code: 6011,
      name: "PriceFeedPaused",
      msg: "Price feed is paused.",
    },
    {
      code: 6012,
      name: "InvalidFee",
      msg: "Invalid fee.",
    },
    {
      code: 6013,
      name: "InvalidCustomUserFee",
      msg: "Invalid custom user fee.",
    },
    {
      code: 6014,
      name: "InvalidBitmapIndex",
      msg: "Invalid bitmap index.",
    },
    {
      code: 6015,
      name: "TickAccountAlreadyInitialized",
      msg: "Tick account already initialized.",
    },
    {
      code: 6016,
      name: "InvalidTickDataAccounts",
      msg: "Invalid tick data accounts.",
    },
    {
      code: 6017,
      name: "TickAccountNotInitialized",
      msg: "Tick account not initialized.",
    },
    {
      code: 6018,
      name: "InvalidTickDataMarket",
      msg: "Invalid market for tick data.",
    },
    {
      code: 6019,
      name: "TickDataAccountDoesNotIncludeCurrentTick",
      msg: "Tick data account does not include the current tick.",
    },
    {
      code: 6020,
      name: "InvalidFeed",
      msg: "Invalid feed.",
    },
    {
      code: 6021,
      name: "InvalidOracleProvider",
      msg: "Invalid oracle provider.",
    },
    {
      code: 6022,
      name: "PriceTooOld",
      msg: "Price too old.",
    },
    {
      code: 6023,
      name: "NotTickDataAccountCreator",
      msg: "Not tick data account creator.",
    },
  ],
  types: [
    {
      name: "MarketData",
      serialization: "bytemuck",
      repr: {
        kind: "c",
      },
      type: {
        kind: "struct",
        fields: [
          {
            name: "token_mint",
            type: "pubkey",
          },
          {
            name: "decimals",
            type: "u8",
          },
          {
            name: "_padding1",
            type: {
              array: ["u8", 7],
            },
          },
          {
            name: "admin",
            type: "pubkey",
          },
          {
            name: "custom_user_fee_setter",
            type: "pubkey",
          },
          {
            name: "tick_data_account_creator",
            type: "pubkey",
          },
          {
            name: "alpha",
            type: "f64",
          },
          {
            name: "feed_id",
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "price_update",
            type: "pubkey",
          },
          {
            name: "last_update_timestamp",
            type: "i64",
          },
          {
            name: "min_update_interval",
            type: "u16",
          },
          {
            name: "oracle_provider",
            type: "u8",
          },
          {
            name: "_padding2",
            type: {
              array: ["u8", 5],
            },
          },
          {
            name: "total_deposited",
            type: "f64",
          },
          {
            name: "total_exited",
            type: "f64",
          },
          {
            name: "total_fees_collected",
            type: "f64",
          },
          {
            name: "num_open",
            type: "u64",
          },
          {
            name: "num_closed",
            type: "u64",
          },
          {
            name: "pending_open_fee_percentage",
            type: "f64",
          },
          {
            name: "pending_open_fee_floor",
            type: "f64",
          },
          {
            name: "pending_close_fee_percentage",
            type: "f64",
          },
          {
            name: "pending_close_fee_floor",
            type: "f64",
          },
          {
            name: "pending_fee_timestamp",
            type: "i64",
          },
          {
            name: "pending_alpha",
            type: "f64",
          },
          {
            name: "pending_min_update_interval",
            type: "u16",
          },
          {
            name: "_padding4",
            type: {
              array: ["u8", 6],
            },
          },
          {
            name: "pending_update_frequency_timestamp",
            type: "i64",
          },
          {
            name: "pending_admin",
            type: "pubkey",
          },
          {
            name: "pending_admin_timestamp",
            type: "i64",
          },
          {
            name: "pending_feed_id",
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "pending_price_update",
            type: "pubkey",
          },
          {
            name: "pending_oracle_provider",
            type: "u8",
          },
          {
            name: "_padding5",
            type: {
              array: ["u8", 7],
            },
          },
          {
            name: "pending_oracle_timestamp",
            type: "i64",
          },
          {
            name: "is_open_paused",
            type: "u8",
          },
          {
            name: "is_price_feed_paused",
            type: "u8",
          },
          {
            name: "_padding6",
            type: {
              array: ["u8", 6],
            },
          },
          {
            name: "pending_custom_user_fee_setter",
            type: "pubkey",
          },
          {
            name: "pending_custom_user_fee_setter_timestamp",
            type: "i64",
          },
          {
            name: "current_price",
            type: "f64",
          },
          {
            name: "step_size",
            type: "f64",
          },
          {
            name: "open_interest",
            type: "f64",
          },
          {
            name: "num_price_feed_calls",
            type: "u64",
          },
          {
            name: "global_shift",
            type: "f64",
          },
          {
            name: "open_fee_percentage",
            type: "f64",
          },
          {
            name: "open_fee_floor",
            type: "f64",
          },
          {
            name: "close_fee_percentage",
            type: "f64",
          },
          {
            name: "close_fee_floor",
            type: "f64",
          },
          {
            name: "initialized_tick_accounts_bitmap",
            type: {
              array: ["u8", 2504],
            },
          },
        ],
      },
    },
    {
      name: "PositionData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            type: "pubkey",
          },
          {
            name: "market",
            type: "pubkey",
          },
          {
            name: "position_seed",
            type: {
              array: ["u8", 16],
            },
          },
          {
            name: "deposited",
            type: "u64",
          },
          {
            name: "open_fee",
            type: "f64",
          },
          {
            name: "r1",
            type: "u64",
          },
          {
            name: "r2",
            type: "u64",
          },
          {
            name: "opened_timestamp",
            type: "i64",
          },
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "ticks",
            type: {
              vec: {
                defined: {
                  name: "Tick",
                },
              },
            },
          },
        ],
      },
    },
    {
      name: "PriceFeedMessage",
      repr: {
        kind: "c",
      },
      type: {
        kind: "struct",
        fields: [
          {
            name: "feed_id",
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "price",
            type: "i64",
          },
          {
            name: "conf",
            type: "u64",
          },
          {
            name: "exponent",
            type: "i32",
          },
          {
            name: "publish_time",
            docs: ["The timestamp of this price update in seconds"],
            type: "i64",
          },
          {
            name: "prev_publish_time",
            docs: [
              "The timestamp of the previous price update. This field is intended to allow users to",
              "identify the single unique price update for any moment in time:",
              "for any time t, the unique update is the one such that prev_publish_time < t <= publish_time.",
              "",
              "Note that there may not be such an update while we are migrating to the new message-sending logic,",
              "as some price updates on pythnet may not be sent to other chains (because the message-sending",
              "logic may not have triggered). We can solve this problem by making the message-sending mandatory",
              "(which we can do once publishers have migrated over).",
              "",
              "Additionally, this field may be equal to publish_time if the message is sent on a slot where",
              "where the aggregation was unsuccesful. This problem will go away once all publishers have",
              "migrated over to a recent version of pyth-agent.",
            ],
            type: "i64",
          },
          {
            name: "ema_price",
            type: "i64",
          },
          {
            name: "ema_conf",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "PriceUpdateV2",
      docs: [
        "A price update account. This account is used by the Pyth Receiver program to store a verified price update from a Pyth price feed.",
        "It contains:",
        "- `write_authority`: The write authority for this account. This authority can close this account to reclaim rent or update the account to contain a different price update.",
        "- `verification_level`: The [`VerificationLevel`] of this price update. This represents how many Wormhole guardian signatures have been verified for this price update.",
        "- `price_message`: The actual price update.",
        "- `posted_slot`: The slot at which this price update was posted.",
      ],
      type: {
        kind: "struct",
        fields: [
          {
            name: "write_authority",
            type: "pubkey",
          },
          {
            name: "verification_level",
            type: {
              defined: {
                name: "VerificationLevel",
              },
            },
          },
          {
            name: "price_message",
            type: {
              defined: {
                name: "PriceFeedMessage",
              },
            },
          },
          {
            name: "posted_slot",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "TemporalNumericValue",
      docs: ["A struct representing a timestamped value."],
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp_ns",
            docs: ["The unix timestamp of the value in nanoseconds."],
            type: "u64",
          },
          {
            name: "quantized_value",
            docs: ["The quantized value."],
            type: "i128",
          },
        ],
      },
    },
    {
      name: "TemporalNumericValueFeed",
      docs: ["An account struct representing a Stork price feed."],
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            docs: ["The encoded ID of the asset associated with the feed."],
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "latest_value",
            docs: ["The latest canonical temporal numeric value for the feed."],
            type: {
              defined: {
                name: "TemporalNumericValue",
              },
            },
          },
        ],
      },
    },
    {
      name: "Tick",
      repr: {
        kind: "c",
      },
      type: {
        kind: "struct",
        fields: [
          {
            name: "q_weight",
            type: "f64",
          },
          {
            name: "multiplicator",
            type: "f64",
          },
        ],
      },
    },
    {
      name: "TickData",
      serialization: "bytemuck",
      repr: {
        kind: "c",
      },
      type: {
        kind: "struct",
        fields: [
          {
            name: "market",
            type: "pubkey",
          },
          {
            name: "start_index",
            type: "u64",
          },
          {
            name: "ticks",
            type: {
              array: [
                {
                  defined: {
                    name: "Tick",
                  },
                },
                2600,
              ],
            },
          },
        ],
      },
    },
    {
      name: "UserStats",
      type: {
        kind: "struct",
        fields: [
          {
            name: "total_deposited",
            type: "f64",
          },
          {
            name: "total_exited",
            type: "f64",
          },
          {
            name: "total_fees_collected",
            type: "f64",
          },
          {
            name: "num_open",
            type: "u64",
          },
          {
            name: "num_closed",
            type: "u64",
          },
          {
            name: "open_fee_percentage",
            type: {
              option: "f64",
            },
          },
          {
            name: "open_fee_floor",
            type: {
              option: "f64",
            },
          },
          {
            name: "close_fee_percentage",
            type: {
              option: "f64",
            },
          },
          {
            name: "close_fee_floor",
            type: {
              option: "f64",
            },
          },
        ],
      },
    },
    {
      name: "VerificationLevel",
      docs: [
        "Pyth price updates are bridged to all blockchains via Wormhole.",
        "Using the price updates on another chain requires verifying the signatures of the Wormhole guardians.",
        "The usual process is to check the signatures for two thirds of the total number of guardians, but this can be cumbersome on Solana because of the transaction size limits,",
        "so we also allow for partial verification.",
        "",
        "This enum represents how much a price update has been verified:",
        "- If `Full`, we have verified the signatures for two thirds of the current guardians.",
        "- If `Partial`, only `num_signatures` guardian signatures have been checked.",
        "",
        "# Warning",
        "Using partially verified price updates is dangerous, as it lowers the threshold of guardians that need to collude to produce a malicious price update.",
      ],
      type: {
        kind: "enum",
        variants: [
          {
            name: "Partial",
            fields: [
              {
                name: "num_signatures",
                type: "u8",
              },
            ],
          },
          {
            name: "Full",
          },
        ],
      },
    },
  ],
};
