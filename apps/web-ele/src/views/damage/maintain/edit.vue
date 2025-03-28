<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { ElButton, ElCard, ElMessage, ElTag } from 'element-plus';

import { useSchema, useSchemaReason } from './data';
import { scanRepair, updateRepair } from '#/api'; // 定义自定义事件
const emits = defineEmits(['onUpdated']);

defineOptions({
  name: 'FormDrawer',
});
const step = ref('0');
const [BaseForm, BaseFormApi] = useVbenForm({
  schema: useSchema(),
  layout: 'vertical',
  showDefaultActions: false,
});

const [BaseForm2, BaseFormApi2] = useVbenForm({
  schema: useSchemaReason(),
  layout: 'vertical',
  showDefaultActions: false,
});
const detail = ref({});
const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {
    if (step.value === '0') {
      const { valid } = await BaseFormApi.validate();
      if (valid) {
        const values = await BaseFormApi.getValues();
        const res = await scanRepair(values);
        detail.value = res;
      }

      step.value = '1';
    } else {
      const values = await BaseFormApi2.getValues();
      console.log(values);
      const reasonArray = Object.values(values.reason).map(Number);
      await updateRepair({
        model_detail_id: detail.value.id,
        broken_reason: Number(values.reason),
        reason: values.remark,
      });
      ElMessage.success('提交成功');
      emits('onUpdated');
      drawerApi.close();
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = drawerApi.getData<Record<string, any>>();
      if (values) {
        BaseFormApi.setValues({
          ...values,
        });
      }
    }
  },
  title: '详情',
});

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
    { field: 'category', title: '型号' },
    { field: 'codeRange', title: '包装编码' },
    { field: 'created_at', title: '最新入库日期' },
    { field: 'user', title: '最新使用者' },
  ],
  data: dataList.value,
  height: '500px',
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
        id: 10_000 + i,
        created_at: '2025-01-03',
        category: '100',
        user: '张三',
        codeRange: '1 - 10002',
        remark: '备注一下',
      });
    }
    // gridApi.setGridOptions({ data: dataList });
  } catch (error) {
    console.error('Failed to load data:', error);
    // Implement user-friendly error handling
  }
};
onMounted(() => {
  loadList(6);
});
</script>
<template>
  <Drawer>
    <BaseForm v-if="step === '0'" />

    <template v-else>
      <Grid style="height: auto" />
      <BaseForm2 class="mt-5" />
    </template>
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
