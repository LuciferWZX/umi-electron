import React, { FC } from 'react';
import { StyledIdCardUpload, StyledInfoContent, StyledUpload } from './style';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import {
  useLockFn,
  useMount,
  usePersistFn,
  useReactive,
  useRequest,
} from 'ahooks';
import { UploadFile } from 'antd/es/upload/interface';
import { ColumnsType } from 'antd/lib/table/interface';
import { useDispatch } from '@@/plugin-dva/exports';
import { CreateUserParams } from '@/types/user.request';
import { ReloadOutlined } from '@ant-design/icons';
import { ResResponse } from '@/types/common.interface';
import { CodeStatus } from '@/types/common.enum';
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
  //工人id
  workId: string;
}
interface FormProps {
  //证件照
  workerPicture: UploadFile[];
  //身份证照
  idPicture: UploadFile[];
  //姓名
  name: string;
  //身份证号码
  idNumber: string;
  //工作种类
  workCategory: string;
  //银行卡号
  bankCardNumber: string;
  //工资卡开户银行
  depositBank: string;
  //联系电话
  phone: string;
  //地址
  address: string;
  //工作技能等级
  skillLevel: string;
  //备用联系人姓名
  contactName: string;
  //备用联系人联系电话
  contactPhone: string;
  //赡养老人(抵扣计量单位)
  supportOldUnity?: string;
  //赡养老人(抵扣金额)
  supportOldMoney?: number;
  //赡养老人(抵扣说明)
  supportOldDescription?: string;
  //抚养小孩(抵扣计量单位)
  raiseChildrenUnit?: string;
  //抚养小孩(抵扣金额)
  raiseChildrenMoney?: number;
  //抚养小孩(抵扣说明)
  raiseChildrenDescription?: string;
  //房租/房贷(抵扣计量单位)
  houseRentUnit?: string;
  //房租/房贷(抵扣金额)
  houseRentMoney?: number;
  //房租/房贷(抵扣说明)
  houseRentDescription?: string;
  //继续教育(抵扣计量单位)
  continueEducationUnit?: string;
  //继续教育(抵扣金额)
  continueEducationMoney?: number;
  //继续教育(抵扣说明)
  continueEducationDescription?: string;
}
interface DeductionDataType {
  id: number;
  deductionProject: React.ReactNode;
  deductionUnit: React.ReactNode;
  deductionMoney: React.ReactNode;
  deductionDescription: React.ReactNode;
}
const { Option } = Select;
const InfoContent: FC = () => {
  const dispatch = useDispatch();
  const state = useReactive<IState>({
    formLayout: {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    },
    workId: '',
  });
  const [form] = Form.useForm<FormProps>();
  //todo 新增工人的请求
  const createUserRequest = useRequest(
    (params: CreateUserParams) => {
      return dispatch({
        type: 'account/createUser',
        payload: params,
      });
    },
    { manual: true },
  );
  //todo 查看字段值是否被使用
  const checkIsUsed = useRequest(
    (params: { key: [keyof CreateUserParams]; value: any }) => {
      return dispatch({
        type: 'account/checkIsUsedByUser',
        payload: params,
      });
    },
    { manual: true },
  );

  /**
   * todo 初始化数据（生成工号）
   */
  useMount(() => {
    state.workId = generateWorkId();
  });
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
   * todo 刷新工号
   */
  const refreshWorkId = usePersistFn(() => {
    state.workId = generateWorkId();
  });

  /**
   * todo
   * 提交保存数据
   * @param values
   */
  const onFinish = useLockFn(
    async (values: FormProps): Promise<void> => {
      // const workPictureFile = dataURLtoFile(values.workerPicture[0].thumbUrl,values.workerPicture[0].name)
      // const idPictureFile = dataURLtoFile(values.idPicture[0].thumbUrl,values.idPicture[0].name)
      // console.log(1,workPictureFile);
      // console.log(2,idPictureFile);
      createUserRequest
        .run({
          //证件照
          workerPicture: values.workerPicture[0].originFileObj,
          //工人id
          workId: state.workId,
          //身份证照
          idPicture: values.idPicture[0].originFileObj,
          //姓名
          name: values.name,
          //身份证号码
          idNumber: values.idNumber,
          //工作种类
          workCategory: values.workCategory,
          //银行卡号
          bankCardNumber: values.bankCardNumber,
          //工资卡开户银行
          depositBank: values.depositBank,
          //联系电话
          phone: values.phone,
          //地址
          address: values.address,
          //工作技能等级
          skillLevel: values.skillLevel,
          //备用联系人姓名
          contactName: values.contactName,
          //备用联系人联系电话
          contactPhone: values.contactPhone,
          //赡养老人(抵扣计量单位)
          supportOldUnity: values.supportOldUnity,
          //赡养老人(抵扣金额)
          supportOldMoney: values.supportOldMoney,
          //赡养老人(抵扣说明)
          supportOldDescription: values.supportOldDescription,
          //抚养小孩(抵扣计量单位)
          raiseChildrenUnit: values.raiseChildrenUnit,
          //抚养小孩(抵扣金额)
          raiseChildrenMoney: values.raiseChildrenMoney,
          //抚养小孩(抵扣说明)
          raiseChildrenDescription: values.raiseChildrenDescription,
          //房租/房贷(抵扣计量单位)
          houseRentUnit: values.houseRentUnit,
          //房租/房贷(抵扣金额)
          houseRentMoney: values.houseRentMoney,
          //房租/房贷(抵扣说明)
          houseRentDescription: values.houseRentDescription,
          //继续教育(抵扣计量单位)
          continueEducationUnit: values.continueEducationUnit,
          //继续教育(抵扣金额)
          continueEducationMoney: values.continueEducationMoney,
          //继续教育(抵扣说明)
          continueEducationDescription: values.continueEducationDescription,
        })
        .then();
    },
  );
  /**
   * todo
   * 用来表格的column
   */
  const columns: ColumnsType<DeductionDataType> = [
    {
      title: '抵扣项目',
      dataIndex: 'deductionProject',
      width: 100,
    },
    {
      title: '抵扣计量单位',
      dataIndex: 'deductionUnit',
      width: 130,
    },
    {
      title: '抵扣金额',
      dataIndex: 'deductionMoney',
      width: 200,
    },
    {
      title: '抵扣说明',
      dataIndex: 'deductionDescription',
    },
  ];
  /**
   * todo
   * 表格的数据
   */
  const dataSource: DeductionDataType[] = [
    {
      id: 0,
      deductionProject: '赡养老人',
      deductionUnit: (
        <Form.Item name={'supportOldUnity'} noStyle={true}>
          <Input />
        </Form.Item>
      ),
      deductionMoney: (
        <Form.Item name={'supportOldMoney'} noStyle={true}>
          <Input />
        </Form.Item>
      ),
      deductionDescription: (
        <Form.Item name={'supportOldDescription'} noStyle={true}>
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 2 }}
            allowClear={true}
          />
        </Form.Item>
      ),
    },
    {
      id: 1,
      deductionProject: '抚养小孩',
      deductionUnit: (
        <Form.Item name={'raiseChildrenUnit'} noStyle={true}>
          <Input />
        </Form.Item>
      ),
      deductionMoney: (
        <Form.Item name={'raiseChildrenMoney'} noStyle={true}>
          <Input />
        </Form.Item>
      ),
      deductionDescription: (
        <Form.Item name={'raiseChildrenDescription'} noStyle={true}>
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 2 }}
            allowClear={true}
          />
        </Form.Item>
      ),
    },
    {
      id: 2,
      deductionProject: '房租/房贷',
      deductionUnit: (
        <Form.Item name={'houseRentUnit'} noStyle={true}>
          <Input />
        </Form.Item>
      ),
      deductionMoney: (
        <Form.Item name={'houseRentMoney'} noStyle={true}>
          <Input />
        </Form.Item>
      ),
      deductionDescription: (
        <Form.Item name={'houseRentDescription'} noStyle={true}>
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 2 }}
            allowClear={true}
          />
        </Form.Item>
      ),
    },
    {
      id: 3,
      deductionProject: '继续教育',
      deductionUnit: (
        <Form.Item name={'continueEducationUnit'} noStyle={true}>
          <Input />
        </Form.Item>
      ),
      deductionMoney: (
        <Form.Item name={'continueEducationMoney'} noStyle={true}>
          <Input />
        </Form.Item>
      ),
      deductionDescription: (
        <Form.Item name={'continueEducationDescription'} noStyle={true}>
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 2 }}
            allowClear={true}
          />
        </Form.Item>
      ),
    },
  ];
  return (
    <StyledInfoContent>
      <Form
        {...state.formLayout}
        onFinish={onFinish}
        form={form}
        initialValues={{
          workerPicture: [],
          idPicture: [],
        }}
      >
        <Row gutter={[20, 0]}>
          <Col span={24}>
            <Divider orientation={'left'} type={'horizontal'}>
              <Tag color={'cyan'}>个人信息</Tag>
            </Divider>
          </Col>
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
                    rules={[{ required: true, message: '请上传证件照' }]}
                  >
                    <StyledUpload
                      accept={'.png,.jpg,.svg'}
                      name="files"
                      listType="picture-card"
                      maxCount={1}
                      action="/upload.do"
                      beforeUpload={() => {
                        return false;
                      }}
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
                    rules={[{ required: true, message: '请上传身份证照片' }]}
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
                { max: 20, message: '姓名不超过20个字符串' },
                { min: 2, message: '姓名不能少于2个字符串' },
                { whitespace: true, message: '请输入姓名' },
              ]}
              getValueFromEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = e.target;
                //去除所有空格
                return value.replace(/\s/g, '');
              }}
            >
              <Input placeholder={'请输入姓名'} allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={'idNumber'}
              label={'身份证号码'}
              rules={[
                // { required: true, message: '请输入身份证号码' },
                // { len: 18, message: '请输入18位身份证号码' },
                // { whitespace: true, message: '请输入身份证号码' },
                () => ({
                  validator(_, value) {
                    return new Promise((resolve, reject) => {
                      if (value === '' || value === undefined) {
                        return reject(new Error('请输入身份证号码'));
                      }
                      if (value.length === 18) {
                        checkIsUsed
                          .run({
                            key: ('idNumber' as unknown) as [
                              keyof CreateUserParams,
                            ],
                            value: value,
                          })
                          .then((res: ResResponse<boolean> | undefined) => {
                            if (res) {
                              if (res.code === CodeStatus.Success) {
                                if (res.data) {
                                  return reject(
                                    new Error('该身份证号码已被使用'),
                                  );
                                }
                                return resolve(res.data);
                              }
                            }
                          });
                      } else {
                        return reject(new Error('请输入18位身份证号码'));
                      }
                    });
                  },
                }),
              ]}
              getValueFromEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = e.target;
                //去除所有空格
                return value.replace(/\s/g, '');
              }}
              validateTrigger={'onBlur'}
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
              name={'bankCardNumber'}
              label={'银行卡号'}
              rules={[
                { required: true, message: '请输入银行卡号' },
                { whitespace: true, message: '请输入银行卡号' },
                { max: 25, message: '银行卡最多不超过25位' },
              ]}
            >
              <Input placeholder={'请输入银行卡号'} allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item style={{ marginBottom: 0 }} label={'员工号'}>
              <Tag color="blue">{state.workId}</Tag>{' '}
              <Button
                onClick={refreshWorkId}
                type={'link'}
                size={'small'}
                icon={<ReloadOutlined />}
              >
                刷新工号
              </Button>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={'phone'}
              label={'联系电话'}
              rules={[
                { required: true, message: '请输入联系电话' },
                { whitespace: true, message: '请输入联系电话' },
                { max: 13, message: '电话号码不超过13位' },
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
              rules={[
                { required: true, message: '请输入地址' },
                { whitespace: true, message: '请输入地址' },
                { max: 255, message: '地址最大输入255个字符串' },
                { min: 5, message: '地址最少5个字符串' },
              ]}
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
              //rules={[{ required: true, message: '请选择工作技能等级' }]}
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
          <Col span={24}>
            <Divider orientation={'left'} type={'horizontal'}>
              <Tag color={'cyan'}>备用联系人</Tag>
            </Divider>
          </Col>
          <Col span={12}>
            <Form.Item
              name={'contactName'}
              label={'姓名'}
              rules={[
                { required: true, message: '请输入联系人姓名' },
                { whitespace: true, message: '请输入联系人姓名' },
                { max: 20, message: '联系人姓名不超过20个字符串' },
                { min: 2, message: '联系人姓名不能少于2个字符串' },
              ]}
            >
              <Input placeholder={'请输入联系人姓名'} allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={'contactPhone'}
              label={'联系人电话'}
              rules={[
                { required: true, message: '请输入联系人电话' },
                { whitespace: true, message: '请输入联系人电话' },
                { max: 13, message: '电话号码不超过13位' },
              ]}
            >
              <Input placeholder={'请输入联系人电话'} allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Divider orientation={'left'} type={'horizontal'}>
              <Tag color={'cyan'}>个税抵扣信息</Tag>
            </Divider>
          </Col>
          <Col span={24}>
            <Table
              pagination={false}
              bordered
              rowKey={(record) => record.id}
              size={'small'}
              dataSource={dataSource}
              columns={columns}
            />
          </Col>
          <Col span={24} style={{ marginTop: 10, textAlign: 'right' }}>
            <Space>
              <Button>重置</Button>
              <Button type={'primary'} htmlType={'submit'}>
                提交
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </StyledInfoContent>
  );
};
/**
 * todo 生成随机6位工号
 */
const generateWorkId = (): string => {
  let workId = '';
  for (let i = 0; i < 6; i++) {
    workId += Math.floor(Math.random() * 10);
  }
  return workId;
};
export default InfoContent;
