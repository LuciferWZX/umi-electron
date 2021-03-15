import React, { FC } from 'react';
import { StyledLogin } from '@/pages/entrance/login/style';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useRequest } from 'ahooks';
import { LoginParams } from '@/types/account.request';
import { useDispatch } from '@@/plugin-dva/exports';
import { ResResponse } from '@/types/common.interface';
import { CodeStatus } from '@/types/common.enum';
interface FormProps {
  accountUsername: string;
  accountPassword: string;
  remember: boolean;
  autoLogin: boolean;
}
export const Login: FC = () => {
  const [form] = Form.useForm<FormProps>();
  const dispatch = useDispatch();
  //登录的请求
  const loginRequest = useRequest(
    (params: LoginParams) => {
      console.log(11);
      return dispatch({
        type: 'account/login',
        payload: params,
      });
    },
    { manual: true },
  );
  /**
   * todo
   * 点击提交触发该方法
   * @param values
   */
  const onFinish = async (values: FormProps): Promise<void> => {
    const { accountUsername, accountPassword } = values;

    const response: ResResponse<Account> = await loginRequest.run({
      accountUsername: accountUsername,
      accountPassword: accountPassword,
    });
    if (response.code === CodeStatus.Success) {
    }
  };
  return (
    <StyledLogin>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={
          {
            accountPassword: '',
            accountUsername: '',
            remember: false,
            autoLogin: false,
          } as FormProps
        }
      >
        <Form.Item
          name={'accountUsername'}
          rules={[
            { required: true, message: '请输入用户名' },
            { whitespace: true, message: '请输入用户名' },
          ]}
        >
          <Input placeholder={'用户名'} />
        </Form.Item>
        <Form.Item
          name={'accountPassword'}
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input placeholder={'密码'} />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <Form.Item name="autoLogin" valuePropName="checked" noStyle>
            <Checkbox>自动登录</Checkbox>
          </Form.Item>
        </Form.Item>
        <Button
          htmlType={'submit'}
          block={true}
          loading={loginRequest.loading}
          type={'primary'}
        >
          登录
        </Button>
      </Form>
    </StyledLogin>
  );
};
export default Login;
