<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';

import {
  ElTabs,
  ElTabPane,
  ElCard,
  ElRow,
  ElCol,
  ElMessage,
} from 'element-plus';
import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { getCustomerMetrics } from '#/api';
// 定义自定义事件
const emits = defineEmits(['onUpdated']);
defineOptions({
  name: 'FormDrawer',
});
const id = ref('');

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
    { field: 'type_name', title: '型号' },
    { field: 'amount', title: '数量' },
    { field: 'times_count', title: '累计循环次数' },
    { field: 'cycle_rate', title: '累计循环比率' },
    { field: 'cycle_modify', title: '循环次数调整次量' },
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
  pagerConfig: {
    enabled: false,
  },
  // proxyConfig: {
  //   ajax: {
  //     query: async ({ page },formValues) => {
  //       return await getCustomerMetrics(id.value);
  //     },
  //   },
  // },
};

const [Grid, gridApi] = useVbenVxeGrid({ gridOptions });

const [Drawer, drawerApi] = useVbenDrawer({
  showConfirmButton: false,
  cancelText: '关闭',
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {},
  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = drawerApi.getData<Record<string, any>>();
      if (values) {
        id.value = values.id;
        const res = await getCustomerMetrics(id.value);
        console.log(res);
        gridApi.setGridOptions({ data: res });
      }
    }
  },
  title: '详情',
});
</script>
<template>
  <Drawer>
    <Grid />
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
