<script>
import { useFetch } from '../assets/fetch.js';
import { formatDate, formatViews } from '../assets/formatters.js';
import Videos from '../components/Videos.vue';
export default {
    data() {
        return {
            videos: null
        }
    },
    methods: {
        async getSubscriptions() {
            const response = await useFetch('get_subscription_videos', {}, true)
            this.videos = response.result;
        }, formatDate, formatViews
    },
    mounted() {
        this.getSubscriptions();
    }, components: { Videos }
}
</script>

<template>
    <Videos :videos="this.videos" />
</template>