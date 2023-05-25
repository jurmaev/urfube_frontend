<template>
    <video ref="videoPlayer" class="vjs-matrix video-js"></video>
</template>
<style scoped>
.vjs-matrix {
    width: 100%;
}
</style>
<script>
import videojs from 'video.js';
import { useFetch } from '../assets/fetch';
import { useUserStore } from '../store/user';

export default {
    name: 'VideoPlayer',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            }
        },
        video: {
            title: String,
            description: String,
            author: String,
            id: Number
        }
    },
    data() {
        return {
            player: null
        }
    },
    mounted() {
        const timestamp = this.$router.currentRoute.value.query.timestamp;
        this.player = videojs(this.$refs.videoPlayer, this.options, () => {
            this.player.log('onPlayerReady', this);
        });
        if (timestamp) this.player.currentTime(timestamp);
    },
    beforeUnmount() {
        if (this.player) {
            const store = useUserStore();
            if (store.username) {
                useFetch('add_or_update_history', {
                    'video': {
                        'video_id': this.video.id,
                        'timestamp': this.player.currentTime(),
                        'length': this.player.duration()
                    }
                }, true);
                useFetch('post_view', {
                    'video_id': this.video.id
                }, true);
            }
            this.player.dispose();
        }
    }
}
</script>