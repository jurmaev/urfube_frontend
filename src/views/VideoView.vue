<script>
export default {
    data() {
        return {

        }
    },
    props: ['title', 'description', 'author']
}
</script>

<template>
    <div class="container p-3">
        <div class="card p-3">
            <h2 class="card-title">{{ title }}</h2>
            <p class="card-text">{{ description }}</p>
            <span>{{ author }}</span>
        </div>
    </div>
</template>