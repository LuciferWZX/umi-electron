import React, { FC } from 'react';
import { Row, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { StyledHeader } from '@/pages/information/header/style';
import MyIcon from '@/components';
const { Paragraph } = Typography;
const InfoHeader: FC = () => {
  const Content = ({
    children,
    extraContent,
  }: {
    children: React.ReactNode;
    extraContent: React.ReactNode;
  }) => (
    <Row>
      <div style={{ flex: 1 }}>{children}</div>
      <div className="image">{extraContent}</div>
    </Row>
  );
  const content = (
    <Paragraph className={'description-text'}>
      tips：工人入职所需填写的基本信息，生成工人的基本数据，以后的一些新的数据都会基于当前保
      存的数据中。
    </Paragraph>
  );
  return (
    <StyledHeader
      title="新增工人"
      avatar={{
        icon: <MyIcon type={'icon-useradd'} />,
        className: 'user-icon',
      }}
    >
      <Content
        extraContent={
          <img
            src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
            alt="content"
            width="100%"
          />
        }
      >
        {content}
      </Content>
    </StyledHeader>
  );
};
export default InfoHeader;
