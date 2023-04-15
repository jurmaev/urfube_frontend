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
                autoplay: false,
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
        console.log(this.videoOptions.sources)
        this.videoReady = true;
    },
    props: ['id', 'title', 'description', 'author']
}
</script>

<template>
    <div class="container p-3" data-bs-theme="dark">
        <VideoPlayer v-if="videoReady" :options="videoOptions" />
        <h2 class="text-body">{{ title }}</h2>
        <p class="text-body">{{ author }}</p>
        <div class="p-2 border rounded">
            <p class="text-body">{{ description }}</p>
        </div>
    </div>
</template>
<style scoped>
.card {
    color: white;
}
</style>