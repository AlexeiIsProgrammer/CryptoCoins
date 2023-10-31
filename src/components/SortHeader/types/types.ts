import { ICoin } from '../../../services/CoinsService/types/interfaces';
import { SortField } from '../../../utils/types/types';

type SortHeaderProps = {
  coins: ICoin[];
  setFilteredCoins: React.Dispatch<React.SetStateAction<ICoin[]>>;
  field: SortField;
  children: React.ReactNode;
};

export default SortHeaderProps;
