import React, { useCallback } from 'react';
import Taro, { useDidShow } from '@tarojs/taro';
import { Block, Button, View, Image } from '@tarojs/components';
import { useUserStore } from '@/store';
import { logout } from '@/services/auth';
import { set as setGlobalData, get as getGlobalData } from '@/global_data';
import { AtIcon } from 'taro-ui';
import * as images from '@/static/images/index';

const Index: React.FC = () => {
  const { userInfo, order, getUserInfo } = useUserStore();

  // useEffect(() => {
  //   getUserInfo();
  // }, [getUserInfo]);
  useDidShow(() => {
    getUserInfo();
  });

  const exitLogin = useCallback(() => {
    Taro.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: (res) => {
        if (!res.confirm) {
          return;
        }
        logout<unknown, null>(null).then(() => {
          setGlobalData('hasLogin', false);
          Taro.removeStorageSync('token');
          Taro.removeStorageSync('userInfo');
          Taro.reLaunch({
            url: '/pages/index/index',
          });
        });
      },
    });
  }, []);

  const handleVip = useCallback(() => {
    Taro.switchTab({
      url: '/pages/index/index',
    });
  }, []);

  return (
    <Block>
      <View className="bar-container container">
        <View className="layout-my">
          <View className="header">
            <Image
              className="avatar"
              src={userInfo.avatarUrl || images.avatar}
            ></Image>
            <View className="info">{userInfo.nickName}</View>
            <View className="vip" onClick={handleVip}>
              <View>微商城</View>
              <AtIcon value="chevron-right" size="15" color="#fff"></AtIcon>
            </View>
          </View>
        </View>
        <View className="footer">
          {getGlobalData('hasLogin') && (
            <Button className="logout" onClick={exitLogin}>
              退出登录
            </Button>
          )}
        </View>
      </View>
    </Block>
  );
};

export default Index;
