<script>
import VideoPlayer from '../components/VideoPlayer.vue';
import { useFetch } from '../assets/fetch';
import { getAccessToken } from '../assets/tokens';
import { mapStores } from 'pinia';
import { useUserStore } from '../store/user';
import { formatDate, formatExactDate } from '../assets/formatters.js';
import Spinner from '../components/Spinner.vue';

export default {
    name: 'VideoView',
    components: {
        VideoPlayer, Spinner
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
            },
            likes: 0,
            liked: false,
            subscribed: false,
            subscribers: 0,
            isReady: false
        };
    },
    async mounted() {
        const infoResponse = await useFetch('get_video_info', { video_id: this.id });
        this.video = infoResponse.result;
        const linkResponse = await useFetch('generate_video_link', { video_id: this.id });
        this.videoOptions.sources[0].src = linkResponse.result;
        this.videoReady = true;
        const commentResponse = await useFetch('get_comments', { video_id: this.id });
        this.comments = commentResponse.result;
        const likesResponse = await useFetch('get_likes', { video_id: this.id });
        this.likes = likesResponse.result;
        const likedResponse = await useFetch('get_like', { video_id: this.id }, true);
        this.liked = likedResponse.result;
        const subscriptionResponse = await useFetch('is_subscribed', { channel: this.video.author }, true);
        this.subscribed = subscriptionResponse.result;
        const subscribersResponse = await useFetch('get_subscribers', { channel: this.video.author }, true);
        this.subscribers = subscribersResponse.result;
        document.title = this.video.title;
        this.isReady = true;
    },
    props: ['id', 'timestamp'],
    methods: {
        cancelComment() {
            this.comment = '';
        },
        async publishComment() {
            if (this.comment === '') return;
            const response = await useFetch('add_comment', {
                'comment': {
                    'content': this.comment,
                    'video_id': this.id
                }
            }, true);
            if ('result' in response)
                this.$router.go();
            else
                console.log(response);
        },
        async toggleLike() {
            if (!this.liked) {
                const response = await useFetch('post_like', { video_id: this.id }, true);
                if ('result' in response) {
                    this.liked = true;
                    this.likes++;
                }
                else console.log(response);
            } else {
                const response = await useFetch('remove_like', { video_id: this.id }, true);
                if ('result' in response) {
                    this.liked = false;
                    this.likes--;
                }
                else console.log(response);
            }
        },
        async deleteComment(event) {
            const commentId = event.target.id;
            const response = await useFetch('delete_comment', { comment_id: commentId }, true);
            if ('result' in response) this.$router.go();
            else console.log(response);
        },
        editComment(event) {
            const commentId = event.target.id;
            const content = document.querySelector(`p#content${commentId}`);
            content.style.display = 'none';
            const editComment = document.querySelector(`div#edit${commentId}`);
            editComment.style.display = 'block';
            const commentText = document.querySelector(`#text${commentId}`);
            commentText.innerHTML = content.innerHTML;
        },
        cancelEdit(event) {
            const commentId = event.target.id;
            const content = document.querySelector(`p#content${commentId}`);
            content.style.display = 'block';
            const editComment = document.querySelector(`div#edit${commentId}`);
            editComment.style.display = 'none';
        },
        async sendEdit(event) {
            const commentId = event.target.id;
            const commentText = document.querySelector(`#text${commentId}`);
            console.log(commentText.value)
            const response = await useFetch('edit_comment', {
                'comment_id': commentId,
                'new_content': commentText.value
            }, true);
            const content = document.querySelector(`p#content${commentId}`);
            if ('result' in response)
                content.innerHTML = commentText.value;
            else
                console.log(response);
            content.style.display = 'block';
            const editComment = document.querySelector(`div#edit${commentId}`);
            editComment.style.display = 'none';
        },
        async toggleSubscription() {
            if (this.subscribed) {
                const response = await useFetch('unsubscribe', { channel: this.video.author }, true);
                if ('result' in response)
                    this.subscribed = false;
                else
                    console.log(response);
            } else {
                const response = await useFetch('subscribe', { channel: this.video.author }, true);
                if ('result' in response)
                    this.subscribed = true;
                else
                    console.log(response);
            }
        }, formatDate, formatExactDate
    },
    computed: {
        ...mapStores(useUserStore)
    }, beforeUnmount() { document.title = 'Urfube'; }
}
</script>

<template>
    <Spinner v-if="!isReady" />
    <div v-else class='container p-3' data-bs-theme='dark'>
        <VideoPlayer v-if='videoReady' :options='videoOptions'
            :video="{ title: this.video.title, description: this.video.description, author: this.video.author, id: this.video.id }"
            :timestamp="this.timestamp" />
        <h2 class='text-body'>{{ this.video.title }}</h2>
        <div class="d-flex flex-row align-items-center mb-2">
            <div class="d-flex align-items-center me-auto">
                <div class="me-4">
                    <RouterLink v-if="this.video.user_id" class="text-body"
                        :to="{ name: 'account', params: { channel: this.video.author } }">{{
                            this.video.author }}</RouterLink>
                    <p class='text-body m-0' style="font-size: .7rem;">{{ this.subscribers }} {{ this.subscribers % 10 != 1
                        ? 'subscribers' :
                        'subscriber' }}</p>
                </div>
                <button v-if="!this.subscribed" class="btn btn-light rounded-pill"
                    @click="toggleSubscription">Subscribe</button>
                <button v-else class="btn btn-secondary rounded-pill" @click="toggleSubscription">Unsubscribe</button>
            </div>
            <button id="likeBtn" @click="toggleLike"
                class="btn d-flex flex-row align-items-center rounded-pill btn__like"><svg
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-hand-thumbs-up me-1" viewBox="0 0 16 16">
                    <path v-if="!this.liked"
                        d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                    <path v-else
                        d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                </svg>{{ this.likes }}</button>
        </div>
        <div class='p-2 border rounded bg-secondary mb-2'>
            <p class="text-light m-0">{{ this.video.views }} {{ this.video.views % 10 != 1 ? 'views' : 'view' }} {{
                formatExactDate(this.video.created) }}</p>
            <p class='text-light m-0'>{{ this.video.description }}</p>
        </div>
        <div v-if='comments'>
            <p class='text-body'>{{ this.comments.length }} {{ this.comments.length % 10 === 1 && this.comments.length !==
                11 ? 'Comment' : 'Comments' }}</p>
            <div>
                <textarea v-model='comment' class='form-control mb-2 text-body' placeholder='Add comment...'></textarea>
                <div class='mb-2'>
                    <button class='btn btn-danger me-2' @click='cancelComment'>Cancel</button>
                    <button class='btn btn-dark' @click='publishComment'>Comment</button>
                </div>
            </div>
            <div id="comment" class='border rounded p-2 mb-2' v-for='comment in comments' :key='comment.id'
                style="position: relative;">
                <div class="d-flex">
                    <img :src="comment.profile_link" class="profile__pic me-3">
                    <div>
                        <p class='text-body'>{{ comment.author }} <span class="comment__date text-secondary">{{
                            formatDate(comment.created) }}</span></p>
                        <p class='text-body m-0' :id="'content' + comment.id">{{ comment.content }}</p>
                    </div>
                </div>
                <div style="display: none;" :id="'edit' + comment.id">
                    <textarea class='form-control mb-2 text-body' placeholder='Add comment...'
                        :id="'text' + comment.id"></textarea>
                    <div class='mb-2'>
                        <button class='btn btn-danger me-2' @click='cancelEdit' :id="comment.id">Cancel</button>
                        <button class='btn btn-dark' @click='sendEdit' :id="comment.id">Edit</button>
                    </div>
                </div>
                <div class="dropdown">
                    <button v-if="userStore.username == comment.author" class="options__btn rounded-circle dropdown-toggle"
                        type="button" data-bs-toggle="dropdown" aria-expanded="false"><svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path
                                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg></button>
                    <ul class="dropdown-menu">
                        <li><button @click="editComment" class="dropdown-item" href="#" :id="comment.id">Edit</button></li>
                        <li><button @click="deleteComment" class="dropdown-item" href="#" :id="comment.id">Delete</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.card {
    color: white;
}

.btn__like {
    background-color: #2e2e2e;
    color: white;
}

.btn__like:hover {
    color: white;
    background-color: #3e3e3e;
}

.options__btn {
    display: none;
    background-color: transparent;
    border: none;
}

#comment:hover .options__btn {
    display: inline-block;
}

.dropdown {
    position: absolute;
    right: 10px;
    top: 10px;
}

.dropdown-toggle::after {
    display: none;
}

a.text-body {
    text-decoration: none;
    transition: color 0.5s ease-in-out;
}

a.text-body:hover {
    color: white !important;
}

.comment__date {
    font-size: .8rem;
}

.profile__pic {
    width: 36px;
    height: 36px;
    border-radius: 50%;
}
</style>