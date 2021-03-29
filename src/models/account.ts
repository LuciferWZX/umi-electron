import { Effect, ImmerReducer } from 'umi';
import { login } from '@/services/account';
import { ResResponse } from '@/types/common.interface';
import { CodeStatus } from '@/types/common.enum';
import { message } from 'antd';
import { createUser } from '@/services/user';

export interface AccountModelState {
  account: Account | null;
}
export interface AccountModelType {
  namespace: 'account';
  state: AccountModelState;
  effects: {
    login: Effect;
    createUser: Effect;
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
    /**
     * todo 新增工人
     * @param payload
     * @param call
     */
    *createUser({ payload }, { call }) {
      const response = yield call(createUser, payload);
      console.log(response);
    },
  },
  reducers: {
    save(state, payload) {
      Object.getOwnPropertyNames(payload).forEach((key) => {
        // @ts-ignore
        state[key] = payload[key];
      });
    },
    clear(state, _) {},
  },
};
export default accountModel;
