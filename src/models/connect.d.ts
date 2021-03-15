import { LayoutModelState } from '@/models/layout';
import { AccountModelState } from '@/models/account';

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    LayoutModelState: boolean;
    AccountModelState: boolean;
  };
}
interface ConnectState {
  loading: Loading;
  layout: LayoutModelState;
  account: AccountModelState;
}
export { ConnectState, LayoutModelState, AccountModelState };
