import { LayoutModelState } from '@/models/layout';

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    LayoutModelState: boolean;
  };
}
interface ConnectState {
  loading: Loading;
  layout: LayoutModelState;
}
export { ConnectState, LayoutModelState };
