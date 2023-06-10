<script>
import useValidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { refreshTokens } from '../assets/fetch';
import { getAccessToken, getAccessTokenExpirationTime } from '../assets/tokens';
import { BACKEND_BASE_DOMAIN } from '../main';
export default {
    data() {
        return {
            v$: useValidate(),
            views: '',
            profile: null
        }
    },
    methods: {
        async uploadProfile() {
            this.v$.$validate();
            if (!this.v$.$error) {
                const imageUpload = this.profile;
                const formData = new FormData();
                formData.append('image_file', imageUpload, 'image_file');
                if (new Date() > new Date(getAccessTokenExpirationTime())) await refreshTokens();
                const response = await fetch(`${BACKEND_BASE_DOMAIN}/upload_profile_pic/`, {
                    method: 'POST',
                    body: formData,
                    headers: { 'User-Auth-Token': getAccessToken() }
                });
                if (!('error' in response)) {
                    location.reload();
                }
                else {
                    console.log(response['error'])
                }
            }
        },
        changeProfile() {
            const fileUpload = document.getElementById('profileFile');
            this.profile = fileUpload.files[0];
        }
    },
    validations() {
        return {
            profile: { required }
        }
    }
}
</script>
<template>
    <form>
        <div class="container-fluid p-3 shadow" data-bs-theme="dark" style="max-width: 800px;">
            <div v-for="(error, index) of v$.profile.$errors" :key="index">
                <div class="text-danger mb-2"><span>{{ error.$message }}</span></div>
            </div>
            <div class="input-group mb-2">
                <input type="file" class="form-control" aria-describedby="files" aria-label="Profile upload"
                    @change="changeProfile" id="profileFile" name="profile" accept=".jpg"
                    :class="{ 'is-invalid': v$.profile.$error }">
                <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04"
                    @click="uploadProfile">Upload</button>
            </div>
        </div>
    </form>
</template>