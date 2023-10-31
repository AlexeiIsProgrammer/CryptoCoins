import { IntervalParam } from '../../../services/CoinsService/types/types';

type PeriodCheckerProps = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<IntervalParam>>;
};

export default PeriodCheckerProps;
