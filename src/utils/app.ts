import { get as getGlobalData } from '@/global_data';

export const isLogin = () => {
  return getGlobalData('hasLogin');
};
