import { create } from 'zustand';
import { getIndex } from '@/services/index';
import withMiddleware from './middleware';
// import { getShopNav } from '../services/shop';

export interface Data {
  banner: Banner[];
  brandList: BrandList[];
  channel: Channel[];
  couponList: CouponList[];
  floorGoodsList: FloorGoodsList[];
  grouponList: GrouponList[];
  hotGoodsList: HotGoodsList[];
  newGoodsList: NewGoodsList[];
  topicList: TopicList[];
}

export interface Banner {
  addTime?: string;
  content?: string;
  deleted?: boolean;
  enabled?: boolean;
  endTime?: string;
  id: number;
  link: string;
  name: string;
  position?: number;
  startTime?: string;
  updateTime?: string;
  url: string;
}

export interface BrandList {
  desc: string;
  floorPrice?: number;
  id: number;
  name: string;
  picUrl: string;
}

export interface Channel {
  iconUrl?: string;
  id: number;
  name: string;
}

export interface CouponList {
  days?: number;
  desc?: string;
  discount?: number;
  endTime?: string;
  id: number;
  min?: number;
  name: string;
  startTime?: string;
  tag?: string;
}

export interface FloorGoodsList {
  goodsList: GoodsList[];
  id: number;
  name: string;
}

export interface GoodsList {
  brief?: string;
  counterPrice?: number;
  id: number;
  isHot?: boolean;
  isNew?: boolean;
  name: string;
  picUrl?: string;
  retailPrice?: number;
}

export interface GrouponList {
  brief?: string;
  counterPrice?: number;
  expireTime?: string;
  grouponDiscount?: number;
  grouponMember?: number;
  grouponPrice?: number;
  id: number;
  name: string;
  picUrl?: string;
  retailPrice?: number;
}

export interface HotGoodsList {
  brief?: string;
  counterPrice?: number;
  id: number;
  isHot?: boolean;
  isNew?: boolean;
  name: string;
  picUrl?: string;
  retailPrice?: number;
}

export interface NewGoodsList {
  brief?: string;
  counterPrice?: number;
  id: number;
  isHot?: boolean;
  isNew?: boolean;
  name: string;
  picUrl?: string;
  retailPrice?: number;
}

export interface TopicList {
  id: number;
  picUrl?: string;
  price?: number;
  readCount?: string;
  subtitle?: string;
  title: string;
}

// export interface NavRecord {
//   title: string;
//   image: string;
//   selectedImage: string;
//   ref_type: number;
// }

export interface HomeStates {
  data: Data;
  // shop: {
  //   nav: NavRecord[];
  //   currentNav: {};
  //   currentNavIndex: 0;
  // };
}

export interface HomeActions {
  // getShopNav: () => Promise<void>;
  getIndex: () => Promise<void>;
}

const useHomeStore = create(
  withMiddleware<HomeStates & HomeActions>(
    (set) => ({
      data: {
        banner: [],
        brandList: [],
        channel: [],
        couponList: [],
        floorGoodsList: [],
        grouponList: [],
        hotGoodsList: [],
        newGoodsList: [],
        topicList: [],
      },
      // shop: {
      //   nav: [],
      //   currentNav: {},
      //   currentNavIndex: 0,
      // },
      // getShopNav: async () => {
      //   const nav = await getShopNav();
      //   set((state) => {
      //     state.shop.nav = nav;
      //   });
      // },
      getIndex: async () => {
        const res = await getIndex<Data, null>(null);
        set((state) => {
          state.data = res;
        });
      },
    }),
    'home',
  ),
);

export default useHomeStore;
