import type { VbenFormSchema } from '#/adapter/form';

import { ElMessage } from 'element-plus';

import { $t } from '#/locales';
import { damageReasons } from '#/views/dict';

/**
 * 获取编辑表单的字段配置。如果没有使用多语言，可以直接export一个数组常量
 */
export function useSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Select',
      componentProps: {
        placeholder: '请输入',
        options: damageReasons,
        disabled: true,
        multiple: true,
      },
      fieldName: 'broken_reason',
      label: '损坏原因',
    },
    {
      component: 'Input',
      fieldName: 'reason',

      componentProps: {
        type: 'textarea',
        rows: '3',
        disabled: true,
      },
      label: '',
      dependencies: {
        if(values) {
          return values.broken_reason && values.broken_reason.includes(7); // 通过Dom控制销毁
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['broken_reason'],
      },
    },
    {
      component: 'Image',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'main_img',
      label: '损坏照片',
    },
    // {
    //   component: 'Upload',
    //   componentProps: {
    //     placeholder: '请上传文件',
    //     class: 'avatar-uploader',
    //     action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
    //     accept: 'image/*',
    //     listType: 'picture-card',
    //     multiple: true,
    //     showUploadList: false,
    //     beforeUpload: (file: File) => {
    //       console.log(file);
    //       const isJPG = file.type === 'image/jpeg';
    //       const isPNG = file.type === 'image/png';
    //       const isGIF = file.type === 'image/gif';

    //       if (!isJPG && !isPNG && !isGIF) {
    //         ElMessage.error({
    //           message: $t('ui.formRules.fileTypeError'),
    //         });
    //       }
    //       return isJPG || isPNG || isGIF;
    //     },
    //     handleAvatarSuccess: (res: any, file: File) => {
    //       console.log(res, file);
    //       if (res.code === 0) {
    //         // globalShareState.set('avatarUrl', res.data.url);
    //       } else {
    //         ElMessage.error({
    //           message: $t('ui.formRules.fileUploadError'),
    //         });
    //       }
    //     },
    //   },
    //   fieldName: 'photo',
    //   label: '损坏照片',
    //   renderComponentContent: () => {
    //     return {
    //       default: () => '+',
    //     };
    //   },
    // },
  ];
}

/**
 * 获取表格列配置
 * @description 使用函数的形式返回列数据而不是直接export一个Array常量，是为了响应语言切换时重新翻译表头
 * @param onActionClick 表格操作按钮点击事件
 */
