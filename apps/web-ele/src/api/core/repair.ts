import { requestClient } from '#/api/request';
import type { RequestClientConfig } from '@vben/request';

interface data {
  order_no: string;
}
/**
 * 新增/编辑损坏记录
 * @param data - 包含损坏信息的对象，类型为任意类型
 * @returns
 */
export function updateRepair(data: any) {
  return requestClient.post('/admin/repair/store', data);
}

/**
 * 获取损坏列表
 * @param data - 包含查询条件的对象，类型为任意类型
 * @returns
 */
export function getVerifyList(data: data) {
  return requestClient.get('/admin/repair/verify', { params: data });
}

/**
 * 获取损坏列表
 * @param data - 包含查询条件的对象，类型为任意类型
 * @returns
 */
export function getRepairList(data: data) {
  return requestClient.get('/admin/repair/send', { params: data });
}

/**
 * 获取损坏详情
 * @param id - 损坏记录的唯一标识
 * @returns
 */
export function getRepairDetail(id: string) {
  return requestClient.get(`/admin/repair/${id}`);
}

/**
 * 损坏认证
 * @param id - 损坏记录的唯一标识
 * @param data - 包含认证信息的对象
 * @returns
 */
export function certifyRepair(id: number) {
  return requestClient.post(`/admin/repair/${id}/verify`);
}

/**
 * 寄出损坏记录
 * @param id - 损坏记录的唯一标识
 * @returns
 */
export function sendRepair(data: { ids: string[] }) {
  return requestClient.post(`/admin/repair/send`, data);
}

/**
 * 扫码获取损坏记录
 * @param code - 扫码的唯一标识码
 * @returns
 */
export function scanRepair(detail_no: string) {
  return requestClient.post(`/admin/repair/scan`, { detail_no });
}
