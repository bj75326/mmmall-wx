import request from '../utils/request';
import Api from '../config/api';

/**
 *  首页数据接口
 */
export async function getIndex<T, U>(payload: U) {
  return request.get<T, U>(Api.IndexUrl, payload);
}
