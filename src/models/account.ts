import { Effect, ImmerReducer } from 'umi';
import { login } from '@/services/account';
import { ResResponse } from '@/types/common.interface';
import { CodeStatus } from '@/types/common.enum';
import { message } from 'antd';
import { Bank } from '@/schemas/bank';

export interface AccountModelState {
  account: Account | null;
  banks: Bank[];
}
export interface AccountModelType {
  namespace: 'account';
  state: AccountModelState;
  effects: {
    login: Effect;
  };
  reducers: {
    save: ImmerReducer<AccountModelState>;
    clear: ImmerReducer<AccountModelState>;
  };
}
const accountModel: AccountModelType = {
  namespace: 'account',
  state: {
    account: null,
    banks: [],
  },
  effects: {
    /**
     * todo 登录
     * @param payload
     * @param call
     * @param put
     */
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
    save(state, { payload }) {
      Object.getOwnPropertyNames(payload).forEach((key) => {
        // @ts-ignore
        state[key] = payload[key];
      });
    },
    clear(state, _) {},
  },
};
export default accountModel;
