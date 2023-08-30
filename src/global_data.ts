const globalData = {};

export const set = (key: string | symbol, val: unknown) => {
  globalData[key] = val;
};

export const get = (key: string) => globalData[key];
