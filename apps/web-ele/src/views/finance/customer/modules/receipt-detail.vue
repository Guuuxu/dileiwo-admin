<template>
  <div class="vp-raw h-[400px] w-full">
    <Grid> </Grid>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { Page, useVbenModal, VbenButton } from '@vben/common-ui';

import { ElButton, ElCard, ElMessage } from 'element-plus';

const router = useRouter();

// 表格配置
interface RowType {
  id: number;
  creatTime: string;
  name: string;
  customer: string;
  amount: string;
}
const dataList: any = ref([]);
const gridOptions: VxeGridProps<RowType> = {
  columns: [
    // { align: 'left', title: '', type: 'checkbox', width: 40 },
    { type: 'seq', width: 60 },
    { field: 'created_at', title: '收款日期' },
    { field: 'created_at', title: '合同编码' },
    { field: 'name', title: '合同名称' },
    { field: 'customer', title: '收款账户' },
    { field: 'amount', title: '收款金额' },
  ],
  data: dataList.value,
  height: 'auto',
  scrollY: {
    enabled: true,
    gt: 0,
  },
  showOverflow: true,

  pagerConfig: {
    enabled: false,
  },
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
        id: 10 + i,
        created_at: '2025-1-3',
        code: `WK000-${i}`,
        customer: '万科',
        name: '合同名称',
        amount: '1200',
      });
    }
    // gridApi.setGridOptions({ data: dataList });
  } catch (error) {
    console.error('Failed to load data:', error);
    // Implement user-friendly error handling
  }
};

const handleViewRow = (row: RowType) => {
  console.log('row:', row);
};
onMounted(() => {
  loadList(10);
});
</script>
