import { LayoutModelState } from '@/models/layout';
import { AccountModelState } from '@/models/account';
import { InformationModelState } from '@/pages/information/model';

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    LayoutModelState: boolean;
    AccountModelState: boolean;
    InformationModelState: boolean;
  };
}
interface ConnectState {
  loading: Loading;
  layout: LayoutModelState;
  account: AccountModelState;
  information: InformationModelState;
}
export {
  ConnectState,
  LayoutModelState,
  AccountModelState,
  InformationModelState,
};
