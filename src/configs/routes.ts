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
        wrappers: ['@/layouts/retro'],
        component: '@/pages/retro',
        title: 'Home',
        exact: true,
      },
    ],
  },
];
