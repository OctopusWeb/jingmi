import { get, post } from '../common';

export async function login(payload: {password: string, username: string}) {
  return await post(`/login`, payload);
}
export async function logout() {
  return await post(`/logout`, null);
}

/* 礼品接口 */
export async function getGoodsList(payload: any) {
  return await post(`/web/api/productDelivery/getPageList`, payload);
}

export async function getGoodsAll() {
  return await get(`/web/api/goods/all`, null);
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
  if (payload.id === '' || !payload.id) {
    return await post(`/web/api/sponsor/add`, payload);
  } else {
    return await post(`/web/api/sponsor/update`, payload);
  }
}
export async function deletedMerchant(id: any) {
  return await post(`/web/api/sponsor/delete`, {id});
}
export async function getSponsorProduct(payload: any) {
  return await post(`/web/api/sponsorProduct/getPageList`, payload);
}
export async function addSponsorProduct(payload: any) {
  if (payload[0].id === '' || !payload[0].id) {
    return await post(`/web/api/sponsorProduct/add`, payload);
  } else {
    return await post(`/web/api/sponsorProduct/update`, payload);
  }
}

/* 粉丝分组 */
export async function getGroup(payload: any) {
  return await post(`/web/api/sponsorSubscriberGroup/getPageList`, payload);
}
export async function deletedGroup(id: any) {
  return await post(`/web/api/sponsorSubscriberGroup/delete`, {id});
}
export async function updateGroup(payload: any) {
  return await post(`/web/api/sponsorSubscriber/update`, payload);
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

/* 短信管理 */
export async function getMessageList(payload: any) {
  return await post(`/web/api/messageDelivery/getPageList`, payload);
}
export async function addMessageList(payload: any) {
  return await post(`/web/api/messageDelivery/add`, payload);
}

/* 广告位管理 */
export async function getSponsorPosterList(payload: any) {
  return await post(`/web/api/sponsorPoster/getPageList`, payload);
}
export async function addSponsorPoster(payload: any) {
  if (payload.id === '' || !payload.id) {
    return await post(`/web/api/sponsorPoster/add`, payload);
  } else {
    return await post(`/web/api/sponsorPoster/update`, payload);
  }
}
export async function getAdvertisingList(payload: any) {
  return await post(`/sponsorPosterItem/getPageList`, payload);
}
export async function addAdvertising(payload: any) {
  return await post(`/sponsorPosterItem/add`, payload);
}
export async function deletedAdvertising(id: number) {
  return await post(`/web/api/sponsorPoster/delete`, {id});
}
export async function isOpenHandler(id: number, isOpen: boolean) {
  if (isOpen) {
    return await post(`/web/api/sponsorPoster/active`, {id});
  } else {
    return await post(`/web/api/sponsorPoster/inactive`, {id});
  }
}
export async function getPosterItem(payload: any) {
  return await post(`/sponsorPosterItem/getPageList`, payload);
}
export async function addSponsorItemPoster(payload: any) {
  if (payload.id === '' || !payload.id) {
    return await post(`/web/api/sponsorPoster/add`, payload);
  } else {
    return await post(`/sponsorPosterItem/update`, payload);
  }
}





export default {
  login,
  logout,
  getGoodsList,
  getGoodsAll,
  getUserList,
  addUser,
  deletedUser,
  userInfo,
  getMerchant,
  addMerchant,
  deletedMerchant,
  getGroup,
  updateGroup,
  deletedGroup,
  addGroup,
  getFanList,
  getMessageList,
  addMessageList,
  getSponsorProduct,
  addSponsorProduct,
  getAdvertisingList,
  addAdvertising,
  getSponsorPosterList,
  addSponsorPoster,
  deletedAdvertising,
  isOpenHandler,
  getPosterItem,
  addSponsorItemPoster,
};


