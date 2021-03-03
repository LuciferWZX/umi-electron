import React, { FC } from 'react';
import { StyledInformation } from './style';
import InfoHeader from '@/pages/information/header';
import InfoContent from '@/pages/information/content';
const Information: FC = () => {
  return (
    <StyledInformation>
      <InfoHeader />
      <InfoContent />
    </StyledInformation>
  );
};
export default Information;
