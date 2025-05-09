import { baseRequestClient, requestClient } from '#/api/request';
import type { RequestClientConfig } from '@vben/request';
interface ProductInfo {
  data: {
    id: number;
    type_name: string;
    amount: number;
    start_no: number;
    month_limit: string;
    remark: string;
  };
  msg: string;
  status: number;
}
interface page {
  page: number;
  per_page: number;
}
/**
 * 新增、编辑产品
 * @param data
 * @returns
 */
export async function updateProduct(data: ProductInfo['data']) {
  return requestClient.post<ProductInfo>('/admin/model/store', data);
}

/**
 * 获取产品列表
 * @returns
 */
export async function getProductList(params: RequestClientConfig | undefined) {
  return requestClient.get<ProductInfo[]>('/admin/model/list', { params });
}

/**
 * 获取产品详情
 * @param model
 * @returns
 */
export async function getProductDetail(model: number) {
  return requestClient.get<ProductInfo>(`/admin/model/${model}`);
}

/**
 * 删除产品
 * @param id
 * @returns
 */
export async function deleteProduct(id: number) {
  return requestClient.post(`/admin/model/${id}/delete/`);
}
