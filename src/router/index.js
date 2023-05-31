import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/user';
import MainView from '@/views/MainView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import AccountView from '@/views/AccountView.vue';
import VideoView from '@/views/VideoView.vue';
import HistoryView from '@/views/HistoryView.vue';
import LikedVideosView from '@/views/LikedVideosView.vue';
import SubscriptionsView from '@/views/SubscriptionsView.vue';


const router = createRouter({
  history: createWebHashHistory(),
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
