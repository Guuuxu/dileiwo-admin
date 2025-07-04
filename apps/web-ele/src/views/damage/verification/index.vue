<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { ElButton, ElMessage, ElMessageBox } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { $t } from '#/locales';
import { getVerifyList, certifyRepair } from '#/api';
import { damageReportStatusOptions } from '#/views/dict'

import Edit from './edit.vue';

const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: Edit,
});

const router = useRouter();

// 表格配置
interface RowType {
  id: number;
  created_at: string;
  category: string;
  user: string;
  codeRange: string;
}
const dataList: any = ref([]);
const gridOptions: VxeGridProps<RowType> = {
  columns: [
    // { align: 'left', title: '', type: 'checkbox', width: 40 },
    { field: 'order_no', title: '编号' },
    { field: 'detail_no', title: '包装编码' },
    { field: 'last_inbound', title: '最新入库日期' },
    { field: 'last_user', title: '最新使用者' },
    { field: 'transfer_no', title: '运输单号' },
    { field: 'status', title: '状态', cellRender:{
      name: 'CellSelectLabel',
      props:{
        options: damageReportStatusOptions
      }
    }},
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
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getVerifyList({
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
  fieldMappingTime: [['date', ['start', 'end']]],
  schema: [
    {
      component: 'Input',
      fieldName: 'type_name',
      label: '编号',
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
function handleEditRow(row: RowType) {
  handleSetData(row, '验证');
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
    .setState({
      title,
    })
    .open();
};

const handleUpdate = () => {
  gridApi.reload();
};

</script>
<template>
  <Page auto-content-height :title="$t(router.currentRoute.value.meta.title)">
    <!-- <template #extra>
      <ElButton type="primary" @click="handleAdd()"> 新增 </ElButton>
    </template> -->
    <Grid>
      <template #action="{ row }">
        <ElButton type="primary" link @click="handleEditRow(row)">
          验证
        </ElButton>
      </template>
    </Grid>

    <Drawer @onUpdated="handleUpdate" />
  </Page>
</template>
