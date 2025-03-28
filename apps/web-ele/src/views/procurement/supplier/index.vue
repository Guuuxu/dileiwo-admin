<template>
  <Page :title="$t(router.currentRoute.value.meta.title)">
    <template #extra>
      <ElButton type="primary" @click="handleAdd()"> 新增 </ElButton>
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
          <Grid>
            <template #action="{ row }">
              <ElButton type="primary" link @click="handleEditRow(row)"
                >编辑
              </ElButton>
              <ElButton type="primary" link @click="handleViewRow(row)"
                >明细
              </ElButton>
            </template>
          </Grid>
        </div>
      </template>
    </ElCard>

    <FormModal v-model:row="currentRow" :title="modalTitle" />
  </Page>
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { Page, useVbenModal, VbenButton } from '@vben/common-ui';
import EditModal from './edit-modal.vue';
const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: EditModal,
  closeOnClickModal: false,
});

import { ElButton, ElCard, ElMessage } from 'element-plus';

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
      component: 'DatePicker',
      fieldName: 'created_at',
      label: '日期',
      formItemClass: 'col-span-2',
      componentProps: {
        type: 'daterange',
        'start-placeholder': '开始日期',
        'end-placeholder': '结束日期',
      },
    },
    {
      component: 'Input',
      fieldName: 'code',
      label: '供应商编号',
    },
    {
      component: 'Input',
      fieldName: 'name',
      label: '供应商名称',
    },
  ],
});

// 新增
const handleAdd = () => {
  modalTitle.value = '新增';
  nextTick(() => {
    formModalApi.open();
  });
};
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
  code: string;
  name: string;
  contact: string;
  phone: string;
  amount: string;
  address: string;
}
const dataList: any = ref([]);
const gridOptions: VxeGridProps<RowType> = {
  columns: [
    // { align: 'left', title: '', type: 'checkbox', width: 40 },
    { type: 'seq', width: 60 },
    { field: 'code', title: '供应商名称' },
    { field: 'name', title: '供应商编号' },
    { field: 'contact', title: '联系人' },
    { field: 'phone', title: '联系电话' },
    { field: 'address', title: '地址' },
    { field: 'remark', title: '备注' },
    { field: 'amount', title: '上期尾款' },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      width: 120,
    },
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
        code: `WK000-${i}`,
        name: '万科',
        amount: '1000.00',
        contact: '李总',
        phone: '15888888888',
        address: '广东省深圳市南山区',
        remark: '备注',
      });
    }
    // gridApi.setGridOptions({ data: dataList });
  } catch (error) {
    console.error('Failed to load data:', error);
    // Implement user-friendly error handling
  }
};

// 编辑
const modalTitle = ref('新增');
const currentRow: any = ref({});
function handleEditRow(row: RowType) {
  currentRow.value = row;
  console.log(row);
  modalTitle.value = '编辑';
  nextTick(() => {
    formModalApi.open();
  });
}
const handleViewRow = (row: RowType) => {
  console.log(`🚀 ~ handleViewRow ~ row:`, row);
  currentRow.value = row;
  modalTitle.value = '明细';
  nextTick(() => {
    formModalApi.open();
  });
};
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
