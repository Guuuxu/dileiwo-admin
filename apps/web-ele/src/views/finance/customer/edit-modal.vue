<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import { ElMessage, ElTabs, ElTabPane } from 'element-plus';

import { useVbenForm } from '#/adapter/form';

defineOptions({
  name: 'FormModelInvoice',
});

const id = defineModel('id', {
  default: 0,
  required: true,
});

const [Form, formApi] = useVbenForm({
  layout: 'horizontal',
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'createTime',
      label: '开票日期',
    },
    {
      component: 'Input',
      fieldName: 'customer',
      label: '客户名称',
    },

    {
      component: 'Input',
      formItemClass: 'col-span-2',
      fieldName: 'remark',
      label: '备注',
    },
  ],
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  draggable: true,
  showConfirmButton: false,
  cancelText: '关闭',
  onCancel() {
    modalApi.close();
  },
  // 关闭动画播放完毕时触发
  onClosed() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = modalApi.getData<Record<string, any>>();
      if (values) {
        formApi.setValues(values);
      }
      console.log(id.value);
    }
  },
  title: '明细',
});

import ContractDetail from './modules/contract-detail.vue';
import SupplyDetail from './modules/supply-detail.vue';
import InvoiceDetail from './modules/invoice-detail.vue';
import ReceiptDetail from './modules/receipt-detail.vue';
</script>
<template>
  <Modal class="w-[800px]">
    <Form />
    <el-tabs type="border-card" class="detail-tabs">
      <el-tab-pane label="合同份数明细"><contract-detail /></el-tab-pane>
      <el-tab-pane label="合同供货明细"><supply-detail /></el-tab-pane>
      <el-tab-pane label="合同开票明细"><invoice-detail /></el-tab-pane>
      <el-tab-pane label="合同收款明细"><receipt-detail /></el-tab-pane>
    </el-tabs>
  </Modal>
</template>
<style scoped>
.detail-tabs {
  height: 100%;
}
</style>
