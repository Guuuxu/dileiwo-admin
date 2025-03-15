import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'carbon:shopping-catalog',
      order: 1000,
      title: '新品建立',
    },
    name: 'product',
    path: '/product',

    component: () => import('#/views/product/index.vue'),
  },
];

export default routes;
