interface Route {
  /**
   * Any valid URL path
   */
  path?: string;
  /**
   * A React component to render only when the location matches.
   */
  component?: string | (() => any);
  wrappers?: string[];
  /**
   * navigate to a new location
   */
  redirect?: string;
  /**
   * When true, the active class/style will only be applied if the location is matched exactly.
   */
  exact?: boolean;
  routes?: any[];
  [k: string]: any;
}
const routes: Route[] = [
  {
    path: '/',
    component: '@/layouts',
    routes: [
      { redirect: '/basic', path: '/' },
      {
        path: '/basic',
        component: '@/layouts/basicLayout',
        wrappers: ['@/wrappers/verifyAccount.tsx'],
        routes: [
          { redirect: '/basic/home', path: '/basic' },
          {
            path: '/basic/home',
            component: '@/pages/home',
          },
          {
            path: '/basic/information',
            component: '@/pages/information',
            wrappers: ['@/wrappers/informationWrapper.tsx'],
          },
          {
            path: '/basic/project/underway',
            component: '@/pages/project/underway',
          },
          {
            path: '/basic/project/completed',
            component: '@/pages/project/completed',
          },
          {
            path: '/basic/setting',
            component: '@/pages/setting',
          },
        ],
      },
      {
        path: '/entrance',
        component: '@/layouts/userLayout',
        wrappers: ['@/wrappers/clearAccount.tsx'],
        routes: [
          { redirect: '/entrance/login', path: '/entrance' },
          {
            path: '/entrance/login',
            component: '@/pages/entrance/login',
          },
        ],
      },
    ],
  },
];
export default routes;
