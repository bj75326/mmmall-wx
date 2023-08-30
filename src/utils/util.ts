import Taro from '@tarojs/taro';

export const showErrorToast = (msg: string) => {
  Taro.showToast({
    title: msg,
    image: '../static/images/icon_error.png',
  });
};
