import { PropsWithChildren, useEffect } from 'react';
import Taro, { useDidShow, useLaunch } from '@tarojs/taro';
import * as user from '@/utils/user';
import { set as setGlobalData } from '@/global_data';

import 'taro-ui/dist/style/index.scss';
import './app.less';

const App = ({ children }: PropsWithChildren) => {
  useLaunch(() => {
    console.log('App launched.');
  });

  useEffect(() => {
    if (Taro.canIUse('getUpdateManager')) {
      const updateManager = Taro.getUpdateManager();
      //检测版本更新
      updateManager.onCheckForUpdate((res) => {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            Taro.showModal({
              title: '温馨提示',
              content: '检测到新版本，是否重启小程序？',
              showCancel: false,
              success: function (response) {
                if (response.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate();
                }
              },
            });
          });
          updateManager.onUpdateFailed(() => {
            // 新版本下载失败
            Taro.showModal({
              title: '已有新版本',
              content: '请您删除小程序，重新搜索进入',
            });
          });
        }
      });
    } else {
      Taro.showModal({
        title: '温馨提示',
        content:
          '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
      });
    }
  }, []);

  useDidShow(() => {
    user
      .checkLogin()
      .then(() => {
        setGlobalData('hasLogin', true);
      })
      .catch(() => {
        setGlobalData('hasLogin', false);
      });
  });

  // children 是将要会渲染的页面
  return children;
};

export default App;
