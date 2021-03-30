import React, { FC, Fragment, memo } from 'react';
import { useDispatch } from '@@/plugin-dva/exports';
import { useMount } from 'ahooks';
import NProgress from 'nprogress';

const InformationWrapper: FC = ({ children }) => {
  const dispatch = useDispatch();
  // todo 组件加载
  useMount(() => {
    NProgress.configure({ parent: '#basicContent' });
    initInformation();
  });
  //todo 初始化数据
  const initInformation = (): void => {
    dispatch({
      type: 'information/initData',
    });
  };
  return <Fragment>{children}</Fragment>;
};
export default memo(InformationWrapper);
