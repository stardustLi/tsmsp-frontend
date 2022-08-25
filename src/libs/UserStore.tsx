import create from 'zustand';

interface UserInfo {
  userName: string;
  token: string;
}

export const UserStore = create<UserInfo>(() => ({
  userName: '',
  token: '',
}));

export const setGlobalUserName = (userName: string) =>
    UserStore.setState({ userName }),
  setUserToken = (token: string) => UserStore.setState({ token });
