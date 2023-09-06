import request from '../utils/request';
import Api from '../config/api';

/**
 *  获取商品总数量
 */
export async function getGoodsCount<T, U>(payload: U) {
  return request.get<T, U>(Api.GoodsCount, payload);
}
