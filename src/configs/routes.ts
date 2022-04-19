export default [
  {
    path: '/',
    component: '@/layouts/base',
    wrappers: [
      '@/wrappers/material-ui',
      // '@/wrappers/apollo-provider',
      // '@/wrappers/auth',
    ],
    routes: [
      {
        path: '/',
        wrappers: ['@/layouts/dynamic'],
        component: '@/pages/home',
        title: 'Home',
        exact: true,
      },
    ],
  },
];
