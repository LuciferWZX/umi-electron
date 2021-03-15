import React, { FC } from 'react';
import { StyledLogin } from '@/pages/entrance/login/style';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useLockFn, useMount, useRequest } from 'ahooks';
import store from 'storejs';
import { LoginParams } from '@/types/account.request';
import { useDispatch } from '@@/plugin-dva/exports';
import { ResResponse } from '@/types/common.interface';
import { CodeStatus, StoreKey } from '@/types/common.enum';
import { Account } from '@/schemas/account';
import { history } from 'umi';
import { useModel } from '@@/plugin-model/useModel';
interface FormProps {
  accountUsername: string;
  accountPassword: string;
  remember: boolean;
  autoLogin: boolean;
}
export const Login: FC = () => {
  const [form] = Form.useForm<FormProps>();
  const dispatch = useDispatch();
  const { setAccount } = useModel('@@initialState', (model) => {
    return {
      setAccount: model.setInitialState,
    };
  });
  //登录的请求
  const loginRequest = useRequest(
    (params: LoginParams) => {
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
  const onFinish = useLockFn(
    async (values: FormProps): Promise<void> => {
      const { accountUsername, accountPassword } = values;
      const response: ResResponse<Account> = await loginRequest.run({
        accountUsername: accountUsername,
        accountPassword: accountPassword,
      });
      if (response.code === CodeStatus.Success) {
        if (values.remember) {
          store.set(StoreKey.password, values.accountPassword);
        }
        //存储用户信息
        await store.set({
          [StoreKey.remember]: values.remember,
          [StoreKey.autoLogin]: values.autoLogin,
          [StoreKey.account]: response.data,
        });
        setAccount(response.data);
        //进行跳转
        history.push('/');
      }
    },
  );

  useMount(() => {
    const accountPassword: string | undefined = store.get(StoreKey.password);
    const autoLogin: boolean | undefined = store.get(StoreKey.autoLogin);
    const remember: boolean | undefined = store.get(StoreKey.remember);
    const account: Account | undefined = store.get(StoreKey.account);
    form.setFieldsValue({
      accountUsername: account?.accountUsername || '',
      accountPassword: accountPassword || '',
      autoLogin: autoLogin ? autoLogin : false,
      remember: remember ? remember : false,
    });
  });
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
          <Input.Password placeholder={'密码'} />
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
