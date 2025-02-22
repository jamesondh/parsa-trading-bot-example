export const MARKET_DATA_HEADER_SIZE =
  8 + // discriminator
  32 + // token_mint
  1 + // decimals
  7 + // _padding1
  32 + // admin
  8 + // alpha
  32 + // feed_id
  32 + // price_update
  8 + // last_update_timestamp
  2 + // min_update_interval
  1 + // oracle_provider
  5 + // _padding2
  8 + // total_deposited
  8 + // total_exited
  8 + // total_fees_collected
  8 + // num_open
  8 + // num_closed
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
  8 + // pending_oracle_timestamp
  1 + // is_open_paused
  1 + // is_price_feed_paused
  6 + // _padding6
  8 + // current_price
  8 + // step_size
  8 + // open_interest
  8 + // num_price_feed_calls
  8 + // global_shift
  8 + // open_fee_percentage
  8 + // open_fee_floor
  8 + // close_fee_percentage
  8; // close_fee_floor
export const NUM_TICKS_PER_ACCOUNT = 2600;
export const USER_STATS_ACCOUNT_SIZE = 84;
