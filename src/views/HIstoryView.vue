<script>
import { useFetch } from '../assets/fetch.js';
import { RouterLink, RouterView } from 'vue-router';
export default {
    data() {
        return {
            history: null
        }
    },
    methods: {
        async getHistory() {
            const response = await useFetch('get_user_history', {}, true)
            this.history = response.result;
        }
    },
    mounted() {
        this.getHistory();
    }
}
</script>

<template>
    <div v-if="!history"></div>
    <div v-else class="container p-4">
        <div class="row row-cols-3 g-4">
            <div class="col" v-for="video in history" :key="video.id">
                <div class="card card__link bg-dark border-secondary">
                    <RouterLink :to="{
                            name: 'video', params: { id: video.video_id }, query: { timestamp: video.timestamp }
                        }">
                        <img :src="video.image_link" class="card-img-top">
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