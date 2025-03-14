<template>
  <Page :title="$t(router.currentRoute.value.meta.title)">
    <template #extra>
      <!-- <ElButton type="primary" @click="handleAdd()"> 新增 </ElButton> -->
      <!-- <ElButton type="primary" @click="handleToDetail()"> 导入 </ElButton> -->
    </template>
    <ElCard>
      <template #default>
        <Form>
          <template #reset-before>
            <ElButton type="primary" @click="handleSearch">搜索</ElButton>
          </template>
          <template #submit-before>
            <ElButton @click="handleReset">清空</ElButton>
          </template>
        </Form>
        <div class="vp-raw h-[500px] w-full">
          <Grid> </Grid>
        </div>
      </template>
    </ElCard>
    <Modal ref="dataTable" class="w-[600px]" title="新增"> </Modal>
    <FormModal />
  </Page>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { Page, useVbenModal, VbenButton } from '@vben/common-ui';
import EditModal from './edit-modal.vue';
const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: EditModal,
  closeOnClickModal: false,
});

import {
  ElButton,
  ElCard,
  ElLink,
  ElMessage,
  ElPagination,
  ElTable,
  ElTag,
} from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { $t } from '#/locales';

const router = useRouter();
const [Form, formApi] = useVbenForm({
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  layout: 'horizontal',
  resetButtonOptions: { show: false },
  submitButtonOptions: { show: false },
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
  handleSubmit: (values) => {
    ElMessage.success(`表单数据：${JSON.stringify(values)}`);
  },
  schema: [
    {
      component: 'Input',
      fieldName: 'customer',
      label: '客户名称',
    },
    {
      component: 'DatePicker',
      fieldName: 'rangePicker',
      label: '日期',
      formItemClass: 'col-span-2',
      componentProps: {
        type: 'daterange',
        'start-placeholder': '开始日期',
        'end-placeholder': '结束日期',
      },
    },
  ],
});

function handleSearch() {
  formApi.getValues();
}
function handleReset() {
  formApi.resetForm();
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
  signatory: string;
  unit: string;
  deliveryDate: string;
  dueDate: string;
  remark: string;
}
const dataList: any = ref([]);
const gridOptions: VxeGridProps<RowType> = {
  columns: [
    { align: 'left', title: '', type: 'checkbox', width: 40 },
    { type: 'seq', width: 60 },
    {
      field: 'createTime',
      title: '签订日期',
    },
    { field: 'contractNo', title: '合同号' },
    { field: 'name', title: '合同名称' },
    { field: 'amount', title: '合同金额' },
    { field: 'customer', title: '已供货' },
    { field: 'code', title: '供货单号' },
    { field: 'customer', title: '未供货' },
    { field: 'customer', title: '已收款' },
    { field: 'customer', title: '未收款' },
    { field: 'customer', title: '已开票' },
    { field: 'customer', title: '发票号' },
    { field: 'customer', title: '未开票' },
  ],
  data: dataList.value,
  height: 'auto',
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
  //         pageSize: page.pageSize,
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
        customer: '1000',
        amount: 5 * i,
        signatory: '李安嗡',
        deliveryDate: '2025-02-28',
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

// 启用
const handleWork = (status: number) => {
  const selection = gridApi.grid?.getCheckboxRecords(false);
  selection.forEach((element) => {
    element.status = status;
  });
  ElMessage.success(status ? '已启用！' : '已停用！');
};

function hasEditStatus(row: RowType) {
  return gridApi.grid?.isEditByRow(row);
}

function editRowEvent(row: RowType) {
  gridApi.grid?.setEditRow(row);
}
const handleToDetail = (row?: {}) => {
  console.log(`🚀 ~ handleToDetail ~ row:`, row);
  router.push({
    path: `/booking/view`,
    // query: {
    //   id: row.hbl_no,
    // },
  });
};
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
  loadList(30);
});
</script>
