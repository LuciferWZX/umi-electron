import { Account } from '@/schemas/account';
import { CodeStatus, StoreKey } from '@/types/common.enum';
import { fetchAccountInfo } from '@/services/account';
import { ResResponse } from '@/types/common.interface';
import { navigatorToEntrance } from '@/utils/routeNavigator';
import { history } from 'umi';
import store from 'storejs';
export async function getInitialState(): Promise<Account | null> {
  return await initAccountSetting();
}

/**
 * todo
 * 初始化用户的信息
 */
async function initAccountSetting() {
  const autoLogin: boolean | undefined = store.get(StoreKey.autoLogin);
  if (autoLogin) {
    const account: ResResponse<Account> = await fetchAccountInfo();
    if (account.code === CodeStatus.Success) {
      return account.data;
    }
  }
  console.log(112, autoLogin);
  await navigatorToEntrance();
  return null;
}
