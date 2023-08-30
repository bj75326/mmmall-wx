import Taro from '@tarojs/taro';
import { loginByWeXin } from '../services/auth';

/**
 * Promise封装wx.checkSession
 */
function checkSession() {
  return new Promise((resolve, reject) => {
    Taro.checkSession({
      success: () => {
        resolve(true);
      },
      fail: () => {
        reject(false);
      },
    });
  });
}

/**
 * 判断用户是否登录
 */
export function checkLogin() {
  return new Promise((resolve, reject) => {
    if (Taro.getStorageSync('userInfo') && Taro.getStorageSync('token')) {
      checkSession()
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          reject(false);
        });
    } else {
      reject(false);
    }
  });
}
