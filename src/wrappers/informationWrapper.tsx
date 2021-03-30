import React, { FC, Fragment, memo } from 'react';
import { useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import { useMount } from 'ahooks';
import NProgress from 'nprogress';
const InformationWrapper: FC = ({ children }) => {
  //todo 初始化数据的loading
  const loading: boolean | undefined = useSelector(
    (state: ConnectState) => state.loading.effects['information/initData'],
    (left, right) => {
      return left === right;
    },
  );
  useMount(() => {
    NProgress.configure({ parent: '#basicContent' });
  });
  return <Fragment>{children}</Fragment>;
};
export default memo(InformationWrapper);
