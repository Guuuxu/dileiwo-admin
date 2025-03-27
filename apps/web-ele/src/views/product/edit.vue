<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';

import { ElTabs, ElTabPane, ElCard, ElRow, ElMessage } from 'element-plus';
import { useVbenForm } from '#/adapter/form';
import { updateProduct, } from '#/api';

defineOptions({
  name: 'FormDrawer',
});
// 定义自定义事件
const emits = defineEmits(['productUpdated']);
const [BaseForm, BaseFormApi] = useVbenForm({
  schema: useSchema(),
  showDefaultActions: false,
});

import { useSchema } from './data';
const id = ref('')
const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {
    const {valid} = await BaseFormApi.validate();
    if(valid){
      const params = await BaseFormApi.getValues();
      params.id = id.value;
      const res = await updateProduct(params);
      ElMessage.success('操作成功');
      // 触发自定义事件通知父组件
      emits('productUpdated', params);
      drawerApi.close();
    }
    
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = drawerApi.getData<Record<string, any>>();
      id.value = values.id;
      if (values) {
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
