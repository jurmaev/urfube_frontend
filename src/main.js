import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/user'
import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')

export const BACKEND_BASE_DOMAIN='https://urfubebackend-production.up.railway.app';