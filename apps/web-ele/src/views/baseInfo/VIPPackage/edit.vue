<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import {
  ElTabs,
  ElTabPane,
  ElCard,
  ElRow,
  ElCol,
  ElUpload,
  ElButton,
  ElIcon,
} from 'element-plus';
import { useVbenForm } from '#/adapter/form';

defineOptions({
  name: 'FormDrawer',
});

const [BaseForm, BaseFormApi] = useVbenForm({
  schema: useSchema(),

  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-2',
  showDefaultActions: false,
});

import { useSchema } from './data';

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
        BaseFormApi.setValues({
          ...values,
          itemIcon: [
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
      <template #emojiData="{ field }">
        <ElUpload
          v-model:file-list="field.value"
          list-type="picture-card"
          :auto-upload="false"
        >
          <ElIcon><Plus /></ElIcon>
          <template #tip>
            <div class="el-upload__tip">图片格式支持 .jpg/.jpeg/.png</div>
          </template>
        </ElUpload>
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
