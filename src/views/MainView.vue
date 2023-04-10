<script>
import { useFetch } from '../assets/fetch.js'
export default {
    data() {
        return {
            videos: null
        }
    },
    methods: {
        async getVideos() {
            const response = await useFetch('get_videos', {})
            this.videos = response['result'];
        }
    },
    mounted() {
        this.getVideos();
    }
}
</script>
<template>
    <div v-if="!videos"></div>
    <div v-else class="container p-4" v-for="video in videos" :key="video['key']">
        <div class="card col">
            <a href="">
                <!-- <img src="" class="card-img-top" alt="..."> -->
                <div class="card-body">
                    <h5 class="card-title">{{ video['title'] }}</h5>
                    <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                        content.</p> -->
                    <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                    <p class="card-text">{{ video['author'] }}</p>
                </div>
            </a>

        </div>
    </div>
</template>

<style>
.card {
    cursor: pointer;
    transition: all 0.5s ease-in-out;
}

.card:hover {
    background-color: grey;
}

a{
    color: inherit;
    text-decoration: none;
}
</style>