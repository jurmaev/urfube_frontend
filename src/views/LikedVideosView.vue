<script>
import { useFetch } from '../assets/fetch.js';
import { formatDate, formatViews } from '../assets/formatters.js';
import Spinner from '../components/Spinner.vue';
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
    }, components: { Spinner }
}
</script>

<template>
    <Spinner v-if="!liked_videos" />
    <div v-else class="container p-4">
        <div class="row row-cols-3 g-4">
            <div class="col" v-for="video in liked_videos" :key="video.id">
                <div class="card card__link bg-dark border-secondary">
                    <RouterLink :to="{
                        name: 'video', params: { id: video.video_id }, query: { timestamp: video.timestamp }
                    }">
                        <img :src="video.image_link" class="card-img-top">
                        <div class="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="25"
                            aria-valuemin="0" aria-valuemax="100" style="height: 3px">
                            <div class="progress-bar" :style="{ 'width': video.progress * 100 + '%' }"></div>
                        </div>
                        <div class="d-flex card-body">
                            <img :src="video.profile_link" class="profile__pic me-3">
                            <div>
                                <h5 class="card-title">{{ video.title }}</h5>
                                <RouterLink :to="{ name: 'account', params: { channel: video.author } }" class="card-text"
                                    style="margin-bottom: 0;">{{ video.author }}</RouterLink>
                                <p class="card-text">{{ formatViews(video.views) }} &#x2022;
                                    {{ formatDate(video.created) }}</p>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
a.card-text:hover {
    text-decoration: underline;
}

.card-img-top {
    height: 200px;
}

.card__link {
    width: 360px;
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

.profile__pic {
    width: 36px;
    height: 36px;
    border-radius: 50%;
}
</style>