<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { ElButton, ElMessage, ElMessageBox } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { $t } from '#/locales';
import { getInventoryList, exportInventory } from '#/api';
import { downloadBlob } from '#/utils';
import { inventoryUseType } from '#/views/dict'

import Edit from './edit.vue';

const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: Edit,
});

const router = useRouter();

// 表格配置
interface RowType {
  id: number;
  created_at: string;
  package: string;
  customer: string;
  contact: string;
  address: string;
}
const dataList: any = ref([]);
const gridOptions: VxeGridProps<RowType> = {
  columns: [
    // { align: 'left', title: '', type: 'checkbox', width: 40 },
    { field: 'type_name', title: '型号', width: 150 },
    { field: 'detail_no', title: '包装编码', width: 150 },
    { field: 'month_limit', title: '总循环次数' },
    { field: 'limit_count', title: '单月已用' },
    { field: 'remain_count', title: '单月剩余用量' },
    { field: 'type', title: '类型', slots: { default: 'status' } },
    { field: 'rent_deadline', title: '最后使⽤⽇' },
    { field: 'name', title: '客户' },
    { field: 'receive_address', title: '收件人地址' },
    // {
    //   field: 'action',
    //   fixed: 'right',
    //   slots: { default: 'action' },
    //   title: '操作',
    //   width: 150,
    // },
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
        return await getInventoryList({
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
      label: '型号',
    },
    {
      component: 'Input',
      fieldName: 'client',
      label: '客户',
    },
    {
      component: 'Select',
      fieldName: 'type',
      label: '类型',
      componentProps: {
        clearable: true,
        options: inventoryUseType
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

async function handleExportRow() {
  exportInventory().then((res) => {
    console.log(res);
    downloadBlob(res.data, '包装库存.xlsx');
    // ElMessage.success('导出成功');
  });
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
const handleDeleteRow = (row: RowType) => {
  ElMessageBox.confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      // Perform delete operation here
      // const index = dataList.value.findIndex((item: { id: number; }) => item.id === row.id);
      // if (index !== -1) {
      //   dataList.value.splice(index, 1);
      //   ElMessage.success('删除成功');
      // }
      ElMessage.success('删除成功');
    })
    .catch(() => {
      ElMessage.info('已取消删除');
    });
};
</script>
<template>
  <Page auto-content-height :title="$t(router.currentRoute.value.meta.title)">
    <template #extra>
      <ElButton type="primary" @click="handleExportRow()"> 导出 </ElButton>
      <!-- <ElButton type="primary" @click="handleToDetail()"> 导入 </ElButton> -->
    </template>
    <Grid>
      <template #status="{ row }">
        <span v-if="row.status == 0 || row.status == 1">回收</span>
        <span v-else-if="row.status == 2">损坏</span>
        <span v-else>出库</span>
      </template>
      <!-- <template #action="{ row }">
        <ElButton type="primary" link @click="handleExportRow(row)">
          导出
        </ElButton>
      </template> -->
    </Grid>

    <Drawer />
  </Page>
</template>
