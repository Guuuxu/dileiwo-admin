import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'carbon:shopping-catalog',
      order: 3000,
      title: '包装出库',
    },
    name: 'delivery',
    path: '/delivery',

    component: () => import('#/views/delivery/index.vue'),
  },
];

export default routes;
