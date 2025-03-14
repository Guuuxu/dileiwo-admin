<template>
  <Page :title="$t(router.currentRoute.value.meta.title)">
    <el-card class="text-[14px]">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="陪玩等级1：实习" name="one">
          <div class="mt-4 text-black">订单分成比例</div>
          <el-row>
            <el-col :span="8"
              >陪玩订单分成: {{ agentList.grade1.order_player }}</el-col
            >
            <el-col :span="8"
              >平台订单分成: {{ agentList.grade1.order_plateform }}</el-col
            >
          </el-row>
          <h3 class="text-black">礼物分成比例</h3>
          <el-row>
            <el-col :span="8"
              >陪玩礼物分成: {{ agentList.grade1.gift_player }}</el-col
            >
            <el-col :span="8"
              >平台礼物分成: {{ agentList.grade1.gift_plateform }}</el-col
            >
          </el-row>
          <h3 class="text-black">陪玩基础价格配置</h3>
          <el-row>
            <el-col :span="8"
              >基础局数陪玩金额: {{ agentList.grade1.base_round_price }}</el-col
            >
            <el-col :span="8"
              >基础时长陪玩金额: {{ agentList.grade1.base_hour_price }}</el-col
            >

            <el-col :span="8"
              >基础代练陪玩金额: {{ agentList.grade1.base_title_price }}</el-col
            >
            <el-col :span="8"
              >基础冠名陪玩金额: {{ agentList.grade1.title_game_hour }}</el-col
            >
            <el-col :span="8"
              >冠名附赠游戏时长最低不少于:
              {{ agentList.grade1.title_game_hour }}
            </el-col>
            <el-col :span="8"
              >每次涨价幅度不得超过:
              {{ agentList.grade1.increase_price }}</el-col
            >
          </el-row>

          <h3 class="text-black">其他</h3>
          <el-row>
            <el-col :span="8"
              >其他增量价格: {{ agentList.grade1.other_next_price }}</el-col
            >
            <el-col :span="8"
              >展示图标: {{ agentList.grade1.display_icon }}</el-col
            >
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="陪玩等级2：挂名" name="two">
          <div class="mt-4 text-black">订单分成比例</div>
          <el-row>
            <el-col :span="8"
              >陪玩订单分成: {{ agentList.grade1.order_player }}</el-col
            >
            <el-col :span="8"
              >平台订单分成: {{ agentList.grade1.order_plateform }}</el-col
            >
          </el-row>
          <h3 class="text-black">礼物分成比例</h3>
          <el-row>
            <el-col :span="8"
              >陪玩礼物分成: {{ agentList.grade1.gift_player }}</el-col
            >
            <el-col :span="8"
              >平台礼物分成: {{ agentList.grade1.gift_plateform }}</el-col
            >
          </el-row>
          <h3 class="text-black">陪玩基础价格配置</h3>
          <el-row>
            <el-col :span="8"
              >基础局数陪玩金额: {{ agentList.grade1.base_round_price }}</el-col
            >
            <el-col :span="8"
              >基础时长陪玩金额: {{ agentList.grade1.base_hour_price }}</el-col
            >

            <el-col :span="8"
              >基础代练陪玩金额: {{ agentList.grade1.base_title_price }}</el-col
            >
            <el-col :span="8"
              >基础冠名陪玩金额: {{ agentList.grade1.title_game_hour }}</el-col
            >
            <el-col :span="8"
              >冠名附赠游戏时长最低不少于:
              {{ agentList.grade1.title_game_hour }}
            </el-col>
            <el-col :span="8"
              >每次涨价幅度不得超过:
              {{ agentList.grade1.increase_price }}</el-col
            >
          </el-row>

          <h3 class="text-black">其他</h3>
          <el-row>
            <el-col :span="8"
              >其他增量价格: {{ agentList.grade1.other_next_price }}</el-col
            >
            <el-col :span="8"
              >展示图标: {{ agentList.grade1.display_icon }}</el-col
            >
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="陪玩等级3：独家" name="three">
          <div class="mt-4 text-black">订单分成比例</div>
          <el-row>
            <el-col :span="8"
              >陪玩订单分成: {{ agentList.grade1.order_player }}</el-col
            >
            <el-col :span="8"
              >平台订单分成: {{ agentList.grade1.order_plateform }}</el-col
            >
          </el-row>
          <h3 class="text-black">礼物分成比例</h3>
          <el-row>
            <el-col :span="8"
              >陪玩礼物分成: {{ agentList.grade1.gift_player }}</el-col
            >
            <el-col :span="8"
              >平台礼物分成: {{ agentList.grade1.gift_plateform }}</el-col
            >
          </el-row>
          <h3 class="text-black">陪玩基础价格配置</h3>
          <el-row>
            <el-col :span="8"
              >基础局数陪玩金额: {{ agentList.grade1.base_round_price }}</el-col
            >
            <el-col :span="8"
              >基础时长陪玩金额: {{ agentList.grade1.base_hour_price }}</el-col
            >

            <el-col :span="8"
              >基础代练陪玩金额: {{ agentList.grade1.base_title_price }}</el-col
            >
            <el-col :span="8"
              >基础冠名陪玩金额: {{ agentList.grade1.title_game_hour }}</el-col
            >
            <el-col :span="8"
              >冠名附赠游戏时长最低不少于:
              {{ agentList.grade1.title_game_hour }}
            </el-col>
            <el-col :span="8"
              >每次涨价幅度不得超过:
              {{ agentList.grade1.increase_price }}</el-col
            >
          </el-row>

          <h3 class="text-black">其他</h3>
          <el-row>
            <el-col :span="8"
              >其他增量价格: {{ agentList.grade1.other_next_price }}</el-col
            >
            <el-col :span="8"
              >展示图标: {{ agentList.grade1.display_icon }}</el-col
            >
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="陪玩等级4：金牌" name="four">
          <div class="mt-4 text-black">订单分成比例</div>
          <el-row>
            <el-col :span="8"
              >陪玩订单分成: {{ agentList.grade1.order_player }}</el-col
            >
            <el-col :span="8"
              >平台订单分成: {{ agentList.grade1.order_plateform }}</el-col
            >
          </el-row>
          <h3 class="text-black">礼物分成比例</h3>
          <el-row>
            <el-col :span="8"
              >陪玩礼物分成: {{ agentList.grade1.gift_player }}</el-col
            >
            <el-col :span="8"
              >平台礼物分成: {{ agentList.grade1.gift_plateform }}</el-col
            >
          </el-row>
          <h3 class="text-black">陪玩基础价格配置</h3>
          <el-row>
            <el-col :span="8"
              >基础局数陪玩金额: {{ agentList.grade1.base_round_price }}</el-col
            >
            <el-col :span="8"
              >基础时长陪玩金额: {{ agentList.grade1.base_hour_price }}</el-col
            >

            <el-col :span="8"
              >基础代练陪玩金额: {{ agentList.grade1.base_title_price }}</el-col
            >
            <el-col :span="8"
              >基础冠名陪玩金额: {{ agentList.grade1.title_game_hour }}</el-col
            >
            <el-col :span="8"
              >冠名附赠游戏时长最低不少于:
              {{ agentList.grade1.title_game_hour }}
            </el-col>
            <el-col :span="8"
              >每次涨价幅度不得超过:
              {{ agentList.grade1.increase_price }}</el-col
            >
          </el-row>

          <h3 class="text-black">其他</h3>
          <el-row>
            <el-col :span="8"
              >其他增量价格: {{ agentList.grade1.other_next_price }}</el-col
            >
            <el-col :span="8"
              >展示图标: {{ agentList.grade1.display_icon }}</el-col
            >
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <div class="flex justify-end">
          <VbenButton type="primary" @click="handleEditRow"
            >编辑陪玩身份信息</VbenButton
          >
        </div>
      </template>
    </el-card>

    <Drawer />
  </Page>
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

import { Page, useVbenDrawer, VbenButton } from '@vben/common-ui';
import Edit from './edit.vue';
const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: Edit,
  class: 'w-[700px]',
});

import {
  ElButton,
  ElCard,
  ElMessage,
  ElTabs,
  ElTabPane,
  ElRow,
  ElCol,
} from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { $t } from '#/locales';

const router = useRouter();
import type { TabsPaneContext } from 'element-plus';
const activeName = ref('one');
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
];
const agentList = ref({
  grade1: {
    order_player: '40%',
    order_plateform: '60%',
    gift_player: '50%',
    gift_plateform: '50%',
    base_round_price: '100',
    base_hour_price: '100',
    base_title_price: '300', //冠名
    title_game_hour: '5小时',
    increase_price: '50%',
    other_next_price: '500',
    display_icon: 'icon',
  },
});

// 编辑
function handleEditRow() {
  handleSetData(agentList.value);
}

const handleSetData = (row: any) => {
  drawerApi
    .setData({
      values: { ...row },
    })
    .open();
};
</script>
<style lang="scss" scoped>
.el-col {
  margin-top: 15px;
}

h3 {
  margin-top: 50px;
}

::v-deep .el-tabs__item {
  font-size: 16px;
}
</style>
