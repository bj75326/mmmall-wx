import { create } from 'zustand';
import withMiddleware from './middleware';
import { getGoodsCount } from '../services/goods';

export interface GoodsStates {
  goodsCount: number;
  goodsDetail: {};
}

export interface GoodsActions {
  getGoodsCount: () => Promise<void>;
  // getGoodsDetail: () => Promise<void>;
}

const useGoodsStore = create(
  withMiddleware<GoodsStates & GoodsActions>(
    (set) => ({
      goodsCount: 0,
      goodsDetail: {},
      getGoodsCount: async () => {
        const count = await getGoodsCount<number, null>(null);
        set((state) => {
          state.goodsCount = count;
        });
      },
    }),
    'goods',
  ),
);

export default useGoodsStore;
