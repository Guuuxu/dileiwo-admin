import type { VbenFormSchema } from '#/adapter/form';
import { getDeptList } from '#/api/system/dept';
import { $t } from '#/locales';

/**
 * 获取编辑表单的字段配置。如果没有使用多语言，可以直接export一个数组常量
 */
export function useSchema(): VbenFormSchema[] {
  return [
    {
      component: 'ApiTreeSelect',
      componentProps: {
        allowClear: true,
        // api: getDeptList,
        class: 'w-full',
        labelField: 'name',
        valueField: 'id',
        childrenField: 'children',
      },
      fieldName: 'pid',
      label: $t('system.dept.parentDept'),
    },
    {
      component: 'Input',
      fieldName: 'code',
      label: '合同号',
    },
    {
      component: 'Input',
      fieldName: 'name',
      label: '合同名称',
    },
    // {
    //   component: 'Textarea',
    //   componentProps: {
    //     maxLength: 50,
    //     rows: 3,
    //     showCount: true,
    //   },
    //   fieldName: 'remark',
    //   label: $t('system.dept.remark'),
    //   rules: z
    //     .string()
    //     .max(50, $t('ui.formRules.maxLength', [$t('system.dept.remark'), 50]))
    //     .optional(),
    // },
  ];
}
