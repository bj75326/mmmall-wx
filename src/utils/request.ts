import Taro from '@tarojs/taro';
import { showErrorToast } from '../utils/util';

/**
 * 封装微信的request
 */
const request = <T>(
  url: string,
  data: T,
  method: Taro.request.Option['method'] = 'GET',
) => {
  return new Promise((resolve, reject) => {
    Taro.request({
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

request.get = <T>(url: string, data: T) => {
  return request(url, data, 'GET');
};

request.post = <T>(url: string, data: T) => {
  return request(url, data, 'POST');
};

export default request;
