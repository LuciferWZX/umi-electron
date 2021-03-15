import React, { FC } from 'react';
import { StyledLogo, StyledUserLayout } from '@/layouts/userLayout/style';
const UserLayout: FC = ({ children }) => {
  return (
    <StyledUserLayout>
      <div className={'main'}>
        <StyledLogo>
          <img src={require('@/assets/svg/entrance_logo.svg')} alt={'logo'} />
          <div className={'system-label'}>BM系统</div>
        </StyledLogo>
        {children}
      </div>
    </StyledUserLayout>
  );
};
export default UserLayout;
