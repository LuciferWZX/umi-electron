import React, { FC } from 'react';
import { StyledIdCardUpload, StyledInfoContent, StyledUpload } from './style';
import { Col, Form, Input, Row, Select } from 'antd';
import { useReactive } from 'ahooks';
import { UploadFile } from 'antd/es/upload/interface';
interface IState {
  //form的布局
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
  name: string;
  idNumber: string;
  depositBank: string;
  phone: string;
  address: string;
  skillLevel: string;
}
const { Option } = Select;
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
        <Row gutter={[20, 0]}>
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
            <Form.Item
              name={'name'}
              label={'姓名'}
              rules={[
                { required: true, message: '请输入姓名' },
                { whitespace: true, message: '请输入姓名' },
              ]}
            >
              <Input placeholder={'请输入姓名'} allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={'idNumber'}
              label={'身份证号码'}
              rules={[
                { required: true, message: '请输入身份证号码' },
                { whitespace: true, message: '请输入身份证号码' },
              ]}
            >
              <Input placeholder={'请输入身份证号码'} allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={'depositBank'}
              label={'工资卡开户银行'}
              rules={[{ required: true, message: '请选择开户银行' }]}
            >
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择开户银行"
                allowClear={true}
                optionFilterProp="children"
                filterOption={(input, option) => {
                  //中文（拼音）匹配
                  const PinyinMatch = require('pinyin-match/lib/traditional.js');
                  return PinyinMatch.match(
                    option?.children.toLowerCase(),
                    input.toLowerCase(),
                  );
                }}
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                <Option value="1">工种一</Option>
                <Option value="2">工种二</Option>
                <Option value="3">Communicated</Option>
                <Option value="4">Identified</Option>
                <Option value="5">Resolved</Option>
                <Option value="6">Cancelled</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={'phone'}
              label={'联系电话'}
              rules={[
                { required: true, message: '请输入联系电话' },
                { whitespace: true, message: '请输入联系电话' },
              ]}
            >
              <Input placeholder={'请输入联系电话'} allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              label={'地址'}
              name={'address'}
            >
              <Input.TextArea
                placeholder="请输入地址"
                autoSize={{ minRows: 2, maxRows: 2 }}
                showCount
                maxLength={50}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={'skillLevel'}
              label={'工作技能等级'}
              rules={[{ required: true, message: '请选择工作技能等级' }]}
            >
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择技能等级"
                allowClear={true}
                optionFilterProp="children"
                filterOption={(input, option) => {
                  //中文（拼音）匹配
                  const PinyinMatch = require('pinyin-match/lib/traditional.js');
                  return PinyinMatch.match(
                    option?.children.toLowerCase(),
                    input.toLowerCase(),
                  );
                }}
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                <Option value="1">初学</Option>
                <Option value="2">熟练</Option>
                <Option value="3">老手</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={'workCategory'}
              label={'工作种类'}
              rules={[{ required: true, message: '请选择工作种类' }]}
            >
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择种类"
                allowClear={true}
                optionFilterProp="children"
                filterOption={(input, option) => {
                  //中文（拼音）匹配
                  const PinyinMatch = require('pinyin-match/lib/traditional.js');
                  return PinyinMatch.match(
                    option?.children.toLowerCase(),
                    input.toLowerCase(),
                  );
                }}
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                <Option value="1">工种一</Option>
                <Option value="2">工种二</Option>
                <Option value="3">Communicated</Option>
                <Option value="4">Identified</Option>
                <Option value="5">Resolved</Option>
                <Option value="6">Cancelled</Option>
              </Select>
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
