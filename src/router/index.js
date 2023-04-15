import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../store/user';
const MainView = () => import('../views/MainView.vue');
const LoginView = () => import('../views/LoginView.vue');
const RegisterView = () => import('../views/RegisterView.vue');
const AccountView = () => import('../views/AccountView.vue');
const VideoView = () => import('../views/VideoView.vue');

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
      component: LoginView,
      beforeEnter: (to, from) => {
        const store = useUserStore();
        if (store.username) {
          router.push({ name: from.name })
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      beforeEnter: (to, from) => {
        const store = useUserStore();
        if (store.username) {
          router.push({ name: from.name })
        }
      }
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      beforeEnter: (to, from) => {
        const store = useUserStore();
        if (!store.username) {
          router.push({ name: 'login' })
        }
      }
    },
    {
      path: '/video/:id',
      name: 'video',
      component: VideoView,
      props: route => ({ id: route.params.id, title: route.query.title, description: route.query.description, author: route.query.author })
    }
  ]
})

export default router
