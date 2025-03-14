import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';
import { ElMessage } from 'element-plus';
import type { VbenFormSchema } from '#/adapter/form';
import { globalShareState } from '@vben/common-ui';

import { $t } from '#/locales';

/**
 * 获取编辑表单的字段配置。如果没有使用多语言，可以直接export一个数组常量
 */
export function useSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Upload',
      componentProps: {
        placeholder: '请上传文件',
        class: 'avatar-uploader',
        action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
        accept: 'image/*',
        listType: 'picture-card',
        maxCount: 1,
        showUploadList: false,
        beforeUpload: (file: File) => {
          console.log(file);
          const isJPG = file.type === 'image/jpeg';
          const isPNG = file.type === 'image/png';
          const isGIF = file.type === 'image/gif';

          if (!isJPG && !isPNG && !isGIF) {
            ElMessage.error({
              message: $t('ui.formRules.fileTypeError'),
            });
          }
          return isJPG || isPNG || isGIF;
        },
        handleAvatarSuccess: (res: any, file: File) => {
          console.log(res, file);
          if (res.code === 0) {
            // globalShareState.set('avatarUrl', res.data.url);
          } else {
            ElMessage.error({
              message: $t('ui.formRules.fileUploadError'),
            });
          }
        },
      },
      fieldName: 'avatar',
      label: '头像',
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
      fieldName: 'name',
      label: '昵称',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'phone',
      label: '手机号',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'email',
      label: '邮箱',
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        placeholder: '请选择',
        options: [
          { label: '超级管理员', value: 1 },
          { label: '考核官', value: 2 },
          { label: '财务', value: 3 },
          { label: '客服', value: 4 },
        ],
      },
      fieldName: 'role',
      label: '角色',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        type: 'password',
      },
      fieldName: 'password',
      label: '密码',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        type: 'password',
      },
      fieldName: 'confirmPassword',
      label: '确认密码',
      rules: 'required',
    },
  ];
}

/**
 * 获取表格列配置
 * @description 使用函数的形式返回列数据而不是直接export一个Array常量，是为了响应语言切换时重新翻译表头
 * @param onActionClick 表格操作按钮点击事件
 */
