import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../store/user';
const MainView = () => import('../views/MainView.vue');
const LoginView = () => import('../views/LoginView.vue');
const RegisterView = () => import('../views/RegisterView.vue');
const AccountView = () => import('../views/AccountView.vue');
const VideoView = () => import('../views/VideoView.vue');
const HistoryView = () => import('../views/HistoryView.vue');
const LikedVideosView = () => import('../views/LikedVideosView.vue');
const SubscriptionsView = () => import('../views/SubscriptionsView.vue');

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
      path: '/:channel',
      name: 'account',
      component: AccountView,
      props: route => ({ channel: route.params.channel })
    },
    {
      path: '/video/:id',
      name: 'video',
      component: VideoView,
      props: route => ({ id: route.params.id })
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView,
      beforeEnter: (to, from) => {
        const store = useUserStore();
        if (!store.username) {
          router.push({ name: 'login' })
        }
      }
    },
    {
      path: '/liked_videos',
      name: 'liked_videos',
      component: LikedVideosView,
      beforeEnter: (to, from) => {
        const store = useUserStore();
        if (!store.username) {
          router.push({ name: 'login' })
        }
      }
    },
    ,
    {
      path: '/subscriptions',
      name: 'subscriptions',
      component: SubscriptionsView,
      beforeEnter: (to, from) => {
        const store = useUserStore();
        if (!store.username) {
          router.push({ name: 'login' })
        }
      }
    }
  ]
})

export default router
