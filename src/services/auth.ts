import request from '../utils/request';
import Api from '../config/api';

/**
 *  微信登录
 */
export async function loginByWeXin<T, U>(payload: U) {
  return request.post(Api.AuthLoginByWeixin, payload);
}

/**
 *  用户登录
 */
export async function loginByAccount<T, U>(payload: U) {
  return request.post(Api.AuthLoginByAccount, payload);
}

/**
 *  用户注册验证码
 */
export async function regCaptcha<T, U>(payload: U) {
  return request.post(Api.AuthRegisterCaptcha, payload);
}

/**
 *  用户注册
 */
export async function reg<T, U>(payload: U) {
  return request.post(Api.AuthRegister, payload);
}

/**
 *  绑定手机号
 */
export async function bindPhone<T, U>(payload: U) {
  return request.post(Api.AuthBindPhone, payload);
}

/**
 *  退出登录
 */
export async function logout<T, U>(payload: U) {
  return request.post(Api.AuthLogout, payload);
}

/**
 * 重置密码
 * @param {*} payload
 */
export async function resetPass<T, U>(payload: U) {
  return request.post(Api.AuthReset, payload);
}
