import React, { FC } from 'react';
import {
  AvatarBox,
  StyledUserInfoBox,
  UserInfoItem,
} from '@/layouts/basicLayout/sider/style';
import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
const UserInfoBox: FC = () => {
  return (
    <StyledUserInfoBox>
      <AvatarBox>
        <Avatar
          style={{ backgroundColor: '#1890ff' }}
          size={82}
          src={
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201808%2F02%2F20180802091236_jictp.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617298072&t=5cd7e04dc2d85cda99c09d1d6a002bdd'
          }
          icon={<AntDesignOutlined />}
        />
      </AvatarBox>
      <UserInfoItem>
        <Badge status="success" text={'admin'} />
      </UserInfoItem>
    </StyledUserInfoBox>
  );
};
export default UserInfoBox;
