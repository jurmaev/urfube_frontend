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
            file: null
        }
    },
    methods: {
        async sendFormData() {
            this.v$.$validate();
            if (!this.v$.$error) {
                // console.log(this.file)
                // const response = await useFetch('upload_video', {
                //     'video': {
                //         'title': this.title,
                //         'description': this.description
                //     }
                // }, { 'User-Auth-Token': getAccessToken() })
                if ('result' in response) {
                    this.$router.push({ name: 'account' })
                }
                else {
                    console.log(response['error'])
                }
            }
        },
        setFile() {
            const fileUpload = document.getElementById('file');
            console.log(fileUpload.files[0].type)
        }
    },
    validations() {
        return {
            title: { required, minLength: minLength(3) },
            description: { required }
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
                <input type="file" id="file" name="file" accept=".mp4" @change="setFile">
                <button @click.prevent="sendFormData" type="submit" class="btn btn-outline-info">Upload video</button>
            </div>

        </form>
    </div>
</template>