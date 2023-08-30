import request from '../utils/request';
import Api from '../config/api';

/**
 *  微信登录
 */
export async function loginByWeXin<T>(payload: T) {
  return request.post(Api.AuthLoginByWeixin, payload);
}

/**
 *  用户登录
 */
export async function loginByAccount<T>(payload: T) {
  return request.post(Api.AuthLoginByAccount, payload);
}

/**
 *  用户注册验证码
 */
export async function regCaptcha<T>(payload: T) {
  return request.post(Api.AuthRegisterCaptcha, payload);
}

/**
 *  用户注册
 */
export async function reg<T>(payload: T) {
  return request.post(Api.AuthRegister, payload);
}

/**
 *  绑定手机号
 */
export async function bindPhone<T>(payload: T) {
  return request.post(Api.AuthBindPhone, payload);
}

/**
 *  退出登录
 */
export async function logout<T>(payload: T) {
  return request.post(Api.AuthLogout, payload);
}

/**
 * 重置密码
 * @param {*} payload
 */
export async function resetPass<T>(payload: T) {
  return request.post(Api.AuthReset, payload);
}
