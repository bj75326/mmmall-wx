import React, { useCallback } from 'react';
import Taro, { useDidShow } from '@tarojs/taro';
import { Block, Button, View, Image, BaseEventOrig } from '@tarojs/components';
import { useUserStore } from '@/store';
import { logout } from '@/services/auth';
import { set as setGlobalData, get as getGlobalData } from '@/global_data';
import { AtIcon, AtBadge, AtList, AtListItem } from 'taro-ui';
import * as images from '@/static/images/index';
import * as app from '@/utils/app';
import { BindPhone, Contact } from '@/components';
import './index.less';

const ORDER_LIST_CONFIG = [
  {
    image: images.pendpay,
    value: '待付款',
    type: 'pendPay',
    orderType: 'unpaid',
  },
  {
    image: images.send,
    value: '待发货',
    type: 'send',
    orderType: 'unship',
  },
  {
    image: images.receive,
    value: '待收货',
    type: 'receive',
    orderType: 'unrecv',
  },
  {
    image: images.comment,
    value: '待评价',
    type: 'comment',
    orderType: 'uncomment',
  },
  {
    image: images.aftersale,
    value: '售后',
    type: 'aftersale',
    orderType: 'none',
  },
];

interface FnItem {
  image: string;
  value: string;
  url: string;
  type: string;
}

const SERVICE_CONFIG: FnItem[] = [
  {
    image: images.coupon,
    value: '优惠券',
    url: '/pages/ucenter/couponList/couponList',
    type: 'coupon',
  },
  {
    image: images.collect,
    value: '收藏',
    url: '/pages/ucenter/collect/collect',
    type: 'collect',
  },
  {
    image: images.footprint,
    value: '足迹',
    url: '/pages/ucenter/footprint/footprint',
    type: 'footprint',
  },
  {
    image: images.group,
    value: '拼团',
    url: '/pages/groupon/myGroupon/myGroupon',
    type: 'group',
  },
  {
    image: images.address,
    value: '地址',
    url: '/pages/ucenter/address/address',
    type: 'address',
  },
];

const TOOL_CONFIG: FnItem[] = [
  {
    image: images.mobile,
    value: '绑定手机',
    url: '',
    type: 'bindPhone',
  },
  {
    image: images.customer,
    value: '联系客服',
    url: '',
    type: 'customer',
  },
  {
    image: images.about,
    value: '关于我们',
    url: '/pages/about/about',
    type: 'about',
  },
];

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

  const handleOrder = useCallback((tab: number) => {
    // todo 传递参数需要使用 storage 么？
    try {
      Taro.setStorageSync('tab', tab);
    } catch (e) {}
    app.navigateToCheck('/pages/ucenter/order/order');
  }, []);

  // const handleFnClick = useCallback((e: BaseEventOrig) => {
  //   console.log('e--> ', e.currentTarget);
  // }, []);

  const handleFnClick = (item: FnItem) => {
    if (item.url && item.type !== 'about') {
      app.navigateToCheck(item.url);
    } else {
      Taro.navigateTo({ url: item.url });
    }
  };

  const getFnListNormal = () => {
    return (
      <>
        <AtList hasBorder={false}>
          {SERVICE_CONFIG.map((item, index) => (
            <AtListItem
              key={item.type}
              thumb={item.image}
              hasBorder={index !== SERVICE_CONFIG.length - 1}
              title={item.value}
              arrow="right"
              onClick={() => handleFnClick(item)}
            />
          ))}
        </AtList>
        <AtList hasBorder={false}>
          {TOOL_CONFIG.map((item, index) => {
            if (item.type === 'bindPhone') {
              return (
                <BindPhone key={item.type}>
                  <AtListItem
                    thumb={item.image}
                    hasBorder={index !== TOOL_CONFIG.length - 1}
                    title={item.value}
                    arrow="right"
                  />
                </BindPhone>
              );
            } else if (item.type === 'customer') {
              return (
                <Contact key={item.type}>
                  <AtListItem
                    thumb={item.image}
                    hasBorder={index !== TOOL_CONFIG.length - 1}
                    title={item.value}
                    arrow="right"
                  />
                </Contact>
              );
            } else {
              return (
                <AtListItem
                  key={item.type}
                  thumb={item.image}
                  hasBorder={index !== TOOL_CONFIG.length - 1}
                  title={item.value}
                  arrow="right"
                  onClick={() => handleFnClick(item)}
                />
              );
            }
          })}
        </AtList>
      </>
    );
  };

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
          <View className="split-line"></View>
          <View className="container">
            <View className="box-item">
              <View className="box-item-header">
                <View className="title">我的订单</View>
                <View className="all-order" onClick={() => handleOrder(0)}>
                  <View>查看全部订单</View>
                  <AtIcon
                    value="chevron-right"
                    size="18"
                    color="#969799"
                  ></AtIcon>
                </View>
              </View>
              <View className="box-item-content">
                {ORDER_LIST_CONFIG.map((item, index) => {
                  return (
                    <AtBadge
                      key={item.type}
                      value={order[item.orderType] || undefined}
                      maxValue={99}
                    >
                      <View
                        className="item"
                        onClick={() => handleOrder(index + 1)}
                      >
                        <Image className="img" src={item.image} />
                        <View className="name">{item.value}</View>
                      </View>
                    </AtBadge>
                  );
                })}
              </View>
            </View>
          </View>
          <View className="container fn-list">{getFnListNormal()}</View>
          <View className="split-line"></View>
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
