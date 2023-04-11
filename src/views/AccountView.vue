<script>
import useValidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { useFetch } from '../assets/fetch';
import { getAccessToken } from '../assets/tokens';
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
                const response = await fetch('http://127.0.0.1:5000/upload_video/?' + new URLSearchParams({
                    video_title: this.title,
                    video_description: this.description,
                }), {
                    method: 'POST',
                    body: formData,
                    headers: { 'User-Auth-Token': getAccessToken() }
                });
                console.log(response);
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
    <div class="container-fluid">
        <h1>Upload video</h1>
        <form>
            <div class="container-sm shadow p-5">
                <label for="title" class="mb-2">Title </label>
                <div v-for="(error, index) of v$.title.$errors" :key="index">
                    <div class="text-danger mb-2"><span>{{ error.$message }}</span></div>
                </div>
                <input type="text" id="title" v-model.trim="title" class="form-control mb-2"
                    :class="{ 'is-invalid': v$.title.$error }" />
                <label for="description" class="mb-2">Description </label>
                <div v-for="(error, index) of v$.description.$errors" :key="index">
                    <div class="text-danger mb-2"><span>{{ error.$message }}</span></div>
                </div>
                <textarea type="textarea" id="description" v-model.trim="description" class="form-control mb-2"
                    :class="{ 'is-invalid': v$.description.$error }"></textarea>
                <label for="file">Select a file:</label>
                <div v-for="(error, index) of v$.video.$errors" :key="index">
                    <div class="text-danger mb-2"><span>{{ error.$message }}</span></div>
                </div>
                <input class="form-control mb-2" type="file" id="file" name="file" accept=".mp4" @change="setFile"
                    :class="{ 'is-invalid': v$.video.$error }">
                <button @click="sendFormData" type="submit" class="btn btn-outline-info">Upload video</button>
            </div>

        </form>
    </div>
</template>