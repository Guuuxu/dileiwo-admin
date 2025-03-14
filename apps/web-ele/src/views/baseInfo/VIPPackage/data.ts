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
      label: '套餐名称',
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
      formItemClass: 'col-span-2',
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
      fieldName: 'order',
      label: '需要积分数(积分)',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'duration',
      label: '会员时长(天)',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'ios_price',
      label: '价格($)',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'order',
      label: '内购商品ID',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'android_price',
      label: '价格($)',
      rules: 'required',
    },
    {
      component: 'Select',
      formItemClass: 'col-span-2',
      componentProps: {
        placeholder: '请输入',
        options: [
          {
            label: '头像框1',
            value: '1',
          },
          {
            label: '头像框2',
            value: '2',
          },
        ],
      },
      fieldName: 'avatarFrame',
      label: '头像框特权',
    },
    {
      component: 'Select',
      formItemClass: 'col-span-2',
      componentProps: {
        placeholder: '请输入',
        options: [
          {
            label: '特效1',
            value: '1',
          },
          {
            label: '特效2',
            value: '2',
          },
        ],
      },
      fieldName: 'effects',
      label: '特效特权',
    },
    {
      component: 'Input',
      fieldName: 'emojiData',
      formItemClass: 'col-span-2',
      label: '表情包特权',
    },
    {
      component: 'RadioGroup',
      fieldName: 'status',
      componentProps: {
        options: [
          {
            label: '启用',
            value: 1,
          },
          {
            label: '禁用',
            value: 0,
          },
        ],
      },
      rules: 'required',
      formItemClass: 'col-span-2',
      label: '状态',
    },
  ];
}
