import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
const MainView = () => import('../views/MainView.vue')
const LoginView = () => import('../views/LoginView.vue')
const RegisterView = () => import('../views/RegisterView.vue')
const AccountView = () => import('../views/AccountView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      alias: '/videos'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register', 
      name: 'register',
      component: RegisterView
    },
    {
      path: '/account', 
      name: 'account', 
      component: AccountView
    }
  ]
})

export default router
