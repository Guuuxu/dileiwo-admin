import { requestClient } from '#/api/request';


/**
 * 新增/编辑包装出库
 * @param data - 包含配送信息的对象，类型为任意类型
 * @returns 
 */
export function updateDelivery(data: any) {
  return requestClient.post('/admin/bound/outbound/store', data);
}

/**
 * 获取库存列表
 * @param data - 包含查询条件的对象，类型为任意类型
 * @returns 
 */
export function getInventoryList(data: any) {
  return requestClient.get('/admin/bound/inventory', { params: data });
}


/**
 * 获取详情
 * @param outbound - 详情的唯一标识符
 * @returns 
 */
export function getDeliveryDetails(outbound: string) {
  return requestClient.get(`/admin/bound/outbound/${outbound}`);
}

/**
 * 删除出库记录
 * @param id - 要删除的出库记录的唯一标识符
 * @returns 
 */
export function deleteDelivery(id: number) {
  return requestClient.delete(`/admin/bound/outbound/delete/${id}`);
}

/**
 * 出库扫码
 * @param barcode - 扫描的条形码
 * @returns 
 */
export function scanOutboundBarcode(barcode: string) {
  return requestClient.post('/admin/bound/outbound/scan', { barcode });
}

/**
 * 发送手机
 * @param 
 * @returns 
 */
export function sendPhoneMessage(id: number) {
  return requestClient.post('/admin/bound/outbound/send', { id });
}

/**
 * 导出数据接口
 * @param data - 包含导出条件的对象，类型为任意类型
 * @returns 
 */
export function exportData(data: any) {
  return requestClient.post('/admin/bound/outbound/export', data);
}
