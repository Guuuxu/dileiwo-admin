import { requestClient, requestClientExport } from '#/api/request';

export function getOutboundList(params: Record<string, any>) {
  return requestClient.get(`/admin/bound/outbound`, { params });
}

/**
 * 新增/编辑包装出库
 * @param data - 包含配送信息的对象，类型为任意类型
 * @returns
 */
export function updateDelivery(data: any) {
  return requestClient.post('/admin/bound/outbound/store', data);
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
  return requestClient.post(`/admin/bound/outbound/${id}/delete/`);
}

/**
 * 出库扫码
 * @param barcode - 扫描的条形码
 * @returns
 */
export function scanOutboundBarcode(outbound: number, detail_no: string) {
  return requestClient.post(`/admin/bound/outbound/${outbound}/scan`, {
    detail_no,
  });
}

/**
 * 发送手机
 * @param
 * @returns
 */
export function sendPhoneMessage(id: number) {
  return requestClient.post(`/admin/bound/outbound/${id}/send`);
}

/**
 * 导出数据接口
 * @param data - 包含导出条件的对象，类型为任意类型
 * @returns
 */
export function exportData(id: number,email:string) {
  return requestClient.get(`/admin/bound/outbound/${id}/export`, {
    responseType: 'blob',
    timeout: 60000,
    params:{
      email
    }
  });
}

/**
 * 下载导出的文件
 * @param id - 导出的文件唯一标识符
 * @returns
 */
export function downloadExportedFile(id: number,email:string) {
  return requestClientExport.get(`/admin/bound/outbound/${id}/export`, {
    responseType: 'blob', // 设置响应类型为 blob
    timeout: 60000, // 设置超时时间为 60 秒
    params:{
      email
    }
  });
}

/**
 * 导入数据接口
 * @param data - 包含导入数据的对象，类型为任意类型
 * @returns
 */

export function importData(data: any) {
  return requestClient.post(`/admin/bound/modelImport`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
