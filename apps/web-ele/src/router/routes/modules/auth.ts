import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'carbon:shopping-catalog',
      order: 2000,
      title: '初始认证',
    },
    name: 'initAuth',
    path: '/initAuth',

    children: [
      {
        name: 'initAuth.new',
        path: '/initAuth/new',
        component: () => import('#/views/auth/new/index.vue'),
        meta: {
          icon: 'lucide:shopping-bag',
          title: '新品',
        },
      },

      {
        name: 'initAuth.maintain',
        path: '/initAuth/maintain',
        component: () => import('#/views/auth/maintain/index.vue'),
        meta: {
          icon: 'lucide:file-code',
          title: '维修品',
        },
      },
      
    ],
  },
];

export default routes;
