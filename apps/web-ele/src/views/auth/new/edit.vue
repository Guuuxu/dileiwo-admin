<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';
import { ref } from 'vue';

import { useVbenForm } from '#/adapter/form';

import { useSchema } from './data';
import { handleScan} from '#/api'
import { ElMessage } from 'element-plus';

defineOptions({
  name: 'FormDrawer',
});
const row = ref({})
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
      fieldName: 'code',
      label: '请扫描包装编码',
    },
  ],
  showDefaultActions: false,
});

const [Drawer, drawerApi] = useVbenDrawer({
  showConfirmButton:false,
  cancelText:'完成',
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
        row.value = values
      }
    }
  },
  title: '详情',
});
// 输入确认
const handleEnterInput = async () => {
  const formValues = await BaseFormApi.getValues()
  console.log('handleEnterInput',formValues );
  const data = {
    id: row.value.id,
    type: 1,
    detail_no: formValues.code
  }
  console.log('handleEnterInput', data);
  const res = await handleScan(data)
    ElMessage.success('认证完成！')
};
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
