import { RootState } from '..';
import { getSumOfCoins } from '../../utils';

export const bagSelector = (state: RootState) => state.bag;
export const getCostOfBagSelector = (state: RootState) =>
  getSumOfCoins(state.bag.coins);
