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
        readonly: true,
      },
      fieldName: 'code',
      label: '物料号',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        readonly: true,
      },
      fieldName: 'name',
      label: '产品名称',
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
  createTime: string;
  contractNo: string;
  code: string;
  name: string;
}
const dataList: any = ref([]);
const gridOptions: VxeGridProps<RowType> = {
  columns: [
    { type: 'seq', width: 50 },
    { field: 'createTime', title: '日期' },
    { field: 'name', title: '单据号' },
    { field: 'customer', title: '类别' },
    { field: 'quantity', title: '数量' },
    { field: 'price', title: '单价' },
    { field: 'amount', title: '金额' },
  ],
  data: dataList.value,
  height: '480',
  scrollY: {
    enabled: true,
    gt: 0,
  },
  showOverflow: true,
  pagerConfig: {},
  // proxyConfig: {
  //   ajax: {
  //     query: async ({ page }) => {
  //       return await getExampleTableApi({
  //         page: page.currentPage,
  //         pageSize: page.pageSize,
  //       });
  //     },
  //   },
  // },
};
const [Grid, gridApi] = useVbenVxeGrid({ gridOptions });
// 模拟行数据
const loadList = (size = 20) => {
  try {
    // const dataList: RowType[] = [];
    for (let i = 0; i < size; i++) {
      dataList.value.push({
        id: 10_000 + i,
        createTime: '2025-1-3',
        name: `消防排风${i}`,
        contractNo: `h000-${i}`,
        code: `000-${i}`,
        amount: 10,
        quantity: 1,
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
