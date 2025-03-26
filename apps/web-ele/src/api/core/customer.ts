import { requestClient } from '#/api/request';


interface data {
  order_no: string;
}

export function getCustomerList() {
  return requestClient.get('/admin/client');
}

export function getCustomerDetails(customerId: string) {
  return requestClient.get(`/admin/client/${customerId}`);
}

export function updateCustomer(customerData: any) {
  return requestClient.post('/admin/client/store', customerData);
}

/**
 * 删除指定客户的信息
 * @param {string} customerId - 要删除的客户的唯一标识符
 * @returns 
 */export function deleteCustomer(customerId: string) {
  return requestClient.post(`/admin/client/${customerId}/delete`);
}

/**
 * 获取客户的指标信息
 * @param {string} customerId - 客户的唯一标识符
 * @returns 
 */
export function getCustomerMetrics(customerId: string) {
  return requestClient.get(`/admin/client/${customerId}/metrics`);
}

/**
 * 导出客户数据
 * @data {object} data - 导出的查询参数
 * @returns 
 */
export function exportCustomerData(data: Record<string, any>) {
  return requestClient.post('/admin/client/export', data);
}
