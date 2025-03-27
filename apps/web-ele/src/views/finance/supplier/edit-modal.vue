<script lang="ts" setup>
import { ref } from 'vue';
import { useVbenModal } from '@vben/common-ui';

import { ElMessage } from 'element-plus';

import { useVbenForm } from '#/adapter/form';

defineOptions({
  name: 'FormModelInvoice',
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
      component: 'DatePicker',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'createTime',
      label: '日期',
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
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'customer',
      label: '供应商',
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

import type { VxeGridProps } from '#/adapter/vxe-table';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
// 表格配置
interface RowType {
  id: number;
  creatTime: string;
  contractNo: string;
  code: string;
  name: string;
  customer: string;
  amount: string;
  price: string;
  unit: string;
  volume: string;
  quantity: string;
  remark: string;
}
const dataList: any = ref([]);
const gridOptions: VxeGridProps<RowType> = {
  columns: [
    { type: 'seq', width: 50 },
    { editRender: { name: 'input' }, field: 'name', title: '产品名称' },
    { editRender: { name: 'input' }, field: 'customer', title: '型号规格' },
    { editRender: { name: 'input' }, field: 'unit', title: '单位' },
    { editRender: { name: 'input' }, field: 'signatory', title: '数量' },
    {
      editRender: { name: 'input' },
      field: 'deliveryDate',
      title: '报价预算成本',
    },
    { editRender: { name: 'input' }, field: 'dueDate', title: '销售单价' },
    { editRender: { name: 'input' }, field: 'amount', title: '金额' },

    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      width: 120,
    },
  ],
  data: dataList.value,
  height: '480',
  scrollY: {
    enabled: true,
    gt: 0,
  },
  showOverflow: true,
  editConfig: {
    mode: 'row',
    trigger: 'click',
  },
  pagerConfig: {},
  // proxyConfig: {
  //   ajax: {
  //     query: async ({ page }) => {
  //       return await getExampleTableApi({
  //         page: page.currentPage,
  //         per_page: page.pageSize,
  //       });
  //     },
  //   },
  // },
};
const [Grid, gridApi] = useVbenVxeGrid({ gridOptions });
// 模拟行数据
const loadList = (size = 200) => {
  try {
    // const dataList: RowType[] = [];
    for (let i = 0; i < size; i++) {
      dataList.value.push({
        id: 10_000 + i,
        createTime: '2025-1-3',
        name: `消防排风${i}`,
        contractNo: `h000-${i}`,
        code: `000-${i}`,
        unit: '个',
        customer: '张三',
        amount: 5 * i,
        volume: '10',
        quantity: '11',
        dueDate: '2025-03-28',
        remark: '备注一下',
        status: 0,
      });
    }
    // gridApi.setGridOptions({ data: dataList });
  } catch (error) {
    console.error('Failed to load data:', error);
    // Implement user-friendly error handling
  }
};
</script>
<template>
  <Modal class="w-[800px]">
    <Form v-model:value="formData" />
  </Modal>
</template>
