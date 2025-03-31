<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';

import { ElTabs, ElTabPane,ElImage, ElCard, ElRow, ElCol } from 'element-plus';
import { useVbenForm } from '#/adapter/form';
import {certifyRepair} from '#/api'
defineOptions({
  name: 'FormDrawer',
});

const [BaseForm, BaseFormApi] = useVbenForm({
  schema: useSchema(),
  showDefaultActions: false,
});

import { useSchema } from './data';
const row = ref({})
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
        row.value = values
        BaseFormApi.setValues({
          ...values,
          main_img: [
            {
              name: 'logo-custom.png',
              url: 'https://egclub.nyc3.digitaloceanspaces.com/production/images/services/gift.png',
            },
          ],
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
        <ElImage
          class="grid-content"
          v-for="(item, index) in field.value"
          :key="index"
          :src="item.url"
          :alt="item.name"
          :preview-src-list="[item.url]"
        />
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
