import Taro from '@tarojs/taro';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import type { StateCreator } from 'zustand/vanilla';

const withMiddleware = <T>(
  init: StateCreator<T, [['zustand/immer', never]], []>,
  storageName: string,
) => {
  if (process.env.NODE_ENV === 'development') {
    return persist(immer<T>(init), {
      name: storageName,
      storage: createJSONStorage(
        () =>
          ({
            setItem(name, value) {
              Taro.setStorage({
                key: name,
                data: value,
              });
            },
          }) as StateStorage,
      ),
    }) as StateCreator<T, [], [['zustand/immer', never]]>;
  } else {
    return immer<T>(init);
  }
};

export default withMiddleware;
