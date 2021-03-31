import styled from 'styled-components';
import { Upload } from 'antd';
export const StyledInfoContent = styled.div`
  padding: 20px;
  .ant-form-item-label > label {
    color: white;
  }
`;
export const StyledUpload = styled(Upload)`
  color: white;

  .ant-upload.ant-upload-select-picture-card {
    width: 140px;
    height: 200px;
    background-color: #000000b3;
  }
  .ant-upload-list-picture-card-container {
    width: 140px;
    height: 200px;
  }
`;
export const StyledIdCardUpload = styled(Upload)`
  color: white;
  .ant-upload.ant-upload-select-picture-card {
    width: 200px;
    height: 140px;
    background-color: #000000b3;
  }
  .ant-upload-list-picture-card-container {
    width: 200px;
    height: 140px;
  }
`;
