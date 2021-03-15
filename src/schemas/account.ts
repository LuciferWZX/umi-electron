export interface Account {
  accountUsername: string;
  accountNickname: string;
  accountPassword: string;
  email: string;
  phone: string;
  authorityLevel: number;
  token: string;
  authority: AccountAuthority;
}
export interface AccountAuthority {
  id: string;
  name: string;
  description: string;
  level: number;
}
