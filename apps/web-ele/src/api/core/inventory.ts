import { requestClient } from '#/api/request';

/**
 * 获取库存列表
 * @param data - 包含查询条件的对象，类型为任意类型
 * @returns
 */
export function getInventoryList(data: any) {
  return requestClient.get('/admin/bound/inventory', { params: data });
}

/**
 * 获取库存明细
 * @param id - 库存项的唯一标识符
 * @returns
 */
export function getInventoryDetail(id: string) {
  return requestClient.get(`/admin/bound/inventory/${id}`);
}

/**
 * 导出库存数据
 * @param data
 * @returns
 */
export function exportInventory(id: number) {
  return requestClient.post(
    `/admin/bound/inventory/${id}/export`,
    {},
    {
      responseType: 'blob',
    },
  );
}
