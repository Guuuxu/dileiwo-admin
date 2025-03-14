<template>
  <Page :title="$t(router.currentRoute.value.meta.title)">
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
            <template #status="{ row }">
              <el-tag :type="row.status ? 'success' : 'danger'">{{
                row.status ? '已启用' : '已禁用'
              }}</el-tag>
            </template>
            <template #action="{ row }">
              <ElButton type="primary" link @click="handleEditRow(row)"
                >编辑
              </ElButton>
              <ElButton type="danger" link @click="handleDisabledRow(row)"
                >禁用
              </ElButton>
            </template>
          </Grid>
        </div>
      </template>
    </ElCard>

    <Drawer />
  </Page>
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { Page, useVbenDrawer, VbenButton } from '@vben/common-ui';
import Edit from './edit.vue';
const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: Edit,
});

import { ElButton, ElCard, ElMessage, ElTag } from 'element-plus';

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
      component: 'Select',
      fieldName: 'name',
      label: '状态',
      componentProps: {
        options: [
          { label: '已启用', value: 1 },
          { label: '已禁用', value: 0 },
        ],
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
  quantity: number;
  itemIcon: string;
  status: number;
  order: string;
}
const dataList: any = ref([]);
const gridOptions: VxeGridProps<RowType> = {
  columns: [
    // { align: 'left', title: '', type: 'checkbox', width: 40 },
    { field: 'quantity', title: '水晶数量' },
    { field: 'ios_price', title: 'iOS购买价格' },
    { field: 'android_price', title: '安卓购买价格' },
    { field: 'status', title: '状态', slots: { default: 'status' } },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      width: 150,
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
        createTime: '2025-01-03',
        quantity: (i + 1) * 10,
        ios_price: '$100',
        android_price: '$100',
        name: '守望先锋',
        status: 1,
      });
    }
    // gridApi.setGridOptions({ data: dataList });
  } catch (error) {
    console.error('Failed to load data:', error);
    // Implement user-friendly error handling
  }
};

// 新增
const handleAdd = () => {
  handleSetData({}, '新增');
};
// 编辑
function handleEditRow(row: RowType) {
  handleSetData(row, '编辑');
}
// 详情
const handleViewRow = (row: RowType) => {
  handleSetData(row, '详情');
};

const handleSetData = (row: RowType, title: string) => {
  drawerApi
    .setData({
      values: { ...row },
    })
    .setState({ title })
    .open();
};

// 禁用
const handleDisabledRow = (row: RowType) => {
  row.status = row.status === 1 ? 0 : 1;
  ElMessage.success(`${row.status === 1 ? '已启用' : '已禁用'}`);
};

onMounted(() => {
  loadList(5);
});
</script>
