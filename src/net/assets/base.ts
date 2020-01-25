import { get, post } from '../common';

export async function login(payload: {password: string, username: string}) {
  return await post(`/login`, payload);
}
export async function logout() {
  return await post(`/logout`, null);
}

/* 礼品接口 */
export async function getGoodsList(payload: any) {
  return await post(`/web/api/productDelivery/getPageList`, {current: 0, size: 10});
}

/* 用户管理 */
export async function getUserList(payload: any) {
  return await post(`/sysUser/getPageList`, payload);
}
export async function addUser(payload: any) {
  if (payload.id === '' || !payload.id) {
    return await post(`/sysUser/add`, payload);
  } else {
    return await post(`/sysUser/update`, payload);
  }
}
export async function deletedUser(id: string) {
  return await post(`/sysUser/delete`, {id});
}
export async function userInfo(id: string) {
  return await post(`/sysUser/info`, {id});
}

/* 赞助商接口 */
export async function getMerchant(payload: any) {
  return await post(`/web/api/sponsor/getPageList`, payload);
}
export async function addMerchant(payload: any) {
  return await post(`/web/api/sponsor/add`, payload);
}

/* 粉丝分组 */
export async function getGroup(payload: any) {
  return await post(`/web/api/sponsorSubscriberGroup/getPageList`, payload);
}
export async function addGroup(payload: any) {
  if (payload.id === '' || !payload.id) {
    return await post(`/web/api/sponsorSubscriberGroup/add`, payload);
  } else {
    return await post(`/web/api/sponsorSubscriberGroup/update`, payload);
  }
}

/* 粉丝管理 */
export async function getFanList(payload: any) {
  return await post(`/web/api/subscriber/getPageList`, payload);
}

export default {
  login,
  logout,
  getGoodsList,
  getUserList,
  addUser,
  deletedUser,
  userInfo,
  getMerchant,
  addMerchant,
  getGroup,
  addGroup,
  getFanList,
};


