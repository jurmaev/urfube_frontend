<script>
import { RouterLink } from 'vue-router';
import { removeTokens } from '../assets/tokens';
import { mapStores } from 'pinia';
import { useUserStore } from '../store/user';

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
    methods: {
        logout() {
            removeTokens();
            this.userStore.logoutUser();
            this.$router.push({ name: 'main' })
        }
    }
}
</script>

<template>
    <header>
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <RouterLink class="navbar-brand" :to="{ name: 'main' }">Urfube</RouterLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <form class="d-flex mx-auto">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <template v-if="userStore.username">
                        <li class="nav-item">
                            <RouterLink class="nav-link" :to="{ name: 'account'}">{{ userStore.username }}</RouterLink>
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
</template>