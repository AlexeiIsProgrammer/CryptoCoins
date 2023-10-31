import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BagCoin, ModalType } from '../../types/types';
import { BagState } from '../../types/interfaces';

const initialState: BagState = {
  coins: [],
  error: '',
  loading: false,

  modal: {
    type: 'buy-coin',
    isOpened: false,
  },
  coinToBuy: null,
};

const bagSlice = createSlice({
  name: 'bag',
  initialState,
  reducers: {
    disableModal(state) {
      state.modal.isOpened = false;
    },
    enableModal(state, action: PayloadAction<ModalType>) {
      state.modal = {
        isOpened: true,
        type: action.payload,
      };
    },
    buyCoin(state, action: PayloadAction<BagCoin>) {
      state.modal = {
        isOpened: true,
        type: 'buy-coin',
      };
      state.coinToBuy = action.payload;
    },
    removeCoin(state, action: PayloadAction<string>) {
      state.coins = state.coins.filter((coin) => coin.id !== action.payload);
    },
    addCoin(state, action: PayloadAction<BagCoin>) {
      const existedCoin = state.coins.find(
        (coin) => action.payload.id === coin.id
      );

      if (!existedCoin) {
        state.coins = [...state.coins, action.payload];
      }

      state.modal.isOpened = false;
    },
  },
});

export const { addCoin, removeCoin, disableModal, enableModal, buyCoin } =
  bagSlice.actions;
export default bagSlice.reducer;
