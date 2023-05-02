<script>
import { useFetch } from '../assets/fetch.js';


export default {
    data() {
        return { liked_videos: null }
    },
    async mounted() {
        const liked_videos = await useFetch('get_liked_videos', {}, true);
        this.liked_videos = liked_videos.result;
        console.log(liked_videos.result)
    }
}
</script>

<template>
    <div v-if="!liked_videos"></div>
    <div v-else class="container p-4">
        <div class="row row-cols-3 g-4">
            <div class="col" v-for="video in liked_videos" :key="video.id">
                <div class="card card__link bg-dark border-secondary">
                    <RouterLink :to="{
                            name: 'video', params: { id: video.video_id }, query: { timestamp: video.timestamp }
                        }">
                        <div class="card-body">
                            <h5 class="card-title">{{ video.title }}</h5>
                            <p class="card-text">{{ video.author }}</p>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.card__link {
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    color: white;
}

.card__link:hover {
    box-shadow: 0 5px 15px rgba(3, 102, 214, 0.3);
}

a {
    color: inherit;
    text-decoration: none;
}
</style>