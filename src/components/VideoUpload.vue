<script>
import useValidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { refreshTokens } from '../assets/fetch';
import { getAccessToken, getAccessTokenExpirationTime } from '../assets/tokens';
import { BACKEND_BASE_DOMAIN } from '../main';
export default {
    data() {
        return {
            v$: useValidate(),
            title: '',
            description: '',
            video: null,
            image: null
        }
    },
    methods: {
        async uploadVideo() {
            this.v$.$validate();
            if (!this.v$.$error) {
                const videoUpload = this.video;
                const imageUpload = this.image;
                const formData = new FormData();
                formData.append('video_file', videoUpload, 'video_file');
                formData.append('image_file', imageUpload, 'image_file');
                const request = new XMLHttpRequest();
                const progress = document.querySelector('.progress');
                const progressBar = document.querySelector('.progress-bar');
                progress.style.display = 'flex';

                request.upload.addEventListener('progress', function (e) {
                    if (e.loaded <= e.total) {
                        var percent = Math.round(e.loaded / e.total * 100);
                        progressBar.style.width = percent + '%';
                    }

                    if (e.loaded == e.total) {
                        progressBar.style.width = '100%';
                        location.reload();
                    }
                });

                request.onreadystatechange = function () {
                    console.log(request.responseText)
                }

                request.open('post', `${BACKEND_BASE_DOMAIN}/upload_video/?` + new URLSearchParams({
                    video_title: this.title,
                    video_description: this.description,
                }));
                const accessTokenExpirationTime = Date.parse(getAccessTokenExpirationTime());
                if (new Date() > accessTokenExpirationTime)
                    await refreshTokens();
                request.setRequestHeader('User-Auth-Token', getAccessToken())
                request.send(formData);
            }
        },
        changeVideo() {
            const fileUpload = document.getElementById('videoFile');
            this.video = fileUpload.files[0];
        }
        ,
        changeImage() {
            const fileUpload = document.getElementById('imageFile');
            this.image = fileUpload.files[0];
        }
    },
    validations() {
        return {
            title: { required, minLength: minLength(3) },
            description: { required },
            video: { required },
            image: { required }
        }
    },
}
</script>
<template>
    <div class="container-fluid p-3">
        <form>
            <div class="shadow" data-bs-theme="dark">
                <div v-for="(error, index) of v$.title.$errors" :key="index">
                    <div class="text-danger mb-2"><span>{{ error.$message }}</span></div>
                </div>
                <div class="form-floating">
                    <input type="text" id="title" v-model.trim="title" class="form-control mb-2 "
                        :class="{ 'is-invalid': v$.title.$error }" placeholder="title" />
                    <label for="title" class="mb-2 ">Title</label>
                </div>
                <div v-for="(error, index) of v$.description.$errors" :key="index">
                    <div class="text-danger mb-2"><span>{{ error.$message }}</span></div>
                </div>
                <div class="form-floating">
                    <textarea type="textarea" id="description" v-model.trim="description" class="form-control mb-2 "
                        :class="{ 'is-invalid': v$.description.$error }" placeholder="description"></textarea>
                    <label for="description" class="mb-2 ">Description </label>
                </div>
                <div v-for="(error, index) of v$.video.$errors" :key="index">
                    <div class="text-danger mb-2"><span>{{ error.$message }}</span></div>
                </div>
                <div class="input-group mb-2">
                    <input type="file" class="form-control" aria-describedby="files" aria-label="Video upload"
                        @change="changeVideo" id="videoFile" name="videoFile" accept=".mp4"
                        :class="{ 'is-invalid': v$.video.$error }">
                    <input type="file" class="form-control" aria-describedby="files" aria-label="Image upload"
                        @change="changeImage" id="imageFile" name="imageFile" accept=".jpg"
                        :class="{ 'is-invalid': v$.image.$error }">
                    <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04"
                        @click="uploadVideo">Upload</button>
                </div>
            </div>
        </form>
        <div class="progress" role="progressbar" style="display: none;">
            <div class="progress-bar progress-bar-striped progress-bar-animated"></div>
        </div>
    </div>
</template>
<style scoped>
.container-fluid {
    max-width: 800px;
}

label {
    color: #adb5bd;
}
</style>