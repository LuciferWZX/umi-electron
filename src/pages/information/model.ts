import { Effect, ImmerReducer, Subscription } from 'umi';
import { createUser, isUsed } from '@/services/user';
import { ResResponse } from '@/types/common.interface';
import { findAllBank } from '@/services/account';
import { Bank } from '@/schemas/bank';
import { CodeStatus } from '@/types/common.enum';
import NProgress from 'nprogress';

export interface InformationModelState {
  banks: Bank[];
}
export interface InformationModelType {
  namespace: 'information';
  state: InformationModelState;
  effects: {
    initData: Effect;
    createUser: Effect;
    checkIsUsedByUser: Effect;
    findAllBank: Effect;
  };
  reducers: {
    save: ImmerReducer<InformationModelState>;
    clear: ImmerReducer<InformationModelState>;
  };
  subscriptions: { setup: Subscription };
}
const informationModel: InformationModelType = {
  namespace: 'information',
  state: {
    banks: [],
  },
  effects: {
    *initData({ payload }, { all, call, put }) {
      NProgress.start();
      const [findAllBankResponse]: [
        findAllBankResponse: ResResponse<Bank[]> | undefined,
      ] = yield all([call(findAllBank)]);

      if (findAllBankResponse) {
        if (findAllBankResponse.code === CodeStatus.Success) {
          yield put({
            type: 'save',
            payload: {
              banks: findAllBankResponse.data,
            },
          });
        }
      }
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
    /**
     * todo 检查是否字段值重复
     * @param payload
     * @param call
     */
    *checkIsUsedByUser({ payload }, { call }) {
      const response: ResResponse<boolean> | undefined = yield call(
        isUsed,
        payload,
      );
      return response;
    },

    /**
     * todo 查询银行列表(保存到model里面)
     * @param _
     * @param call
     * @param put
     */
    *findAllBank(_, { call, put }) {
      const response: ResResponse<Bank[]> | undefined = yield call(findAllBank);
      if (response) {
        if (response.code === CodeStatus.Success) {
          yield put({
            type: 'save',
            payload: {
              banks: response.data,
            },
          });
        }
      }
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
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/basic/information') {
          //todo 初始化数据
          dispatch({
            type: 'initData',
          });
        }
      });
    },
  },
};
export default informationModel;
