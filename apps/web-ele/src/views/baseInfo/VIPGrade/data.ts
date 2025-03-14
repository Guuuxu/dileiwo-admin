import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import type { VbenFormSchema } from '#/adapter/form';

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
      fieldName: 'name',
      label: 'VIP等级名称',
      rules: 'required',
    },
    {
      component: 'Upload',
      componentProps: {
        placeholder: '请上传文件',
        class: 'avatar-uploader',
        action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
        accept: 'image/*',
        maxCount: 1,
        listType: 'picture-card',
      },
      fieldName: 'itemIcon',
      label: '等级图标',
      rules: 'required',
      renderComponentContent: () => {
        return {
          default: () => '+',
        };
      },
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'points',
      label: '需要积分数',
      rules: 'required',
    },
  ];
}

/**
 * 获取表格列配置
 * @description 使用函数的形式返回列数据而不是直接export一个Array常量，是为了响应语言切换时重新翻译表头
 * @param onActionClick 表格操作按钮点击事件
 */
