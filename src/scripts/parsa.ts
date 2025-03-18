/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/parsa.json`.
 */
export type Parsa = {
  address: "CzQLGepxHuu9sQ66jjgq2osCGRyoTbhaUrKQVxjjy8gV";
  metadata: {
    name: "parsa";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "cancelPendingAdmin";
      discriminator: [96, 213, 92, 102, 118, 54, 82, 93];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [];
    },
    {
      name: "cancelPendingCustomUserFeeSetter";
      discriminator: [237, 200, 135, 17, 130, 171, 221, 200];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [];
    },
    {
      name: "cancelPendingFee";
      discriminator: [36, 129, 126, 217, 77, 252, 83, 220];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [];
    },
    {
      name: "cancelPendingOracle";
      discriminator: [127, 101, 42, 204, 128, 70, 107, 52];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [];
    },
    {
      name: "cancelPendingUpdateFrequency";
      discriminator: [116, 126, 209, 247, 96, 76, 143, 207];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [];
    },
    {
      name: "close";
      discriminator: [98, 165, 201, 177, 108, 65, 206, 96];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "position";
          writable: true;
        },
        {
          name: "userStats";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 95, 115, 116, 97, 116, 115];
              },
              {
                kind: "account";
                path: "position.owner";
                account: "positionData";
              }
            ];
          };
        },
        {
          name: "adminTokenAccount";
          writable: true;
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "userTokenAccount";
          writable: true;
        },
        {
          name: "vault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "market";
              }
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "tickData1";
          writable: true;
        },
        {
          name: "tickData2";
          writable: true;
          optional: true;
        }
      ];
      args: [
        {
          name: "originalOwner";
          type: "pubkey";
        },
        {
          name: "minAmountToUser";
          type: {
            option: "f64";
          };
        }
      ];
    },
    {
      name: "finalizeSetAdmin";
      discriminator: [236, 55, 59, 235, 142, 100, 117, 85];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [];
    },
    {
      name: "finalizeSetCustomUserFeeSetter";
      discriminator: [31, 208, 232, 17, 189, 224, 86, 91];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [];
    },
    {
      name: "finalizeSetFee";
      discriminator: [103, 101, 254, 135, 120, 9, 144, 134];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [];
    },
    {
      name: "finalizeSetOracle";
      discriminator: [171, 148, 22, 180, 28, 70, 69, 246];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [];
    },
    {
      name: "finalizeSetUpdateFrequency";
      discriminator: [27, 50, 82, 36, 181, 132, 74, 58];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [];
    },
    {
      name: "initializeMarket";
      discriminator: [35, 35, 189, 193, 155, 48, 170, 203];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "vault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "market";
              }
            ];
          };
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "mint";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "stepSize";
          type: "f64";
        },
        {
          name: "frequency";
          type: "f64";
        },
        {
          name: "feedId";
          type: {
            array: ["u8", 32];
          };
        },
        {
          name: "priceUpdate";
          type: "pubkey";
        },
        {
          name: "oracleProvider";
          type: "u8";
        },
        {
          name: "minUpdateInterval";
          type: "u16";
        },
        {
          name: "decimals";
          type: "u8";
        },
        {
          name: "admin";
          type: "pubkey";
        },
        {
          name: "openFeePercentage";
          type: "f64";
        },
        {
          name: "openFeeFloor";
          type: "f64";
        },
        {
          name: "closeFeePercentage";
          type: "f64";
        },
        {
          name: "closeFeeFloor";
          type: "f64";
        }
      ];
    },
    {
      name: "initializeTicks";
      discriminator: [31, 193, 36, 143, 122, 208, 187, 242];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "tickData";
          writable: true;
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "bitmapIndex";
          type: "u64";
        }
      ];
    },
    {
      name: "open";
      discriminator: [228, 220, 155, 71, 199, 189, 60, 45];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "tickData1";
          writable: true;
        },
        {
          name: "tickData2";
          writable: true;
          optional: true;
        },
        {
          name: "userStats";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 95, 115, 116, 97, 116, 115];
              },
              {
                kind: "arg";
                path: "to.unwrap_or(signer";
              }
            ];
          };
        },
        {
          name: "position";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [112, 111, 115, 105, 116, 105, 111, 110];
              },
              {
                kind: "account";
                path: "market";
              },
              {
                kind: "arg";
                path: "to.unwrap_or(signer";
              },
              {
                kind: "arg";
                path: "r1";
              },
              {
                kind: "arg";
                path: "r2";
              },
              {
                kind: "arg";
                path: "amount";
              },
              {
                kind: "arg";
                path: "positionSeed";
              }
            ];
          };
        },
        {
          name: "adminTokenAccount";
          writable: true;
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "userTokenAccount";
          writable: true;
        },
        {
          name: "vault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "market";
              }
            ];
          };
        },
        {
          name: "mint";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "r1";
          type: "u64";
        },
        {
          name: "r2";
          type: "u64";
        },
        {
          name: "amount";
          type: "u64";
        },
        {
          name: "positionSeed";
          type: {
            array: ["u8", 16];
          };
        },
        {
          name: "to";
          type: {
            option: "pubkey";
          };
        },
        {
          name: "minLambda";
          type: {
            option: "f64";
          };
        }
      ];
    },
    {
      name: "priceFeedPyth";
      discriminator: [99, 109, 3, 143, 42, 211, 235, 191];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "tickData1";
          writable: true;
        },
        {
          name: "tickData2";
          writable: true;
          optional: true;
        },
        {
          name: "priceUpdate";
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [];
    },
    {
      name: "priceFeedStork";
      discriminator: [125, 132, 251, 152, 41, 100, 26, 132];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "tickData1";
          writable: true;
        },
        {
          name: "tickData2";
          writable: true;
          optional: true;
        },
        {
          name: "feed";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 116, 111, 114, 107, 95, 102, 101, 101, 100];
              },
              {
                kind: "arg";
                path: "feedId";
              }
            ];
            program: {
              kind: "const";
              value: [
                13,
                9,
                158,
                172,
                160,
                66,
                246,
                238,
                223,
                39,
                184,
                53,
                115,
                54,
                127,
                223,
                22,
                38,
                40,
                189,
                145,
                81,
                228,
                189,
                147,
                79,
                227,
                103,
                124,
                76,
                63,
                231
              ];
            };
          };
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [
        {
          name: "feedId";
          type: {
            array: ["u8", 32];
          };
        }
      ];
    },
    {
      name: "setCustomUserFee";
      discriminator: [195, 72, 107, 211, 188, 49, 235, 165];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "userStats";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 95, 115, 116, 97, 116, 115];
              },
              {
                kind: "account";
                path: "user";
              }
            ];
          };
        },
        {
          name: "user";
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "openFeePercentage";
          type: {
            option: "f64";
          };
        },
        {
          name: "openFeeFloor";
          type: {
            option: "f64";
          };
        },
        {
          name: "closeFeePercentage";
          type: {
            option: "f64";
          };
        },
        {
          name: "closeFeeFloor";
          type: {
            option: "f64";
          };
        }
      ];
    },
    {
      name: "setPendingAdmin";
      discriminator: [248, 204, 95, 229, 240, 21, 219, 3];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [
        {
          name: "admin";
          type: "pubkey";
        }
      ];
    },
    {
      name: "setPendingCustomUserFeeSetter";
      discriminator: [184, 67, 209, 208, 26, 41, 12, 19];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [
        {
          name: "customUserFeeSetter";
          type: "pubkey";
        }
      ];
    },
    {
      name: "setPendingFee";
      discriminator: [93, 97, 206, 112, 192, 198, 119, 194];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [
        {
          name: "openFeePercentage";
          type: "f64";
        },
        {
          name: "openFeeFloor";
          type: "f64";
        },
        {
          name: "closeFeePercentage";
          type: "f64";
        },
        {
          name: "closeFeeFloor";
          type: "f64";
        }
      ];
    },
    {
      name: "setPendingOracle";
      discriminator: [146, 126, 210, 61, 4, 53, 210, 171];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [
        {
          name: "feedId";
          type: {
            array: ["u8", 32];
          };
        },
        {
          name: "priceUpdate";
          type: "pubkey";
        },
        {
          name: "oracleProvider";
          type: "u8";
        }
      ];
    },
    {
      name: "setPendingUpdateFrequency";
      discriminator: [148, 35, 189, 248, 154, 46, 85, 131];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [
        {
          name: "frequency";
          type: "f64";
        },
        {
          name: "minUpdateInterval";
          type: "u16";
        }
      ];
    },
    {
      name: "setTickDataAccountCreator";
      discriminator: [75, 216, 181, 176, 253, 72, 33, 177];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [
        {
          name: "tickDataAccountCreator";
          type: "pubkey";
        }
      ];
    },
    {
      name: "togglePauseOpen";
      discriminator: [118, 62, 111, 166, 122, 138, 169, 26];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [];
    },
    {
      name: "togglePausePriceFeed";
      discriminator: [112, 189, 146, 164, 140, 153, 23, 196];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "signer";
          signer: true;
        }
      ];
      args: [];
    },
    {
      name: "transferPosition";
      discriminator: [139, 130, 102, 147, 135, 77, 113, 222];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "position";
          writable: true;
        },
        {
          name: "fromUserStats";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 95, 115, 116, 97, 116, 115];
              },
              {
                kind: "account";
                path: "signer";
              }
            ];
          };
        },
        {
          name: "toUserStats";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 95, 115, 116, 97, 116, 115];
              },
              {
                kind: "arg";
                path: "newOwner";
              }
            ];
          };
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "originalOwner";
          type: "pubkey";
        },
        {
          name: "newOwner";
          type: "pubkey";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "marketData";
      discriminator: [90, 40, 242, 109, 150, 54, 18, 172];
    },
    {
      name: "positionData";
      discriminator: [85, 195, 241, 79, 124, 192, 79, 11];
    },
    {
      name: "priceUpdateV2";
      discriminator: [34, 241, 35, 99, 157, 126, 244, 205];
    },
    {
      name: "temporalNumericValueFeed";
      discriminator: [37, 166, 65, 196, 29, 105, 97, 161];
    },
    {
      name: "tickData";
      discriminator: [245, 142, 47, 181, 161, 183, 31, 221];
    },
    {
      name: "userStats";
      discriminator: [176, 223, 136, 27, 122, 79, 32, 227];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "notPositionOwner";
      msg: "User is not the owner of the position.";
    },
    {
      code: 6001;
      name: "invalidTokenMint";
      msg: "Invalid token mint for this market.";
    },
    {
      code: 6002;
      name: "updateTooFrequent";
      msg: "Price update too frequent.";
    },
    {
      code: 6003;
      name: "notAdmin";
      msg: "Caller is not the admin.";
    },
    {
      code: 6004;
      name: "notCustomUserFeeSetter";
      msg: "Caller is not the custom user fee setter.";
    },
    {
      code: 6005;
      name: "invalidUserTokenAccount";
      msg: "Invalid user token account.";
    },
    {
      code: 6006;
      name: "invalidAdminTokenAccount";
      msg: "Invalid admin token account.";
    },
    {
      code: 6007;
      name: "invalidPriceUpdate";
      msg: "Invalid price update account.";
    },
    {
      code: 6008;
      name: "noPendingChange";
      msg: "No pending change.";
    },
    {
      code: 6009;
      name: "changeLocked";
      msg: "Change locked.";
    },
    {
      code: 6010;
      name: "openPaused";
      msg: "Opening positions are paused.";
    },
    {
      code: 6011;
      name: "priceFeedPaused";
      msg: "Price feed is paused.";
    },
    {
      code: 6012;
      name: "invalidFee";
      msg: "Invalid fee.";
    },
    {
      code: 6013;
      name: "invalidCustomUserFee";
      msg: "Invalid custom user fee.";
    },
    {
      code: 6014;
      name: "invalidBitmapIndex";
      msg: "Invalid bitmap index.";
    },
    {
      code: 6015;
      name: "tickAccountAlreadyInitialized";
      msg: "Tick account already initialized.";
    },
    {
      code: 6016;
      name: "invalidTickDataAccounts";
      msg: "Invalid tick data accounts.";
    },
    {
      code: 6017;
      name: "tickAccountNotInitialized";
      msg: "Tick account not initialized.";
    },
    {
      code: 6018;
      name: "invalidTickDataMarket";
      msg: "Invalid market for tick data.";
    },
    {
      code: 6019;
      name: "tickDataAccountDoesNotIncludeCurrentTick";
      msg: "Tick data account does not include the current tick.";
    },
    {
      code: 6020;
      name: "invalidFeed";
      msg: "Invalid feed.";
    },
    {
      code: 6021;
      name: "invalidOracleProvider";
      msg: "Invalid oracle provider.";
    },
    {
      code: 6022;
      name: "priceTooOld";
      msg: "Price too old.";
    },
    {
      code: 6023;
      name: "notTickDataAccountCreator";
      msg: "Not tick data account creator.";
    }
  ];
  types: [
    {
      name: "marketData";
      serialization: "bytemuck";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "tokenMint";
            type: "pubkey";
          },
          {
            name: "decimals";
            type: "u8";
          },
          {
            name: "padding1";
            type: {
              array: ["u8", 7];
            };
          },
          {
            name: "admin";
            type: "pubkey";
          },
          {
            name: "customUserFeeSetter";
            type: "pubkey";
          },
          {
            name: "tickDataAccountCreator";
            type: "pubkey";
          },
          {
            name: "alpha";
            type: "f64";
          },
          {
            name: "feedId";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "priceUpdate";
            type: "pubkey";
          },
          {
            name: "lastUpdateTimestamp";
            type: "i64";
          },
          {
            name: "minUpdateInterval";
            type: "u16";
          },
          {
            name: "oracleProvider";
            type: "u8";
          },
          {
            name: "padding2";
            type: {
              array: ["u8", 5];
            };
          },
          {
            name: "totalDeposited";
            type: "f64";
          },
          {
            name: "totalExited";
            type: "f64";
          },
          {
            name: "totalFeesCollected";
            type: "f64";
          },
          {
            name: "numOpen";
            type: "u64";
          },
          {
            name: "numClosed";
            type: "u64";
          },
          {
            name: "pendingOpenFeePercentage";
            type: "f64";
          },
          {
            name: "pendingOpenFeeFloor";
            type: "f64";
          },
          {
            name: "pendingCloseFeePercentage";
            type: "f64";
          },
          {
            name: "pendingCloseFeeFloor";
            type: "f64";
          },
          {
            name: "pendingFeeTimestamp";
            type: "i64";
          },
          {
            name: "pendingAlpha";
            type: "f64";
          },
          {
            name: "pendingMinUpdateInterval";
            type: "u16";
          },
          {
            name: "padding4";
            type: {
              array: ["u8", 6];
            };
          },
          {
            name: "pendingUpdateFrequencyTimestamp";
            type: "i64";
          },
          {
            name: "pendingAdmin";
            type: "pubkey";
          },
          {
            name: "pendingAdminTimestamp";
            type: "i64";
          },
          {
            name: "pendingFeedId";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "pendingPriceUpdate";
            type: "pubkey";
          },
          {
            name: "pendingOracleProvider";
            type: "u8";
          },
          {
            name: "padding5";
            type: {
              array: ["u8", 7];
            };
          },
          {
            name: "pendingOracleTimestamp";
            type: "i64";
          },
          {
            name: "isOpenPaused";
            type: "u8";
          },
          {
            name: "isPriceFeedPaused";
            type: "u8";
          },
          {
            name: "padding6";
            type: {
              array: ["u8", 6];
            };
          },
          {
            name: "pendingCustomUserFeeSetter";
            type: "pubkey";
          },
          {
            name: "pendingCustomUserFeeSetterTimestamp";
            type: "i64";
          },
          {
            name: "currentPrice";
            type: "f64";
          },
          {
            name: "stepSize";
            type: "f64";
          },
          {
            name: "openInterest";
            type: "f64";
          },
          {
            name: "numPriceFeedCalls";
            type: "u64";
          },
          {
            name: "globalShift";
            type: "f64";
          },
          {
            name: "openFeePercentage";
            type: "f64";
          },
          {
            name: "openFeeFloor";
            type: "f64";
          },
          {
            name: "closeFeePercentage";
            type: "f64";
          },
          {
            name: "closeFeeFloor";
            type: "f64";
          },
          {
            name: "initializedTickAccountsBitmap";
            type: {
              array: ["u8", 2504];
            };
          }
        ];
      };
    },
    {
      name: "positionData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "pubkey";
          },
          {
            name: "market";
            type: "pubkey";
          },
          {
            name: "positionSeed";
            type: {
              array: ["u8", 16];
            };
          },
          {
            name: "deposited";
            type: "u64";
          },
          {
            name: "openFee";
            type: "f64";
          },
          {
            name: "r1";
            type: "u64";
          },
          {
            name: "r2";
            type: "u64";
          },
          {
            name: "openedTimestamp";
            type: "i64";
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "ticks";
            type: {
              vec: {
                defined: {
                  name: "tick";
                };
              };
            };
          }
        ];
      };
    },
    {
      name: "priceFeedMessage";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "feedId";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "price";
            type: "i64";
          },
          {
            name: "conf";
            type: "u64";
          },
          {
            name: "exponent";
            type: "i32";
          },
          {
            name: "publishTime";
            docs: ["The timestamp of this price update in seconds"];
            type: "i64";
          },
          {
            name: "prevPublishTime";
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
              "migrated over to a recent version of pyth-agent."
            ];
            type: "i64";
          },
          {
            name: "emaPrice";
            type: "i64";
          },
          {
            name: "emaConf";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "priceUpdateV2";
      docs: [
        "A price update account. This account is used by the Pyth Receiver program to store a verified price update from a Pyth price feed.",
        "It contains:",
        "- `write_authority`: The write authority for this account. This authority can close this account to reclaim rent or update the account to contain a different price update.",
        "- `verification_level`: The [`VerificationLevel`] of this price update. This represents how many Wormhole guardian signatures have been verified for this price update.",
        "- `price_message`: The actual price update.",
        "- `posted_slot`: The slot at which this price update was posted."
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "writeAuthority";
            type: "pubkey";
          },
          {
            name: "verificationLevel";
            type: {
              defined: {
                name: "verificationLevel";
              };
            };
          },
          {
            name: "priceMessage";
            type: {
              defined: {
                name: "priceFeedMessage";
              };
            };
          },
          {
            name: "postedSlot";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "temporalNumericValue";
      docs: ["A struct representing a timestamped value."];
      type: {
        kind: "struct";
        fields: [
          {
            name: "timestampNs";
            docs: ["The unix timestamp of the value in nanoseconds."];
            type: "u64";
          },
          {
            name: "quantizedValue";
            docs: ["The quantized value."];
            type: "i128";
          }
        ];
      };
    },
    {
      name: "temporalNumericValueFeed";
      docs: ["An account struct representing a Stork price feed."];
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            docs: ["The encoded ID of the asset associated with the feed."];
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "latestValue";
            docs: ["The latest canonical temporal numeric value for the feed."];
            type: {
              defined: {
                name: "temporalNumericValue";
              };
            };
          }
        ];
      };
    },
    {
      name: "tick";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "qWeight";
            type: "f64";
          },
          {
            name: "multiplicator";
            type: "f64";
          }
        ];
      };
    },
    {
      name: "tickData";
      serialization: "bytemuck";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "market";
            type: "pubkey";
          },
          {
            name: "startIndex";
            type: "u64";
          },
          {
            name: "ticks";
            type: {
              array: [
                {
                  defined: {
                    name: "tick";
                  };
                },
                2600
              ];
            };
          }
        ];
      };
    },
    {
      name: "userStats";
      type: {
        kind: "struct";
        fields: [
          {
            name: "totalDeposited";
            type: "f64";
          },
          {
            name: "totalExited";
            type: "f64";
          },
          {
            name: "totalFeesCollected";
            type: "f64";
          },
          {
            name: "numOpen";
            type: "u64";
          },
          {
            name: "numClosed";
            type: "u64";
          },
          {
            name: "openFeePercentage";
            type: {
              option: "f64";
            };
          },
          {
            name: "openFeeFloor";
            type: {
              option: "f64";
            };
          },
          {
            name: "closeFeePercentage";
            type: {
              option: "f64";
            };
          },
          {
            name: "closeFeeFloor";
            type: {
              option: "f64";
            };
          }
        ];
      };
    },
    {
      name: "verificationLevel";
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
        "Using partially verified price updates is dangerous, as it lowers the threshold of guardians that need to collude to produce a malicious price update."
      ];
      type: {
        kind: "enum";
        variants: [
          {
            name: "partial";
            fields: [
              {
                name: "numSignatures";
                type: "u8";
              }
            ];
          },
          {
            name: "full";
          }
        ];
      };
    }
  ];
};
