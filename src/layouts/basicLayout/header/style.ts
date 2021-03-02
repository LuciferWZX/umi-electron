import styled from 'styled-components';
import { Layout, Space } from 'antd';
import { flexSpaceBetween } from '@/mixin/layoutMixin';
export const StyledHeader = styled(Layout.Header)`
  height: 56px;
  line-height: 56px;
  background: #2f3638;
  color: #cfcfcf;
  display: flex;
  padding: 0;
`;
export const StyledLogo = styled(Space)`
  width: 200px;
  background-color: #282d2f;
  justify-content: center;
  font-size: 18px;
`;
export const StyledHorizonMenu = styled.div`
  flex: 1;
  ${flexSpaceBetween()};
`;
export const StyledSiderButton = styled.div`
  border-right: 1px solid #282d2f;
  font-size: 22px;
  padding: 0 22px;
  transition-property: color, background-color;
  transition-duration: 0.2s;
  :hover {
    background-color: #282d2f;
    color: #fff;
    cursor: pointer;
  }
`;
export const HorizonMenuBox = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  li {
    margin-right: 16px;
  }
`;
export const MenuBoxItem = styled.li`
  cursor: pointer;
  min-width: 40px;
  text-align: center;
  :hover {
    color: #fff;
    .horizon-menu-icon {
      color: white;
    }
  }
  .horizon-menu-icon {
    color: #cfcfcf;
    font-size: 20px;
  }
`;
