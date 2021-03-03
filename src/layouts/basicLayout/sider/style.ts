import styled from 'styled-components';
import { Layout } from 'antd';
import { overflowEclipse } from '@/mixin/textMixin';
export const StyledSider = styled(Layout.Sider)`
  ${overflowEclipse()}
  .left-menu {
    background-color: #282d2f;
    color: #868e8e;
  }
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: #232829;
    color: white;
  }
  .ant-menu-item-active {
    background-color: #232829;
    color: white;
  }
  .ant-menu-submenu {
    background-color: #282d2f;
    color: #868e8e;
    :hover {
      background-color: #232829;
    }
  }
  .ant-menu-sub.ant-menu-inline > .ant-menu-item,
  .ant-menu-sub.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
    color: #868e8e;
    :hover {
      color: white;
    }
  }
  .ant-menu-inline,
  .ant-menu-vertical,
  .ant-menu-vertical-left {
    border-right-color: transparent;
  }
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    color: white !important;
  }
  .ant-menu-sub.ant-menu-inline {
    background-color: #1f2224;
  }
  .ant-menu-submenu-expand-icon,
  .ant-menu-submenu-arrow {
    color: #868e8e;
  }
  .ant-menu-submenu:hover
    > .ant-menu-submenu-title
    > .ant-menu-submenu-expand-icon,
  .ant-menu-submenu:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow {
    color: white;
  }
  .ant-menu-item:hover,
  .ant-menu-item-active,
  .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
  .ant-menu-submenu-active,
  .ant-menu-submenu-title:hover {
    color: white;
  }
  .ant-menu-item:active,
  .ant-menu-submenu-title:active {
    color: white;
    background-color: #232829;
  }
`;
export const StyledUserInfoBox = styled.div`
  background: #1f2224;
  border-bottom: 1px solid #1f2224;
  padding: 22px;
  ${overflowEclipse()}
`;
export const AvatarBox = styled.div`
  text-align: center;
`;
export const UserInfoItem = styled.div`
  .ant-badge-status-text {
    color: #cfcfcf;
  }
`;
