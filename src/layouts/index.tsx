import React, { FC } from 'react';
import { StyledGlobalLayout } from '@/layouts/style';
const GlobalLayout: FC = ({ children }) => {
  return <StyledGlobalLayout>{children}</StyledGlobalLayout>;
};
export default GlobalLayout;
