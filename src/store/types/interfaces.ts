import { BagCoin, ModalType } from './types';

export interface BagState {
  coins: BagCoin[];
  loading: boolean;
  error: '';

  modal: {
    isOpened: boolean;
    type: ModalType;
  };

  coinToBuy: BagCoin | null;
}
