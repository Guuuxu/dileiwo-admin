import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'carbon:shopping-catalog',
      order: 4000,
      title: '损坏管理',
      authority: ['0', '1', '2'], // 权限控制，0: 超级管理员, 1: 管理员, 2: 操作员, 3: 代工厂
    },
    name: 'damage',
    path: '/damage',

    children: [
      {
        name: 'damage.verification',
        path: '/damage/verification',
        component: () => import('#/views/damage/verification/index.vue'),
        meta: {
          icon: 'lucide:shopping-bag',
          title: '待验证',
        },
      },

      {
        name: 'damage.maintain',
        path: '/damage/maintain',
        component: () => import('#/views/damage/maintain/index.vue'),
        meta: {
          icon: 'lucide:file-code',
          title: '待维修',
        },
      },
      
    ],
  },
];

export default routes;
