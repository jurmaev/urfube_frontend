<script>
import { useFetch } from '../assets/fetch.js';
import { formatDate, formatViews } from '../assets/formatters.js';
import Videos from '../components/Videos.vue';
export default {
    data() {
        return { liked_videos: null }
    },
    async mounted() {
        const liked_videos = await useFetch('get_liked_videos', {}, true);
        this.liked_videos = liked_videos.result;
        console.log(liked_videos.result)
    },
    methods: {
        formatDate, formatViews
    }, components: { Videos }
}
</script>

<template>
    <Videos :videos="this.liked_videos" />
</template>