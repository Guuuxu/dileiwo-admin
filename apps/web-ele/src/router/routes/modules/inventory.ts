import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'carbon:shopping-catalog',
      order: 5000,
      title: '库存管理',
      authority: ['0', '1', '2'], // 权限控制，0: 超级管理员, 1: 管理员, 2: 操作员, 3: 代工厂
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
          title: '使⽤记录',
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
