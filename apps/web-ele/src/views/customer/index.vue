<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { ElButton, ElCard, ElMessage, ElTag } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getCustomerList, deleteCustomer, exportCustomerData } from '#/api';
import { $t } from '#/locales';

import Edit from './edit.vue';
import metric from './metric.vue';

const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: Edit,
});
const [Metric, metricApi] = useVbenDrawer({
  connectedComponent: metric,
});

const router = useRouter();

// 表格配置
interface RowType {
  id: number;
  created_at: string;
  name: string;
  law_person: string;
  contact: string;
  address: string;
}
const dataList: any = ref([]);
const gridOptions: VxeGridProps<RowType> = {
  columns: [
    // { align: 'left', title: '', type: 'checkbox', width: 40 },
    // { field: 'category', title: '型号' },
    { field: 'name', title: '客户名称' },
    { field: 'code', title: '登记注册号' },
    { field: 'law_person', title: '法定代表人' },
    // { field: 'status', title: '状态', slots: { default: 'status' } },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      width: 250,
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
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getCustomerList({
          page: page.currentPage,
          per_page: page.pageSize,
          ...formValues,
        });
      },
    },
  },
};
const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [
    {
      component: 'Input',
      fieldName: 'client',
      label: '客户',
      componentProps: {
        placeholder: '请输入客户名称、登记注册号',
      },
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 是否在字段值改变时提交表单
  submitOnChange: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
};
const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

// 新增
const handleAdd = () => {
  handleSetData({}, '新增');
};
// 编辑
const handleEditRow = (row: RowType) => {
  handleSetData(row, '编辑');
};

function handleExportRow(row: RowType) {
  exportCustomerData(row.id).then((res) => {});
}

const handleSetData = (row: RowType, title: string) => {
  drawerApi
    .setData({
      values: { ...row },
    })
    .setState({
      title,
    })
    .open();
};

import { ElMessageBox } from 'element-plus';
const handleDeleteRow = (row: RowType) => {
  ElMessageBox.confirm(
    '请注意，若删除后，该客户数据将一并从系统内删除',
    '请确认是否删除此客户',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  ).then(async () => {
    // Perform delete operation here
    await deleteCustomer(row.id);
    ElMessage.success('删除成功');
    gridApi.query();
  });
};
const handleMetricRow = (row: RowType) => {
  metricApi
    .setData({
      values: { ...row },
    })
    .setState({
      title: '指标',
    })
    .open();
};
const handleUpdate = () => {
  gridApi.reload();
};
</script>
<template>
  <Page auto-content-height :title="$t(router.currentRoute.value.meta.title)">
    <template #extra>
      <ElButton type="primary" @click="handleAdd()"> 新增 </ElButton>
      <!-- <ElButton type="primary" @click="handleToDetail()"> 导入 </ElButton> -->
    </template>
    <Grid>
      <template #status="{ row }">
        <ElTag :type="row.status ? 'success' : 'danger'">
          {{ row.status ? '已启用' : '已禁用' }}
        </ElTag>
      </template>
      <template #action="{ row }">
        <ElButton type="primary" link @click="handleEditRow(row)">
          编辑
        </ElButton>
        <ElButton type="primary" link @click="handleMetricRow(row)">
          指标
        </ElButton>
        <ElButton type="danger" link @click="handleDeleteRow(row)">
          删除
        </ElButton>
      </template>
    </Grid>

    <Drawer @onUpdated="handleUpdate" />
    <Metric />
  </Page>
</template>
