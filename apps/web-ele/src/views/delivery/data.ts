import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import type { VbenFormSchema } from '#/adapter/form';
import { z } from '#/adapter/form';
import { $t } from '#/locales';
import { getCustomerList } from '#/api';

/**
 * 获取编辑表单的字段配置。如果没有使用多语言，可以直接export一个数组常量
 */
export function useSchema(): VbenFormSchema[] {
  return [
    {
      component: 'ApiSelect',
      // 对应组件的参数
      componentProps: {
        filterable: true,
        // 客户接口转options格式
        afterFetch: (data: { list: any[] }) => {
          return data.list.map((item: any) => ({
            label: item.name,
            value: item.id,
          }));
        },
        // 客户接口
        api: getCustomerList,
        params: {
          page: 1,
          per_page: 100,
        },
      },
      fieldName: 'client_id',
      label: '客户',
      rules: 'required',
    },

    {
      component: 'Select',
      componentProps: {
        placeholder: '请选择',
        options: [
          { label: '租赁', value: '1' },
          { label: '购买', value: '2' },
        ],
      },
      fieldName: 'type',
      label: '出货类型',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        type: 'number',
      },
      fieldName: 'during',
      rules: 'required',
      label: '租赁天数',
      dependencies: {
        show(values) {
          return values.type == '1';
        },
        triggerFields: ['type'],
      },
    },

    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        type: 'number',
      },
      fieldName: 'month_limit',
      label: '每月数量',
      rules: z
        .string()
        .nonempty({ message: '数量不能为空' })
        .refine(
          (value) => {
            const num = parseFloat(value);
            return !isNaN(num) && num >= 0;
          },
          { message: '每月数量不能为负数' },
        ), // 限制最大长度为8位
      dependencies: {
        show(values) {
          return values.type == '1';
        },
        triggerFields: ['type'],
      },
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'remark',
      label: '备注',
    },
  ];
}

/**
 * 获取表格列配置
 * @description 使用函数的形式返回列数据而不是直接export一个Array常量，是为了响应语言切换时重新翻译表头
 * @param onActionClick 表格操作按钮点击事件
 */
