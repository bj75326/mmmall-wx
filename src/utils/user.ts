import Taro from '@tarojs/taro';
import { ButtonProps } from '@tarojs/components';
import { loginByWX } from '../services/auth';

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

/**
 * Promise封装wx.login
 */
function login() {
  return new Promise((resolve, reject) => {
    Taro.login({
      success: (res) => {
        if (res.code) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

/**
 * 调用微信登录
 */
export function loginByWeixin(
  userInfo: ButtonProps.onGetUserInfoEventDetail['userInfo'],
) {
  return new Promise((resolve, reject) => {
    return login()
      .then((res: Taro.login.SuccessCallbackResult) => {
        console.log('res', res);

        //登录远程服务器
        loginByWX({
          code: res.code,
          userInfo: userInfo,
        })
          .then((loginRes) => {
            //存储用户信息
            // Taro.setStorageSync('userInfo', loginRes.userInfo);
            // Taro.setStorageSync('token', loginRes.token);
            // resolve(loginRes);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}
