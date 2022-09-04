import create from 'zustand';

interface UserInfo {
  userName: string;
  realName: string;
  idCard: string;
  token: string;
  admin: Boolean;
  password: string;
}

export const UserStore = create<UserInfo>(() => ({
  userName: '',
  password: '',
  realName: '',
  idCard: '',
  token: '',
  admin: false,
}));

export const setGlobalUserName = (userName: string) =>
    UserStore.setState({ userName }),
  setGlobalPassword = (password: string) => UserStore.setState({ password }),
  setGlobalRealName = (realName: string) => UserStore.setState({ realName }),
  setGlobalIDCard = (idCard: string) => UserStore.setState({ idCard }),
  setUserToken = (token: string) => UserStore.setState({ token }),
  setAdmin = (admin: boolean) => UserStore.setState({ admin });
