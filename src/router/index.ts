import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'
import Layout from '@/layout/index.vue'


export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/profile',
    component: () => import('@/views/profile/index.vue'),
    meta: {
      hidden: true,
      title: 'profile'
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      hidden: true,
      title: '404'
    }
  },
  {
    path: '/401',
    component: () => import('@/views/error/401.vue'),
    meta: {
      hidden: true,
      title: '401'
    }
  }
]

export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          activePath: '/dashboard',
          title: 'Dashboard'
        }
      }
    ]
  },
  {
    path: '/permission',
    redirect: '/permission/page',
    component: Layout,
    name: 'permission',
    meta: {
      title: '权限管理'
    },
    children: [
      {
        path: 'page',
        name: 'permissionPage',
        component: () => import('@/views/permission/page.vue'),
        meta: {
          activePath: '/permission/page',
          title: '页面管理'
        }
      },
      {
        path: 'directive',
        name: 'permissionDirective',
        component: () => import('@/views/permission/directive.vue'),
        meta: {
          activePath: '/permission/directive',
          title: '指令管理'
        }
      },
      {
        path: 'role',
        name: 'permissionRole',
        component: () => import('@/views/permission/role.vue'),
        meta: {
          activePath: '/permission/role',
          title: '角色管理'
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

//scrollbehavior
const router = createRouter({
  scrollBehavior: () =>
    new Promise(() => {
      return { x: 0 }
    }),
  history: createWebHistory(process.env.BASE_URL),
  routes: asyncRoutes
})

export default router
