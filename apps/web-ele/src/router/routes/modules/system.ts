import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ion:settings-outline',
      order: 7000,
      title: $t('page.system.title'),
    },
    name: 'System',
    path: '/system',
    children: [
      {
        name: 'system.admin',
        path: '/system/admin',
        component: () => import('#/views/system/admin/index.vue'),
        meta: {
          icon: 'lucide:user-round',
          title: $t('page.system.administrator'),
        },
      },
      
    ],
  },
];

export default routes;
