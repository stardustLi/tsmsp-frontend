import create from 'zustand';

interface UserInfo {
  userName: string;
  realName: string;
  idCard: string;
  token: string;
}

export const UserStore = create<UserInfo>(() => ({
  userName: '',
  realName: '',
  idCard: '',
  token: '',
}));

export const setGlobalUserName = (userName: string) =>
  UserStore.setState({ userName }),
  setGlobalRealName = (realName: string) => UserStore.setState({ realName }),
  setGlobalIDCard = (idCard: string) => UserStore.setState({ idCard }),
  setUserToken = (token: string) => UserStore.setState({ token });
