import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'carbon:shopping-catalog',
      order: 5000,
      title: '库存管理',
    },
    name: 'inventory',
    path: '/inventory',
    children: [
      {
        name: 'inventory.package',
        path: '/inventory/package',
        component: () => import('#/views/inventory/package/index.vue'),
        meta: {
          icon: 'lucide:shopping-bag',
          title: '包装库存',
        },
      },

      {
        name: 'inventory.out',
        path: '/inventory/out',
        component: () => import('#/views/inventory/out/index.vue'),
        meta: {
          icon: 'lucide:file-code',
          title: '出库单库存',
        },
      },
      
    ],
    
  },
];

export default routes;
