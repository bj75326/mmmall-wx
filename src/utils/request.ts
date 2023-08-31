import Taro from '@tarojs/taro';
import { showErrorToast } from '../utils/util';

export interface MmmallResponse<T> {
  errno: number;
  data: T;
  errmsg: string;
}

/**
 * 封装微信的request
 */
const request = <T, U>(
  url: string,
  data: U,
  method: Taro.request.Option['method'] = 'GET',
): Promise<T> => {
  return new Promise((resolve, reject) => {
    Taro.request<MmmallResponse<T>, U>({
      url,
      data,
      method,
      header: {
        'Content-Type': 'application/json',
        'X-Mmmall-Token': Taro.getStorageSync('token'),
      },
      success: (res) => {
        if (res.statusCode == 200) {
          if (res.data.errno == 501) {
            // 清除登录相关内容
            try {
              Taro.removeStorageSync('userInfo');
              Taro.removeStorageSync('token');
            } catch (e) {
              // Do something when catch error
            }
            // 切换到登录页面
            Taro.navigateTo({
              url: '/pages/auth/login/login',
            });
          } else if (res.data.errno == 0) {
            resolve(res.data.data);
          } else {
            showErrorToast(res.data.errmsg);
            reject(res.data.errmsg);
          }
        } else {
          reject(res.errMsg);
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

request.get = <T, U>(url: string, data: U) => {
  return request<T, U>(url, data, 'GET');
};

request.post = <T, U>(url: string, data: U) => {
  return request<T, U>(url, data, 'POST');
};

export default request;
