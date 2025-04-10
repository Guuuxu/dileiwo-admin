<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';

import { ElTabs, ElTabPane, ElCard, ElMessage } from 'element-plus';
import { useVbenForm } from '#/adapter/form';
import { handleScan } from '#/api';

defineOptions({
  name: 'FormDrawer',
});
// 定义自定义事件
const emits = defineEmits(['onUpdate']);
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
      label: '请扫描包装编码',
    },
  ],
  showDefaultActions: false,
});
const row = ref({});
// 输入确认
const handleEnterInput = async () => {
  const formValues = await BaseFormApi.getValues();
  console.log('handleEnterInput', formValues);
  const data = {
    id: row.value.id,
    type: 2,
    detail_no: formValues.detail_no,
  };

  const res = await handleScan(data);
  ElMessage.success('操作完成！');
  emits('productUpdated');
};

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {
    await BaseFormApi.submitForm();
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = drawerApi.getData<Record<string, any>>();
      if (values) {
        row.value = values;
      }
    }
  },
  title: '详情',
});
</script>
<template>
  <Drawer>
    <BaseForm />
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
