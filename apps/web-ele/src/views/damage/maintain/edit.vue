<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { ElButton, ElCard, ElMessage, ElTag } from 'element-plus';

import { useSchema, useSchemaReason } from './data';
import { scanRepair, updateRepair, getRepairDetail } from '#/api'; // 定义自定义事件
const emits = defineEmits(['onUpdated']);

defineOptions({
  name: 'FormDrawer',
});
const step = ref('0');
const row = ref({});
const [BaseForm, BaseFormApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        onKeyup(e: any) {
          if (e.key === 'Enter') {
            handleEnterInput();
          }
        },
      },
      fieldName: 'detail_no',
      label: '请扫描损坏品包装编码',
      labelWidth: 150, // 设置label宽度
      rules: 'required',
    },
  ],
  layout: 'vertical',
  showDefaultActions: false,
});
const codeDetail = ref({});
// 输入确认
const handleEnterInput = async () => {
  const formValues = await BaseFormApi.getValues();
  console.log('handleEnterInput', formValues);
  const detail_no = formValues.detail_no;
  console.log('handleEnterInput', detail_no);
  const res = await scanRepair(detail_no);
  detail.value = res;
  // emits('onUpdated');
  gridApi.setGridOptions({ data: [res] });
  step.value = '1';
  // ElMessage.success('认证完成！');
};

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
      // const { valid } = await BaseFormApi.validate();
      // if (valid) {
      //   const values = await BaseFormApi.getValues();
      //   const res = await scanRepair(values);
      //   detail.value = res;
      // }
      // step.value = '1';
    } else {
      const values = await BaseFormApi2.getValues();
      console.log(values);
      const reasonArray = Object.values(values.reason).map(Number);
      await updateRepair({
        model_detail_id: detail.value.id,
        broken_reason: [Number(values.reason)],
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
        row.value = values;
        BaseFormApi.setValues({
          ...values,
        });
      }
    } else {
      step.value = '0';
      BaseFormApi.resetForm();
      BaseFormApi2.resetForm();
    }
  },
  title: '详情',
});

// 表格配置
interface RowType {
  id: number;
  verify_time: string;
  detail_no: string;
  user: string;
  type_name: string;
}
const dataList: any = ref([]);
const gridOptions: VxeGridProps<RowType> = {
  columns: [
    // { align: 'left', title: '', type: 'checkbox', width: 40 },
    { field: 'type_name', title: '型号' },
    { field: 'detail_no', title: '包装编码' },
    { field: 'verify_time', title: '最新入库日期' },
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
