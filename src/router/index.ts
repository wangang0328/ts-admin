import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import Home from '../views/Home.vue'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
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
          activePath: '/dashboard'
        }
      }
    ]
  },
  {
    path: '/permission',
    redirect: '/permission/page',
    component: Layout,
    name: 'permission',
    children: [
      {
        path: 'page',
        name: 'permissionPage',
        component: () => import('@/views/permission/page.vue'),
        meta: {
          activePath: '/permission/page'
        }
      },
      {
        path: 'directive',
        name: 'permissionDirective',
        component: () => import('@/views/permission/directive.vue'),
        meta: {
          activePath: '/permission/directive'
        }
      },
      {
        path: 'role',
        name: 'permissionRole',
        component: () => import('@/views/permission/role.vue'),
        meta: {
          activePath: '/permission/role'
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
