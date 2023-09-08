import React from 'react';
import Taro from '@tarojs/taro';
import { View, Button, ButtonProps, BaseEventOrig } from '@tarojs/components';
import { set as setGlobalData } from '@/global_data';
import { showErrorToast } from '@/utils/util';
import * as user from '@/utils/user';

import './index.less';

const Login: React.FC = () => {
  const accountLogin = () => {
    Taro.navigateTo({
      url: '/pages/auth/accountLogin/accountLogin',
    });
  };

  const wxLogin = (e: BaseEventOrig<ButtonProps.onGetUserInfoEventDetail>) => {
    if (!e.detail.userInfo) {
      setGlobalData('hasLogin', false);
      showErrorToast('微信登录失败');
      return;
    }

    user.checkLogin().catch(() => {
      user
        .loginByWeixin(e.detail.userInfo)
        .then(() => {
          setGlobalData('hasLogin', true);
          Taro.navigateBack({
            delta: 1,
          });
        })
        .catch(() => {
          setGlobalData('hasLogin', false);
          showErrorToast('微信登录失败');
        });
    });
  };

  return (
    <View className="container">
      <View className="login-box">
        <Button
          type="primary"
          openType="getUserInfo"
          className="wx-login-btn"
          onGetUserInfo={wxLogin}
        >
          微信直接登录
        </Button>
        <Button
          type="primary"
          className="account-login-btn"
          onClick={accountLogin}
        >
          账号登录
        </Button>
      </View>
    </View>
  );
};

export default Login;
