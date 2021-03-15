import React, { FC, memo } from 'react';
import {
  HorizonMenuBox,
  MenuBoxItem,
} from '@/layouts/basicLayout/header/style';
import MyIcon from '@/components';
import { Badge, Modal } from 'antd';
import { history } from 'umi';
const HorizonMenu: FC = () => {
  /**
   * todo
   * 处理退出登录
   */
  const handleLogout = (): void => {
    Modal.confirm({
      title: '你确定要退出登录吗?',
      icon: <MyIcon type={'icon-jinggao'} style={{ color: 'red' }} />,
      content: '退出登录之后需要重新登录才能使用。',
      onOk() {
        history.push('/entrance/login');
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      okButtonProps: {
        danger: true,
      },
      onCancel() {},
    });
  };
  return (
    <HorizonMenuBox>
      <MenuBoxItem>欢迎你，{`admin`}</MenuBoxItem>
      <MenuBoxItem>
        <Badge count={11} size={'small'} style={{ backgroundColor: '#52c41a' }}>
          <MyIcon type={'icon-email'} className={'horizon-menu-icon'} />
        </Badge>
      </MenuBoxItem>
      <MenuBoxItem onClick={handleLogout}>
        <MyIcon type={'icon-logout'} />
        退出
      </MenuBoxItem>
    </HorizonMenuBox>
  );
};
export default memo(HorizonMenu);
