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
            <template #status="{ row }">
              <el-tag :type="row.status ? 'success' : 'danger'">{{
                row.status ? '已启用' : '已禁用'
              }}</el-tag>
            </template>
            <template #action="{ row }">
              <ElButton type="primary" link @click="handleEditRow(row)"
                >编辑
              </ElButton>
              <ElButton type="primary" link @click="handleDisabled(row)"
                >{{ row.status ? '禁用' : '启用' }}
              </ElButton>
              <ElButton type="danger" link @click="handleDeleteRow(row)"
                >删除
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
      component: 'Input',
      fieldName: 'name',
      label: '用户',
      componentProps: {
        placeholder: '请输入用户ID/昵称/手机号',
      },
    },
    {
      component: 'Select',
      fieldName: 'role',
      label: '角色',
      componentProps: {
        options: [
        { label: '管理员', value: 1 },
          { label: '操作员', value: 2 },
          { label: '代工厂', value: 3 },
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
import type { AdminInfo } from '@vben/types';
interface RowType extends AdminInfo {
  id: number;
  creatTime: string;
  status: number;
  name: string;
  phone: string;
  role: string;
}
const dataList: any = ref([]);
const gridOptions: VxeGridProps<RowType> = {
  columns: [
    // { align: 'left', title: '', type: 'checkbox', width: 40 },
    { field: 'id', title: 'ID' },
    { field: 'name', title: '姓名' },
    { field: 'role', title: '角色' },
    { field: 'phone', title: '手机号' },
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
        created_at: '2025-01-03',
        name: '张三',
        role: '超级管理员',
        status: 1,
        phone: '13800138000',
        remark: '备注一下',
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
  handleSetData({}, 'add');
};
// 编辑
function handleEditRow(row: RowType) {
  handleSetData(row, 'edit');
}
// 禁用
const handleDisabled = (row: RowType) => {
  row.status = row.status ? 0 : 1;
  ElMessage.success(`已${row.status === 1 ? '启用' : '禁用'}${row.name}`);
  // nextTick(() => {
  //   gridApi.reload();
  // });
};
// 导入
// 详情
const handleViewRow = (row: RowType) => {
  handleSetData(row, 'view');
};

const handleSetData = (row: RowType, pageType: string) => {
  drawerApi
    .setData({
      values: { ...row, pageType },
    })
    .open();
};

const handleDeleteRow = (row?: {}) => {
  console.log(`🚀 ~  ~ row:`, row);
};

onMounted(() => {
  loadList(2);
});
</script>
