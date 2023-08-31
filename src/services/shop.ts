import request from '../utils/request';
import Api from '../config/api';
import { NavRecord } from '../store/home';

export const getShopNav = async (): Promise<NavRecord[]> => {
  return request.get<NavRecord[], null>(Api.NavList, null);
};
