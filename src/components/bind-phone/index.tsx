import { PropsWithChildren } from 'react';
import Taro from '@tarojs/taro';
import { Button, BaseEventOrig, ButtonProps } from '@tarojs/components';
import * as app from '@/utils/app';
import { bindPhone } from '@/services/auth';
import './index.less';

const BindPhoneBtn = (props: PropsWithChildren) => {
  const bindPhoneNumber = (
    e: BaseEventOrig<ButtonProps.onGetPhoneNumberEventDetail>,
  ) => {
    if (e.detail.errMsg !== 'getPhoneNumber:ok') {
      // 拒绝授权
      return;
    }
    if (!app.isLogin()) {
      Taro.showToast({
        title: '绑定失败：请先登录',
        icon: 'none',
        duration: 2000,
      });
      return;
    }

    bindPhone<
      unknown,
      {
        iv: string;
        encryptedData: string;
      }
    >({
      iv: e.detail.iv,
      encryptedData: e.detail.encryptedData,
    }).then(() => {
      Taro.showToast({
        title: '绑定成功',
        icon: 'success',
        duration: 2000,
      });
    });
  };

  return (
    <Button
      className="user_column_item_phone"
      openType="getPhoneNumber"
      onGetPhoneNumber={bindPhoneNumber}
    >
      {props.children}
    </Button>
  );
};

export default BindPhoneBtn;
