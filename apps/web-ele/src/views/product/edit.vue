<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';

import { ElTabs, ElTabPane, ElCard, ElRow, ElMessage } from 'element-plus';
import { useVbenForm } from '#/adapter/form';
import { updateProduct } from '#/api';

defineOptions({
  name: 'FormDrawer',
});
const title = ref(''); // 用于 Drawer 的标题
// 定义自定义事件
const emits = defineEmits(['productUpdated']);

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {
    if (title.value === '新增') {
      const { valid } = await BaseFormApi.validate();
      if (valid) {
        const params = await BaseFormApi.getValues();
        params.id = id.value;
        const res = await updateProduct(params);
        ElMessage.success('操作成功');
        // 触发自定义事件通知父组件
        emits('productUpdated');
        drawerApi.close();
      }
    } else {
      const { valid } = await EditFormApi.validate();
      if (valid) {
        const params = await EditFormApi.getValues();
        params.id = id.value;
        const res = await updateProduct(params);
        ElMessage.success('操作成功');
        // 触发自定义事件通知父组件
        emits('productUpdated');
        drawerApi.close();
      }
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = drawerApi.getData<Record<string, any>>();
      console.log(drawerApi);
      title.value = values.title; // 设置标题为编辑
      id.value = values?.id;
      if (values) {
        EditFormApi.setValues({
          ...values,
        });
        ViewFormApi.setValues({
          ...values,
        })
      }
    }
  },
  title: '详情',
});

import { useSchema, useSchemaEdit,useSchemaDetail } from './data';
const [BaseForm, BaseFormApi] = useVbenForm({
  commonConfig: {
    // 在label后显示一个冒号
    colon: true,
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  schema: useSchema(),
  showDefaultActions: false,
});
const [BaseForm2, EditFormApi] = useVbenForm({
  commonConfig: {
    // 在label后显示一个冒号
    colon: true,
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  schema: useSchemaEdit(),
  showDefaultActions: false,
});

const [ViewForm, ViewFormApi] = useVbenForm({
  commonConfig: {
    // 在label后显示一个冒号
    colon: true,
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  schema: useSchemaDetail(),
  showDefaultActions: false,
});

const id = ref('');
</script>
<template>
  <Drawer>
    <BaseForm v-if="title === '新增'" />
    <ViewForm v-else-if="title === '明细'" ></ViewForm> 
    <BaseForm2 v-else />
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
