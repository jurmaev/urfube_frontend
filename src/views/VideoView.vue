<script>
import VideoPlayer from '../components/VideoPlayer.vue';
import { useFetch } from '../assets/fetch';
export default {
    name: 'VideoExample',
    components: {
        VideoPlayer
    },
    data() {
        return {
            videoOptions: {
                autoplay: true,
                controls: true,
                sources: [
                    {
                        src:
                            '',
                        type: 'video/mp4'
                    }
                ]
            }, videoReady: false
        };
    },
    async mounted() {
        const response = await useFetch('generate_link', { video_id: this.id });
        this.videoOptions.sources[0].src = response['result'];
        this.videoReady = true;
    },
    props: ['id', 'title', 'description', 'author']
}
</script>

<template>
    <div class="container p-3" v-if="videoReady">
        <VideoPlayer :options="videoOptions" />
    </div>
    <div v-else class="spinner-border">

    </div>
    <div class="container p-3">
        <div class="card p-3 bg-dark border-light">
            <h2 class="card-title">{{ title }}</h2>
            <p class="card-text">{{ description }}</p>
            <span>{{ author }}</span>
        </div>
    </div>
</template>
<style scoped>
.card{
    color: white;
}
</style>