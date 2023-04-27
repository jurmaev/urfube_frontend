<script>
export default {
    data() {
        return {

        }
    },
    props: ['active']
}
</script>
<template>
    <div class="d-flex flex-column flex-shrink-0 p3 text-bg-dark sidenav" :class="{active: active}">
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item"><RouterLink class="nav-link text-white" :to="{ name: 'main' }">Home</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link text-white" :to="{ name: 'history' }">History</RouterLink></li>
        </ul>
    </div>
</template>
<style scoped>
.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1031;
    top: 56px;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
}

.nav-item{
    transition: background-color 0.3s ease-in-out;
}

.nav-item:hover{
    background-color: grey;
}

.sidenav.active{
    width: 250px;
}
</style>