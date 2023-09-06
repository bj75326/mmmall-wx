import request from '@/utils/request';
import Api from '@/config/api';

export async function getUserIndex<T, U>(payload: U) {
  return request.get<T, U>(Api.UserIndex, payload);
}
