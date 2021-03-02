import React, { FC, memo } from 'react';
import {
  HorizonMenuBox,
  MenuBoxItem,
} from '@/layouts/basicLayout/header/style';
import MyIcon from '@/components';
import { Badge } from 'antd';
const HorizonMenu: FC = () => {
  return (
    <HorizonMenuBox>
      <MenuBoxItem>欢迎你，{`admin`}</MenuBoxItem>
      <MenuBoxItem>
        <Badge count={11} size={'small'} style={{ backgroundColor: '#52c41a' }}>
          <MyIcon type={'icon-email'} className={'horizon-menu-icon'} />
        </Badge>
      </MenuBoxItem>
      <MenuBoxItem>
        <MyIcon type={'icon-logout'} />
        退出
      </MenuBoxItem>
    </HorizonMenuBox>
  );
};
export default memo(HorizonMenu);
