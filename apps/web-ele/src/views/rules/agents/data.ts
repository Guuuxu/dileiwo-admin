import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';
import { h } from 'vue';
import type { VbenFormSchema } from '#/adapter/form';

import { $t } from '#/locales';

/**
 * 获取编辑表单的字段配置。如果没有使用多语言，可以直接export一个数组常量
 */
export function useSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Span',
      fieldName: 'title1',
      formItemClass: 'col-span-2',
      hideLabel: true,
      renderComponentContent: () => {
        return {
          default: () =>
            h(
              'div',
              { style: { fontSize: '14px', color: '#000' } },
              '订单分成比例',
            ),
        };
      },
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'order_player',
      label: '陪玩订单分成',
    },

    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'order_plateform',
      label: '平台订单分成',
    },
    {
      component: 'Span',
      fieldName: 'title2',
      formItemClass: 'col-span-2',
      hideLabel: true,
      renderComponentContent: () => {
        return {
          default: () =>
            h(
              'div',
              { style: { fontSize: '14px', color: '#000' } },
              '礼物分成比例',
            ),
        };
      },
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'order_player',
      label: '陪玩礼物分成',
    },

    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'order_plateform',
      label: '平台礼物分成',
    },
    {
      component: 'Span',
      fieldName: 'title3',
      formItemClass: 'col-span-2',
      hideLabel: true,
      renderComponentContent: () => {
        return {
          default: () =>
            h(
              'div',
              { style: { fontSize: '14px', color: '#000' } },
              '陪玩基础价格配置',
            ),
        };
      },
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'order_player',
      label: '基础局数陪玩金额',
    },

    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'order_plateform',
      label: '基础时长陪玩金额',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'order_plateform',
      label: '基础代练陪玩金额',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'order_plateform',
      label: '基础冠名陪玩金额',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'order_plateform',
      label: '冠名附赠游戏时长最低不少于',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'order_plateform',
      label: '每次涨价幅度不得超过',
    },
    {
      component: 'Span',
      fieldName: 'title4',
      formItemClass: 'col-span-2',
      hideLabel: true,
      renderComponentContent: () => {
        return {
          default: () =>
            h('div', { style: { fontSize: '14px', color: '#000' } }, '其他'),
        };
      },
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'other_next_price',
      label: '升至下一级所需接单金额',
    },
    {
      component: 'Upload',
      formItemClass: 'col-span-2',
      componentProps: {
        placeholder: '请上传文件',
        class: 'avatar-uploader',
        action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
        accept: 'image/*',
        maxCount: 1,
        listType: 'picture-card',
      },
      fieldName: 'itemIcon',
      label: '展示图标',
      rules: 'required',
      renderComponentContent: () => {
        return {
          default: () => '+',
        };
      },
    },
  ];
}

/**
 * 获取表格列配置
 * @description 使用函数的形式返回列数据而不是直接export一个Array常量，是为了响应语言切换时重新翻译表头
 * @param onActionClick 表格操作按钮点击事件
 */
