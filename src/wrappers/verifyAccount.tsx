import React, { FC, memo } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { StyledVerifyAccountLoading } from '@/wrappers/components/verifyAccountLoading/style';
export const VerifyAccount: FC = ({ children }) => {
  const { isLogin } = useModel('@@initialState', (model) => {
    return {
      isLogin: !!model.initialState,
    };
  });
  return (
    <StyledVerifyAccountLoading spinning={!isLogin} tip={'用户数据加载中...'}>
      {children}
    </StyledVerifyAccountLoading>
  );
};
export default memo(VerifyAccount);
