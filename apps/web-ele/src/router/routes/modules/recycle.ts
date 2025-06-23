import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'carbon:shopping-catalog',
      order: 3000,
      title: '回收复查',
      authority: ['0', '1', '2'], // 权限控制，0: 超级管理员, 1: 管理员, 2: 操作员, 3: 代工厂
    },
    name: 'recycle',
    path: '/recycle',

    component: () => import('#/views/recycle/index.vue'),
  },
];

export default routes;
