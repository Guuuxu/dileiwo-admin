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
      fieldName: 'code',
      label: '供应商编号',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'name',
      label: '供应商名称',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'contact',
      label: '联系人',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'phone',
      label: '联系电话',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'address',
      label: '联系地址',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'amount',
      label: '上期尾款',
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
