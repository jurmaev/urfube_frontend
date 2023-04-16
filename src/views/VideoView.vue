<script>
import VideoPlayer from '../components/VideoPlayer.vue';
import { useFetch } from '../assets/fetch';
import { getAccessToken } from '../assets/tokens';
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
            }, videoReady: false,
            comments: [],
            comment: '',
            video: {
                title: '',
                description: '',
                id: null,
                author: '',
                user_id: null
            }
        };
    },
    async mounted() {
        const infoResponse = await useFetch('get_video_info', { video_id: this.id });
        this.video = infoResponse['result'];
        const linkResponse = await useFetch('generate_link', { video_id: this.id });
        this.videoOptions.sources[0].src = linkResponse['result'];
        this.videoReady = true;
        const commentResponse = await useFetch('get_comments', { video_id: this.id });
        this.comments = commentResponse['result'];

    },
    props: ['id'],
    methods: {
        cancelComment() {
            this.comment = '';
        },
        async publishComment() {
            const response = await useFetch('add_comment', {
                'comment': {
                    'content': this.comment,
                    'video_id': this.id
                }
            }, { 'User-Auth-Token': getAccessToken() });
            if ('result' in response)
                this.$router.push({ name: 'video', params: { id: this.id }, query: this.$router.query });
            else
                console.log(response);
        }
    }
}
</script>

<template>
    <div class='container p-3' data-bs-theme='dark'>
        <VideoPlayer v-if='videoReady' :options='videoOptions' />
        <h2 class='text-body'>{{ this.video.title }}</h2>
        <p class='text-body'>{{ this.video.author }}</p>
        <div class='p-2 border rounded bg-secondary mb-2'>
            <p class='text-light m-0'>{{ this.video.description }}</p>
        </div>
        <div v-if='comments'>
            <p class='text-body'>{{ this.comments.length }} Comments</p>
            <div>
                <textarea v-model='comment' class='form-control mb-2 text-body' placeholder='Add comment...'></textarea>
                <div class='mb-2'>
                    <button class='btn btn-danger me-2' @click='cancelComment'>Cancel</button>
                    <button class='btn btn-dark' @click='publishComment'>Comment</button>
                </div>
            </div>
            <div class='border rounded p-2 mb-2' v-for='comment in comments' :key='comment.id'>
                <p class='text-body'>{{ comment.author }}</p>
                <p class='text-body m-0'>{{ comment.content }}</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.card {
    color: white;
}
</style>