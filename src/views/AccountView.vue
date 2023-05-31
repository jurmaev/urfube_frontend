<script>
import VideoUpload from '../components/VideoUpload.vue';
import UpdateProfile from '../components/UpdateProfile.vue';
import { formatDate, formatViews } from '../assets/formatters.js';
import { useFetch } from '../assets/fetch';
import Spinner from '../components/Spinner.vue';
import { mapStores } from 'pinia';
import { useUserStore } from '../store/user';

export default {
    components: {
        VideoUpload, UpdateProfile, Spinner
    },
    data() {
        return {
            view: 'videos',
            subscribers: 0,
            videosCount: 0,
            profileImage: '',
            videos: null,
            subscribed: false
        }
    },
    methods: {
        changeView(e) {
            this.view = e.target.id;
            e.target.classList.add('active');
        }, formatViews, formatDate,
        async toggleSubscription() {
            if (this.subscribed) {
                const response = await useFetch('unsubscribe', { channel: this.channel }, true);
                if ('result' in response)
                    this.subscribed = false;
                else
                    console.log(response);
            } else {
                const response = await useFetch('subscribe', { channel: this.channel }, true);
                if ('result' in response)
                    this.subscribed = true;
                else
                    console.log(response);
            }
        }
    },
    props: ['channel'],
    async mounted() {
        document.title = this.channel;
        const response = await useFetch('get_channel_info', { channel: this.channel });
        if ('result' in response) {
            this.subscribers = response.result.subscribers;
            this.videosCount = response.result.videos;
            this.profileImage = response.result.profile_link;
        } else {
            console.log(response);
        }
        const subscriptionResponse = await useFetch('is_subscribed', { channel: this.channel }, true);
        this.subscribed = subscriptionResponse.result;
        const videoResponse = await useFetch('get_channel_videos', { channel: this.channel });
        if ('result' in videoResponse) this.videos = videoResponse.result;
        else console.log(videoResponse);
    },
    computed: {
        ...mapStores(useUserStore)
    }, beforeUnmount() {
        document.title = 'Urfube';
    }
}
</script>
<template>
    <Spinner v-if="!videos" />
    <div v-else>
        <div class="d-flex container-fluid p-4" style="max-width: 800px;">
            <img :src="this.profileImage" class="profile__pic me-3">
            <div class="d-flex justify-content-between w-100">
                <div>
                    <h1 class="text-secondary">{{ this.channel }}</h1>
                    <p class="text-secondary">{{ formatViews(this.subscribers).replace('view', 'subscriber') }}</p>
                    <p class="text-secondary">{{ formatViews(this.videosCount).replace('view', 'video') }}</p>
                </div>
                <button v-if="!this.subscribed" class="btn btn-light rounded-pill align-self-start"
                    @click="toggleSubscription">Subscribe</button>
                <button v-else class="btn btn-secondary rounded-pill align-self-start"
                    @click="toggleSubscription">Unsubscribe</button>
            </div>

        </div>
        <ul v-if="channel === userStore.username" class="nav nav-underline justify-content-center" data-bs-theme="dark">
            <li class="nav-item">
                <a class="nav-link text-secondary" :class="view === 'videos' ? 'active' : ''" @click.prevent="changeView" href=""
                    id="videos">Videos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-secondary" :class="view === 'upload' ? 'active' : ''" @click.prevent="changeView" href=""
                    id="upload">Upload Video</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-secondary" :class="view === 'update' ? 'active' : ''" @click.prevent="changeView" href=""
                    id="update">Update profile picture</a>
            </li>
        </ul>
        <VideoUpload v-if="view === 'upload'" />
        <UpdateProfile v-else-if="view === 'update'" />
        <div v-else-if="view === 'videos' || channel !== userStore.username" class="container p-4">
            <div class="row row-cols-3 g-4">
                <div class="col" v-for="video in videos" :key="video.id">
                    <div class="card card__link bg-dark border-secondary">
                        <RouterLink :to="{
                            name: 'video', params: { id: video.id }
                        }">
                            <img :src="video.image_link" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">{{ video.title }}</h5>
                                <RouterLink :to="{ name: 'account', params: { channel: video.author } }" class="card-text"
                                    style="margin-bottom: 0;">{{ video.author }}</RouterLink>
                                <p class="card-text">{{ formatViews(video.views) }} &#x2022;
                                    {{ formatDate(video.created) }}</p>
                            </div>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.profile__pic {
    width: 128px;
    height: 128px;
    border-radius: 50%;
}

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
</style>