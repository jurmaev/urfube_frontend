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
        async getVideos() {
            const response = await useFetch('get_videos', {})
            this.videos = response.result;
        }, formatDate, formatViews
    },
    mounted() {
        this.getVideos();
    },
    components: {
        Videos
    }
}
</script>
<template>
    <Videos :videos="this.videos" />
</template>