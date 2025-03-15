import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'carbon:shopping-catalog',
      order: 2000,
      title: '规则管理',
      hideInMenu: true,
    },
    name: 'rules',
    path: '/rules',
    children: [
      {
        name: 'rules.agents',
        path: '/rules/agents',
        component: () => import('#/views/rules/agents/index.vue'),
        meta: {
          icon: 'lucide:shopping-bag',
          title: '陪玩规则',
        },
      },

      {
        name: 'rules.rechargeAndpoints',
        path: '/rules/rechargeAndpoints',
        component: () => import('#/views/rules/rechargeAndpoints/index.vue'),
        meta: {
          icon: 'lucide:file-code',
          title: '充值与积分兑换比例规则',
        },
      },
      {
        name: 'rules.package',
        path: '/rules/package',
        component: () => import('#/views/baseInfo/VIPPackage/index.vue'),
        meta: {
          icon: 'lucide:clipboard-list',
          title: '平台会员套餐',
        },
      },
      {
        name: 'rules.vipGrade',
        path: '/rules/vipGrade',
        component: () => import('#/views/baseInfo/VIPGrade/index.vue'),
        meta: {
          icon: 'lucide:clipboard-list',
          title: 'VIP等级管理',
        },
      },
    ],
  },
];

export default routes;
