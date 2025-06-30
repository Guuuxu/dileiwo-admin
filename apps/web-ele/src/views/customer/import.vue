<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';

import { ElTabs, ElTabPane, ElCard, ElRow, ElCol,ElMessage } from 'element-plus';
import { useVbenForm } from '#/adapter/form';
import { updateCustomer } from '#/api';
// 定义自定义事件
const emits = defineEmits(['onUpdated']);
defineOptions({
  name: 'FormDrawer',
});
const id = ref('')
const [BaseForm, BaseFormApi] = useVbenForm({
  schema: useSchema(),
  showDefaultActions: false,
});

import { useSchema } from './data';

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {
    const {valid} = await BaseFormApi.validate();
    if (valid) {
      const values= await BaseFormApi.getValues();
      const params = {
        id: id.value,
        ...values,
      };
      const res = await updateCustomer(params);
      ElMessage.success('操作成功');
      // 触发自定义事件通知父组件
            emits('onUpdated', params);
      drawerApi.close();
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = drawerApi.getData<Record<string, any>>();
      if (values) {
        id.value = values.id;
        BaseFormApi.setValues({
          ...values,

        });
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
