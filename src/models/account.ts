import { Effect, ImmerReducer } from 'umi';
import { login } from '@/services/account';
import { ResResponse } from '@/types/common.interface';
import { CodeStatus } from '@/types/common.enum';
import { message } from 'antd';

export interface AccountModelState {
  account: Account | null;
}
export interface AccountModelType {
  namespace: 'account';
  state: AccountModelState;
  effects: {
    login: Effect;
  };
  reducers: {
    save: ImmerReducer<AccountModelState>;
  };
}
const accountModel: AccountModelType = {
  namespace: 'account',
  state: {
    account: null,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response: ResResponse<Account> = yield call(login, payload);
      if (response.code === CodeStatus.Success) {
        message.success('登录成功').then();
        yield put({
          type: 'save',
          payload: {
            account: response.data,
          },
        });
      } else {
        message.error(response.message).then();
      }
      return response;
    },
  },
  reducers: {
    save(state, payload) {
      Object.getOwnPropertyNames(payload).forEach((key) => {
        // @ts-ignore
        state[key] = payload[key];
      });
    },
  },
};
export default accountModel;
