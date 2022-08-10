import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue'),
      meta: {
        auth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/Register.vue'),
      meta: {
        auth: false
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/errors/404.vue'),
      meta: {
        guest: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userState = useUserStore()
  const initState = userState.initializeapp()
  
  if (initState) {
    if (to.meta.auth || to.meta.guest) return next()
    return next({ path: '/' })
  } else {
    if (!to.meta.auth || to.meta.guest) return next()
    if (to.meta.auth) return next({ path: '/login' })
  }
})

router.afterEach((to, from) => {
  // 
})

export default router
