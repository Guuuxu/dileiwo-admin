<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import { ElMessage } from 'element-plus';

import { useVbenForm } from '#/adapter/form';

defineOptions({
  name: 'FormModelDemo',
});

const formData: any = defineModel('row', {
  default: () => ({}),
});

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  layout: 'horizontal',
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'supplier',
      label: '供应商',
      rules: 'required',
    },
    {
      component: 'DatePicker',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'createTime',
      label: '付款日期',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'code',
      label: '供应商编号',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'abstract',
      label: '付款摘要',
      componentProps: {
        allowClear: true,
        options: [
          { value: '1', label: '工程合同收款' },
          { value: '2', label: '钢板废料收款' },
          { value: '3', label: '其它收入' },
          { value: '4', label: '借款' },
        ],
        placeholder: '请选择',
      },
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          { value: '1', label: '原材料' },
          { value: '2', label: '工人工资' },
          { value: '3', label: '管理费用' },
          { value: '4', label: '财务费用' },
          { value: '5', label: '税金及附加' },
          { value: '6', label: '运输费用' },
          { value: '7', label: '销售费用' },
          { value: '8', label: '固定资产' },
          { value: '9', label: '借出资金' },
        ],
        placeholder: '请选择',
      },
      fieldName: 'category',
      label: '付款类别',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'account',
      label: '收款账户',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'amount',
      label: '付款金额',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'payee',
      label: '付款人',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        type: 'textarea',
        rows: 3,
      },
      formItemClass: 'col-span-2',
      fieldName: 'remark',
      label: '备注',
    },
  ],
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    formData.value = {};
    modalApi.close();
  },
  // 关闭动画播放完毕时触发
  onClosed() {
    formData.value = {};
    // emit('update:modelValue', {});
    modalApi.close();
  },
  onConfirm: async () => {
    await formApi.validateAndSubmitForm();
    // modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      // const { values } = modalApi.getData<Record<string, any>>();
      if (formData.value) {
        formApi.setValues(formData.value);
      }
    }
  },
  title: '新增',
});

function onSubmit(values: Record<string, any>) {
  modalApi.lock();
  setTimeout(() => {
    modalApi.close();
    ElMessage.success(`提交成功：${JSON.stringify(values)}`);
  }, 3000);
}
</script>
<template>
  <Modal class="w-[800px]">
    <Form v-model:value="formData" />
  </Modal>
</template>
