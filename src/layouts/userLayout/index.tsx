import React, { FC } from 'react';
import { StyledUserLayout } from '@/layouts/userLayout/style';
const UserLayout: FC = ({ children }) => {
  return (
    <StyledUserLayout>
      邓丽
      {children}
    </StyledUserLayout>
  );
};
export default UserLayout;
