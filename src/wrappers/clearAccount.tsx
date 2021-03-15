import React, { FC } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { useMount } from 'ahooks';
const ClearAccount: FC = ({ children }) => {
  const { setAccount } = useModel('@@initialState', (model) => ({
    setAccount: model.setInitialState,
  }));

  /**
   * todo
   * 进入登录等页面的时候清空用户的model
   */
  useMount(() => {
    //清空user
    setAccount(null);
  });
  return <>{children}</>;
};
export default ClearAccount;
