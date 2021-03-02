import React, { FC, memo } from 'react';
import { StyledBasicLayout, StyledContent } from '@/layouts/basicLayout/style';
import TopHeader from '@/layouts/basicLayout/header';
import LeftSider from '@/layouts/basicLayout/sider';
const BasicLayout: FC = ({ children }) => {
  return (
    <StyledBasicLayout>
      <TopHeader />
      <StyledBasicLayout>
        <LeftSider />
        <StyledContent>{children}</StyledContent>
      </StyledBasicLayout>
    </StyledBasicLayout>
  );
};
export default memo(BasicLayout);
