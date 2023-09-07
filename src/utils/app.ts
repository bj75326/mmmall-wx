import Taro from '@tarojs/taro';
import { get as getGlobalData } from '@/global_data';

export const isLogin = () => {
  return getGlobalData('hasLogin');
};

/**
 * 跳转先check(没登录跳转登录页面)
 * @param {*} url
 */
export const navigateToCheck = (url: string) => {
  if (getGlobalData('hasLogin')) {
    Taro.navigateTo({
      url,
    });
  } else {
    Taro.navigateTo({
      url: '/pages/auth/login/login',
    });
  }
};
