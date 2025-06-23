import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'carbon:shopping-catalog',
      order: 6000,
      title: '客户管理',
      authority: ['0', '1', '2'], // 权限控制，0: 超级管理员, 1: 管理员, 2: 操作员, 3: 代工厂
    },
    name: 'customer',
    path: '/customer',

    component: () => import('#/views/customer/index.vue'),
  },
];

export default routes;
