import { create } from 'zustand';
import Taro from '@tarojs/taro';
import * as images from '@/static/images/index';
import { get as getGlobalData } from '@/global_data';
import { getUserIndex } from '@/services/user';
import withMiddleware from './middleware';

export interface UserStates {
  userInfo: {
    nickName: string;
    avatarUrl?: string;
  };
  order: {
    unpaid: number;
    unship: number;
    unrecv: number;
    uncomment: number;
  };
}

export interface UserActions {
  getUserInfo: () => Promise<void>;
}

const useUserStore = create(
  withMiddleware<UserStates & UserActions>(
    (set) => ({
      userInfo: {
        nickName: '昵称',
        avatarUrl: images.avatar,
      },
      order: {
        unpaid: 0,
        unship: 0,
        unrecv: 0,
        uncomment: 0,
      },
      getUserInfo: async () => {
        if (getGlobalData('hasLogin')) {
          const userInfo = Taro.getStorageSync('userInfo');
          set((state) => {
            state.userInfo = userInfo;
          });
          const orderData = await getUserIndex<
            {
              order: UserStates['order'];
            },
            null
          >(null);
          set((state) => {
            state.order = orderData.order;
          });
        }
      },
    }),
    'user',
  ),
);

export default useUserStore;
