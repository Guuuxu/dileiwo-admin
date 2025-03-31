import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/user/info');
}

/**
 * 获取管理员用户列表
 */
export async function getAdminUserListApi(params:any) {
  return requestClient.get<UserInfo[]>('/admin/system',{params});
}

/**
 * 获取管理员详情
 */
export async function getAdminUserDetailApi(userId: string) {
  return requestClient.get<UserInfo>(`/admin/system/${userId}`);
}

/**
 * 新增管理员用户
 */
export async function addAdminUserApi(userData: Partial<UserInfo>) {
  return requestClient.post('/admin/system/store', userData);
}

/**
 * 删除管理员用户
 */
export async function deleteAdminUserApi(userId: string) {
  return requestClient.post(`/admin/system/${userId}/delete`);
}
