<script>
export default {
    data() {
        return {

        }
    },
    props: ['active'],
    methods: {
        closeSidebar(e) {
            const sidebar = document.querySelector('.sidenav');
            sidebar.classList.remove('active');
        }
    },
    mounted() {
        const links = document.querySelectorAll('.nav-link.text-white');
    }
}
</script>
<template>
    <div class="d-flex flex-column flex-shrink-0 text-bg-dark sidenav" :class="{ active: active }">
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <RouterLink @click="closeSidebar" class="nav-link text-white" :to="{ name: 'main' }">Home</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink @click="closeSidebar" class="nav-link text-white" :to="{ name: 'history' }">History</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink @click="closeSidebar" class="nav-link text-white" :to="{ name: 'liked_videos' }">Liked videos
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink @click="closeSidebar" class="nav-link text-white" :to="{ name: 'subscriptions' }">Subscriptions
                </RouterLink>
            </li>
        </ul>
    </div>
</template>
<style scoped>
.sidenav {
    height: 100%;
    width: 0;
    padding: 16px 0;
    position: fixed;
    z-index: 1031;
    top: 56px;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
}

.nav-item {
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out;
}

.nav-item:hover {
    background-color: grey;
}

.sidenav.active {
    width: 250px;
    padding: 16px;
}</style>