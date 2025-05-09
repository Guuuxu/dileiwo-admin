import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: $t('page.dashboard.workspace'),
    },
    name: 'Dashboard',
    path: '/dashboard',
    component: () => import('#/views/dashboard/workspace/index.vue'),
  },
];

export default routes;
