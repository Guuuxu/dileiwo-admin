<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useAppConfig } from '@vben/hooks';
import { useVbenDrawer } from '@vben/common-ui';
const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);
import { ElMessage, ElImage } from 'element-plus';
import { useVbenForm } from '#/adapter/form';
import { certifyRepair } from '#/api';
defineOptions({
  name: 'FormDrawer',
});

const [BaseForm, BaseFormApi] = useVbenForm({
  schema: useSchema(),
  showDefaultActions: false,
});

import { useSchema } from './data';
const row = ref({});
const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {
    await certifyRepair(row.value.id);
    ElMessage.success('验证成功');
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = drawerApi.getData<Record<string, any>>();
      console.log('values', values);
      if (values) {
        row.value = values;
        BaseFormApi.setValues({
          ...values,
          main_img: [values.main_img, values.first_img, values.second_img],
        });
      }
    }
  },
  title: '详情',
});
</script>
<template>
  <Drawer>
    <BaseForm>
      <template #main_img="{ field }">
        <div v-for="(item, index) in field.value" :key="index">
          <ElImage
            class="grid-content mr-1"
            v-if="item"
            :src="item"
            :alt="item"
            :preview-src-list="[item]"
          />
        </div>
      </template>
    </BaseForm>
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
