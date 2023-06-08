<script>
import { RouterLink } from 'vue-router';
import { removeTokens } from '../assets/tokens';
import { mapStores } from 'pinia';
import { useUserStore } from '../store/user';
import Sidebar from './Sidebar.vue';

export default {
    data() {
        return {
            sidebar: false
        };
    },
    computed: {
        ...mapStores(useUserStore)
    },
    methods: {
        logout() {
            removeTokens();
            this.userStore.logoutUser();
            this.$router.push({ name: "main" });
        },
        toggleSidebar() {
            this.sidebar = !this.sidebar;
        }
    },
    components: { Sidebar }
}
</script>

<template>
    <header>
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <button class="sidebar__toggle" @click="toggleSidebar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="grey" class="bi bi-list me-2"
                        viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </button>
                <RouterLink class="navbar-brand" :to="{ name: 'main' }">Urfube</RouterLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <template v-if="userStore.username">
                        <li class="nav-item">
                            <RouterLink class="nav-link" :to="{ name: 'account', params: { channel: userStore.username } }">
                                {{ userStore.username }}</RouterLink>
                        </li>
                        <li @click="logout" class="nav-item">
                            <RouterLink class="nav-link" :to="{ name: 'main' }">Logout</RouterLink>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item">
                            <RouterLink class="nav-link" :to="{ name: 'login' }">Login</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" :to="{ name: 'register' }">Register</RouterLink>
                        </li>
                    </template>
                </ul>
            </div>
        </nav>
    </header>
    <Sidebar :active="sidebar" />
</template>
<style scoped>
.bi-list {
    transition: fill 0.3s ease-in-out;
}

.sidebar__toggle:hover .bi-list {
    fill: white;
}

.sidebar__toggle {
    background-color: transparent;
    border: none;
}
</style>