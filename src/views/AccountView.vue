<script>
import useValidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { useFetch, refreshTokens } from '../assets/fetch';
import { getAccessToken, getAccessTokenExpirationTime } from '../assets/tokens';
export default {
    data() {
        return {
            v$: useValidate(),
            title: '',
            description: '',
            video: null
        }
    },
    methods: {
        async sendFormData() {
            this.v$.$validate();
            if (!this.v$.$error) {
                const formData = new FormData();
                formData.append('file', this.video);
                if (new Date() > getAccessTokenExpirationTime()) refreshTokens();
                const response = await fetch('http://127.0.0.1:5000/upload_video/?' + new URLSearchParams({
                    video_title: this.title,
                    video_description: this.description,
                }), {
                    method: 'POST',
                    body: formData,
                    headers: { 'User-Auth-Token': getAccessToken() }
                });
                if ('result' in response) {
                    this.$router.push({ name: 'main' })
                }
                else {
                    console.log(response['error'])
                }
            }
        },
        setFile() {
            const fileUpload = document.getElementById('file');
            this.video = fileUpload.files[0];
        }
    },
    validations() {
        return {
            title: { required, minLength: minLength(3) },
            description: { required },
            video: {}
        }
    },
}
</script>
<template>
    <div class="container-fluid p-3">
        <h1 class="mb-3 text-center">Upload video</h1>
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
                    <input type="file" class="form-control" aria-describedby="files" aria-label="Upload" id="file"
                        name="file" accept=".mp4" @change="setFile" :class="{ 'is-invalid': v$.video.$error }">
                    <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04"
                        @click="sendFormData">Upload</button>
                </div>
            </div>
        </form>
    </div>
</template>
<style scoped>
.container-fluid {
    max-width: 800px;
}
</style>