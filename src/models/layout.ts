import { ImmerReducer, Subscription } from 'umi';
import { Pathname } from '@/types/common.enum';

export interface LayoutModelState {
  //左侧是否收起
  leftSiderScroll: boolean;
  //当前所在的path
  currentPath: Pathname;
}
interface LayoutModelType {
  namespace: 'layout';
  state: LayoutModelState;
  effects: {};
  reducers: {
    save: ImmerReducer<LayoutModelState>;
  };
  subscriptions: { setup: Subscription };
}
const layoutModel: LayoutModelType = {
  namespace: 'layout',
  state: {
    leftSiderScroll: false,
    currentPath: Pathname.home,
  },
  effects: {},
  reducers: {
    /**
     * todo
     * 更新state数据
     * @param state
     * @param payload
     */
    save(state, { payload }) {
      Object.getOwnPropertyNames(payload).forEach((key) => {
        // @ts-ignore
        state[key] = payload[key];
      });
    },
    // /**
    //  * todo
    //  * 切换sider收缩状态
    //  * @param state
    //  */
    // toggleSider(state){
    //   state.leftSiderScroll = !state.leftSiderScroll
    // }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'save',
          payload: {
            currentPath: pathname,
          },
        });
      });
    },
  },
};
export default layoutModel;
