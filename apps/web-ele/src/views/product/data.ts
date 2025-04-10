import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import type { VbenFormSchema } from '#/adapter/form';
import { z } from '#/adapter/form';
import { $t } from '#/locales';

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
      fieldName: 'type_name',
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
          { message: '每月数量不能为负数' },
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
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'month_limit',
      label: '每月数量',
      rules: z
        .string()
        .nonempty({ message: '每月数量不能为空' })
        .refine(
          (value) => {
            const num = parseFloat(value);
            return !isNaN(num) && num >= 0;
          },
          { message: '每月数量不能为负数' },
        ), // 限制最大长度为8位
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        type: 'textarea',
        rows: 4,
      },
      fieldName: 'remark',
      label: '备注',
      rules: z.string().optional(),
    },
  ];
}

export function useSchemaEdit(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        disabled: true,
      },
      fieldName: 'type_name',
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
        .preprocess(
          (value) => (typeof value === 'number' ? value.toString() : value),
          z.string().nonempty({ message: '数量不能为空' }),
        )
        .refine(
          (value) => {
            const num = parseFloat(value);
            return !isNaN(num) && num >= 0;
          },
          { message: '每月数量不能为负数' },
        ),
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        disabled: true,
      },
      fieldName: 'start_no',
      label: '起始编号',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'month_limit',
      label: '每月数量',
      rules: z
        .preprocess(
          (value) => (typeof value === 'number' ? value.toString() : value),
          z.string().nonempty({ message: '每月数量不能为空' }),
        )
        .refine(
          (value) => {
            const num = parseFloat(value);
            return !isNaN(num) && num >= 0;
          },
          { message: '每月数量不能为负数' },
        ),
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        type: 'textarea',
        rows: 4,
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
