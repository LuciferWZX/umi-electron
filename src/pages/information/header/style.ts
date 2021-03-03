import styled from 'styled-components';
import { PageHeader } from 'antd';
export const StyledHeader = styled(PageHeader)`
  background: #424b4f;
  .image {
    display: flex;
    align-items: center;
    margin: 0 0 0 60px;
  }
  .user-icon {
    background-color: transparent;
  }
  .ant-page-header-heading-title {
    color: white;
  }
  .description-text {
    color: #e6e6e6;
  }
`;
