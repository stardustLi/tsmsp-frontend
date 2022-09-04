import create from 'zustand';

import type { IDCard, Password, UserName } from 'models/fields';
import { UserAdminPermission } from 'models/UserAdminPermission';

interface UserInfo {
  userName: UserName;
  password: Password;
  realName: string;
  idCard: IDCard;
  token: string;
  admin: UserAdminPermission;
}

export const UserStore = create<UserInfo>(() => ({
  userName: '',
  password: '',
  realName: '',
  idCard: '',
  token: '',
  admin: new UserAdminPermission(),
}));

export const setGlobalUserName = (userName: UserName) =>
    UserStore.setState({ userName }),
  setGlobalPassword = (password: Password) => UserStore.setState({ password }),
  setGlobalRealName = (realName: string) => UserStore.setState({ realName }),
  setGlobalIDCard = (idCard: IDCard) => UserStore.setState({ idCard }),
  setUserToken = (token: string) => UserStore.setState({ token }),
  setAdmin = (admin: UserAdminPermission) => UserStore.setState({ admin });
