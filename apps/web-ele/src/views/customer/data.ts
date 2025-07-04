import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import type { VbenFormSchema } from '#/adapter/form';

import { z } from '#/adapter/form';

/**
 * 获取编辑表单的字段配置。如果没有使用多语言，可以直接export一个数组常量
 */
export function useSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'name',
      label: '客户',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'code',
      label: '登记注册号',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'law_person',
      label: '法定代表人',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'phone',
      label: '法人电话',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'link_person',
      label: '联络人',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'link_phone',
      label: '联络手机',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'register_address',
      label: '注册地址',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'link_address',
      label: '联络地址',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'receive_person',
      label: '收货人',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'receive_phone',
      label: '收货手机',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'receive_address',
      label: '收货地址',
    },
  ];
}

export function metricCol(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'name',
      label: '型号',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'code',
      label: '数量',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'times_count',
      label: '累计循环次数',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'cycle_rate',
      label: '累计循环比率',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'cycle_modify',
      label: '循环次数调整次量',
      rules: 'required',
    },
  ];
}

export function useimportSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'model_type',
      label: '型号',
      rules: z.string().nonempty({ message: '型号不能为空' }),
    },

    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        type: 'number',
      },
      fieldName: 'amount',
      label: '数量',
      rules: z
        .string()
        .nonempty({ message: '数量不能为空' })
        .refine(
          (value) => {
            const num = parseFloat(value);
            return !isNaN(num) && num >= 0;
          },
          { message: '数量不能为负数' },
        ), // 限制最大长度为8位
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        type: 'number',
        min: 0,
      },
      fieldName: 'start_no',
      label: '起始编号',
      rules: z
        .string()
        .nonempty({ message: '起始编号不能为空' })
        .max(8, { message: '最多输入 8 位' })
        .refine(
          (value) => {
            const num = parseFloat(value);
            return !isNaN(num) && num >= 0;
          },
          { message: '起始编号不能为负数' },
        ), // 限制最大长度为8位
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
  ];
}

/**
 * 获取表格列配置
 * @description 使用函数的形式返回列数据而不是直接export一个Array常量，是为了响应语言切换时重新翻译表头
 * @param onActionClick 表格操作按钮点击事件
 */
