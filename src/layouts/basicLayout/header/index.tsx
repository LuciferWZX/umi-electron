import React, { FC, memo } from 'react';
import {
  StyledHeader,
  StyledHorizonMenu,
  StyledLogo,
  StyledSiderButton,
} from '@/layouts/basicLayout/header/style';
import {
  AntDesignOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import HorizonMenu from '@/layouts/basicLayout/header/HorizonMenu';

const TopHeader: FC = () => {
  const dispatch = useDispatch();
  const { leftSiderScroll } = useSelector(
    (state: ConnectState) => state.layout,
    (left, right) => {
      return left.leftSiderScroll === right.leftSiderScroll;
    },
  );
  /**
   * todo
   * 点击收缩左侧菜单栏事件
   */
  const handleMenuScroll = (): void => {
    dispatch({
      type: 'layout/save',
      payload: {
        leftSiderScroll: !leftSiderScroll,
      },
    });
  };
  return (
    <StyledHeader>
      <StyledLogo align={'center'}>
        <AntDesignOutlined />
        <div>BM管理系统</div>
      </StyledLogo>
      <StyledHorizonMenu>
        <StyledSiderButton onClick={handleMenuScroll}>
          {leftSiderScroll ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </StyledSiderButton>
        <HorizonMenu />
      </StyledHorizonMenu>
    </StyledHeader>
  );
};
export default memo(TopHeader);
