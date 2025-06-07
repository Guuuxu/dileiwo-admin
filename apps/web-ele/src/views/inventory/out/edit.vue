<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { onMounted, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { useSchema } from './data';
import { getInventoryOutDetail, exportInventoryOut } from '#/api';
import { inventoryUseType } from '#/views/dict';

defineOptions({
  name: 'FormDrawer',
});
const row = ref({});
const [BaseForm, BaseFormApi] = useVbenForm({
  schema: useSchema(),
  showDefaultActions: false,
});

const [Drawer, drawerApi] = useVbenDrawer({
  class: 'w-[900px]',
  showConfirmButton: false,
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {
    // await exportInventoryOut(row.value.id);
    drawerApi.close();
  },
  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = drawerApi.getData<Record<string, any>>();
      if (values) {
        console.log('values', values);
        row.value = values;
        // const res = await getInventoryOutDetail(values.id,{
        //   page: 1,
        //   per_page: 20,
        // });
        // console.log('res', res);
        // gridApi.setGridOptions({
        //   data: res.list,
        // });
      }
    }
  },
  title: '详情',
});

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
    // { field: 'category', title: '型号' },
    { field: 'detail_no', title: '包装编码' },
    { field: 'month_count', title: '总循环次数' },
    { field: 'recycle_count', title: '单月已用', width: 80 },
    { field: 'remain_times', title: '单月剩余用量' },
    {
      field: 'status',
      title: '状态',
      cellRender: {
        name: 'CellSelectLabel',
        props: {
          options: inventoryUseType,
        },
      },
    },
    { field: 'rent_deadline', title: '租赁到期日' },
    { field: 'client_name', title: '客户' },
    { field: 'client_address', title: '收件人地址' },
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
      query: async ({ page }) => {
        return await getInventoryOutDetail(row.value.id, {
          page: page.currentPage,
          per_page: page.pageSize,
        });
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ gridOptions });
</script>
<template>
  <Drawer>
    <Grid>
      <template #status="{ row }">
        <el-tag :type="row.status ? 'success' : 'danger'">
          {{ row.status ? '出库' : '' }}
        </el-tag>
      </template>
    </Grid>
  </Drawer>
</template>
<style lang="scss" scoped>
.grid-content {
  width: 116px;
  height: 116px;
}

.player-card {
  font-size: 14px;
  line-height: 25px;
}

::v-deep .vxe-grid {
  padding: 0;
}
</style>
