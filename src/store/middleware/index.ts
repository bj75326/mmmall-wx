import Taro from '@tarojs/taro';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import type { StateCreator, StoreMutatorIdentifier } from 'zustand/vanilla';

// type Persist = <
//   T,
//   Mps extends [StoreMutatorIdentifier, unknown][] = [],
//   Mcs extends [StoreMutatorIdentifier, unknown][] = [],
//   U = T,
// >(
//   initializer: StateCreator<T, [...Mps, ['zustand/persist', unknown]], Mcs>,
//   options: PersistOptions<T, U>,
// ) => StateCreator<T, Mps, [['zustand/persist', U], ...Mcs]>;

// type Immer = <
//   T,
//   Mps extends [StoreMutatorIdentifier, unknown][] = [],
//   Mcs extends [StoreMutatorIdentifier, unknown][] = [],
// >(
//   initializer: StateCreator<T, [...Mps, ['zustand/immer', never]], Mcs>,
// ) => StateCreator<T, Mps, [['zustand/immer', never], ...Mcs]>;

const withMiddleware = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  init: StateCreator<T, [...Mps, ['zustand/immer', never]], Mcs>,
  storageName: string,
) => {
  if (process.env.NODE_ENV === 'development') {
    //@ts-ignore
    return persist(immer<T, Mps, Mcs>(init), {
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
    });
  }
  return immer<T, Mps, Mcs>(init);
};

export default withMiddleware;
