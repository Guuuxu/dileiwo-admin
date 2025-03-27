<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import { ref, onMounted } from 'vue';
import { ElMessage, ElButton } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { useVbenVxeGrid } from '#/adapter/vxe-table';

defineOptions({
  name: 'FormModelDemo',
});
const props = defineProps({
  title: {
    type: String,
    default: '新增',
  },
});
const formData: any = defineModel();

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
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'supplier',
      label: '联系人',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'code',
      label: '电话',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'createTime',
      label: '入库日期',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'createTime',
      label: '入库人',
      rules: 'required',
    },
  ],
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    console.log(formData.value);
    // await formApi.validateAndSubmitForm();
    // modalApi.close();
  },
  // 绑定表单数据
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      if (formData.value) {
        formApi.setValues(formData.value);
      }
    }
  },
});

function onSubmit(values: Record<string, any>) {
  modalApi.lock();
  setTimeout(() => {
    modalApi.close();
    ElMessage.success(`提交成功：${JSON.stringify(values)}`);
  }, 3000);
}

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
    { editRender: { name: 'input' }, field: 'code', title: '物料编码' },
    { field: 'type', title: '类别' },
    { editRender: { name: 'input' }, field: 'name', title: '名称' },
    { editRender: { name: 'input' }, field: 'customer', title: '型号规格' },
    { editRender: { name: 'input' }, field: 'unit', title: '单位' },
    { editRender: { name: 'input' }, field: 'price', title: '单价' },
    { editRender: { name: 'input' }, field: 'customer', title: '重量' },
    { editRender: { name: 'input' }, field: 'volume', title: '体积' },
    {
      editRender: { name: 'input' },
      field: 'quantity',
      title: '数量',
    },
    { field: 'amount', title: '金额' },
    { editRender: { name: 'input' }, field: 'remark', title: '备注' },

    // {
    //   field: 'action',
    //   fixed: 'right',
    //   slots: { default: 'action' },
    //   title: '操作',
    //   width: 120,
    // },
  ],
  data: dataList.value,
  height: '480',
  scrollY: {
    enabled: true,
    gt: 0,
  },
  showOverflow: true,
  // 行编辑
  // editConfig: {
  //   mode: 'row',
  //   trigger: 'click',
  // },
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

function hasEditStatus(row: RowType) {
  return gridApi.grid?.isEditByRow(row);
}

function editRowEvent(row: RowType) {
  gridApi.grid?.setEditRow(row);
}
async function saveRowEvent(row: RowType) {
  await gridApi.grid?.clearEdit();

  gridApi.setLoading(true);
  setTimeout(() => {
    gridApi.setLoading(false);
    ElMessage.success(`保存成功！category=${row.id}`);
  }, 600);
}

const cancelRowEvent = (_row: RowType) => {
  gridApi.grid?.clearEdit();
};
onMounted(() => {
  loadList(2);
});
</script>
<template>
  <Modal class="w-[80%]" :title="title">
    <Form v-model:value="formData" />
    <Grid>
      <template #action="{ row }">
        <template v-if="hasEditStatus(row)">
          <ElButton type="primary" link @click="saveRowEvent(row)"
            >保存</ElButton
          >
          <ElButton type="info" link @click="cancelRowEvent(row)"
            >取消</ElButton
          >
        </template>
        <template v-else>
          <ElButton type="primary" link @click="editRowEvent(row)"
            >编辑</ElButton
          >
        </template>
      </template>
    </Grid>
  </Modal>
</template>
