import React, { FC } from 'react';
import { StyledIdCardUpload, StyledInfoContent, StyledUpload } from './style';
import { Button, Col, Form, Input, Row } from 'antd';
import { useReactive } from 'ahooks';
import { UploadFile } from 'antd/es/upload/interface';
interface IState {
  formLayout: {
    labelCol: {
      span: number;
    };
    wrapperCol: {
      span: number;
    };
  };
}
interface FormProps {
  workerPicture: UploadFile[];
  idPicture: UploadFile[];
}
const InfoContent: FC = () => {
  const { formLayout } = useReactive<IState>({
    formLayout: {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    },
  });
  const [form] = Form.useForm<FormProps>();
  /**
   * todo
   * 处理上传证件照
   * @param e
   */
  const workerPictureEvent = (e: any): any => {
    console.log('上传的证件照:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  /**
   * todo
   * 提交保存数据
   * @param values
   */
  const onFinish = (values: FormProps): void => {
    console.log(values);
  };
  return (
    <StyledInfoContent>
      <Form
        {...formLayout}
        onFinish={onFinish}
        form={form}
        initialValues={{
          workerPicture: [],
          idPicture: [],
        }}
      >
        <Row>
          {/*<Button htmlType={'submit'}>提交</Button>*/}
          <Col span={12} style={{ height: 254, overflow: 'hidden' }}>
            <Form.Item
              label="证件照"
              shouldUpdate={(prevValues: FormProps, nextValues: FormProps) =>
                prevValues.workerPicture.length !==
                nextValues.workerPicture.length
              }
            >
              {({ getFieldValue }) => {
                const workerPicture = getFieldValue('workerPicture');
                return (
                  <Form.Item
                    name="workerPicture"
                    valuePropName="fileList"
                    getValueFromEvent={workerPictureEvent}
                    noStyle
                  >
                    <StyledUpload
                      accept={'.png,.jpg,.svg'}
                      name="files"
                      listType="picture-card"
                      maxCount={1}
                      action="/upload.do"
                    >
                      {workerPicture.length === 0 ? (
                        <div style={{ color: 'white' }}>上传证件照</div>
                      ) : null}
                    </StyledUpload>
                  </Form.Item>
                );
              }}
            </Form.Item>
            .
          </Col>
          <Col span={12} style={{ height: 254, overflow: 'hidden' }}>
            <Form.Item
              label="身份证照片"
              shouldUpdate={(prevValues: FormProps, nextValues: FormProps) =>
                prevValues.idPicture.length !== nextValues.idPicture.length
              }
            >
              {({ getFieldValue }) => {
                const idPicture = getFieldValue('idPicture');
                return (
                  <Form.Item
                    name="idPicture"
                    valuePropName="fileList"
                    getValueFromEvent={workerPictureEvent}
                    noStyle
                  >
                    <StyledIdCardUpload
                      accept={'.png,.jpg,.svg'}
                      name="files"
                      listType="picture-card"
                      maxCount={1}
                      action="/upload.do"
                    >
                      {idPicture.length === 0 ? (
                        <div style={{ color: 'white' }}>上传身份正照片</div>
                      ) : null}
                    </StyledIdCardUpload>
                  </Form.Item>
                );
              }}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={'name'} label={'姓名'}>
              <Input placeholder={'请输入'} allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={'idNumber'} label={'身份证号码'}>
              <Input placeholder={'请输入'} allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'员工号'}>338921</Form.Item>
          </Col>
        </Row>
      </Form>
      InfoContent
    </StyledInfoContent>
  );
};
export default InfoContent;
