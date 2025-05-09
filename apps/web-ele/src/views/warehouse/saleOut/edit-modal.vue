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
  wrapperClass: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'supplier',
      label: '合同号',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'person',
      label: '客户名称',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'operator',
      label: '出库人',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'remark',
      label: '收货人',
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
    { field: 'code', title: '成品编码' },
    { editRender: { name: 'input' }, field: 'name', title: '产品名称' },
    { field: 'customer', title: '型号规格' },
    { field: 'unit', title: '单位' },
    {
      editRender: { name: 'input' },
      field: 'quantity',
      title: '数量',
    },
    { field: 'price', title: '材料成本' },
    { field: 'price', title: '人工成本' },
    { field: 'price', title: '营管费' },
    { field: 'price', title: '运输成本' },
    { field: 'price', title: '税金及附加' },
    { field: 'price', title: '出厂成本' },
    { field: 'price', title: '单价（元）' },
    { field: 'amount', title: '金额' },

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
        created_at: '2025-1-3',
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
