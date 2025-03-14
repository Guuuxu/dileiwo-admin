<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';

import { ElTabs, ElTabPane, ElCard, ElRow, ElCol } from 'element-plus';
import { useVbenForm } from '#/adapter/form';

defineOptions({
  name: 'FormDrawer',
});
import type { TabsPaneContext } from 'element-plus';
const activeName = ref('one');
const handleClick = (tab: TabsPaneContext) => {
  console.log(tab);
};

const [BaseForm, BaseFormApi] = useVbenForm({
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-2',
  schema: useSchema(),
  showDefaultActions: false,
  layout: 'vertical',
  // 所有表单项共用，可单独在表单内覆盖
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
          ...values.grade1,
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
  title: '编辑',
});
</script>
<template>
  <Drawer>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="陪玩等级1：实习" name="one">
        <BaseForm> </BaseForm>
      </el-tab-pane>
      <el-tab-pane label="陪玩等级2：挂名" name="two"> </el-tab-pane>
    </el-tabs>
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

::v-deep .el-tabs__item {
  font-size: 16px;
}
</style>
