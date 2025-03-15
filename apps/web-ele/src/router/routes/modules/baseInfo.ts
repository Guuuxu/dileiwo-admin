import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'carbon:shopping-catalog',
      order: 2000,
      title: '基础信息',
      hideInMenu: true,
    },
    name: 'baseInfo',
    path: '/baseInfo',
    children: [
      {
        name: 'baseInfo.services',
        path: '/baseInfo/services',
        component: () => import('#/views/baseInfo/services/index.vue'),
        meta: {
          icon: 'lucide:shopping-bag',
          title: '服务项目',
        },
      },

      {
        name: 'baseInfo.coin',
        path: '/baseInfo/coin',
        component: () => import('#/views/baseInfo/coin/index.vue'),
        meta: {
          icon: 'lucide:file-code',
          title: '水晶币配置',
        },
      },
      {
        name: 'baseInfo.package',
        path: '/baseInfo/package',
        component: () => import('#/views/baseInfo/VIPPackage/index.vue'),
        meta: {
          icon: 'lucide:clipboard-list',
          title: '平台会员套餐',
        },
      },
      {
        name: 'baseInfo.vipGrade',
        path: '/baseInfo/vipGrade',
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
