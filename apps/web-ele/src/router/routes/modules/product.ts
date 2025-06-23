import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'carbon:shopping-catalog',
      order: 1000,
      title: '新品建立',
      authority: ['0', '1', '2'], // 权限控制，0: 超级管理员, 1: 管理员, 2: 操作员, 3: 代工厂
    },
    name: 'product',
    path: '/product',

    component: () => import('#/views/product/index.vue'),
  },
];

export default routes;
