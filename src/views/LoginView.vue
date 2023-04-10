<script>
import useValidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { useFetch } from '../assets/fetch';
import { saveTokens } from '../assets/tokens'

export default {
    data() {
        return {
            v$: useValidate(),
            username: '',
            password: ''
        }
    },
    methods: {
        async sendFormData() {
            this.v$.$validate();
            if (!this.v$.$error) {
                const response = await useFetch('login', {
                    "user": {
                        "username": this.username,
                        "password": this.password
                    },
                    "scopes": []
                })
                if ('result' in response) {
                    saveTokens(response['result']['access_token'], response['result']['refresh_token']);
                    this.$emit('getUsername', this.username)
                    this.$router.push({ name: 'account' })
                }
                else {
                    console.log(response['error'])
                }
            }

        }
    },
    validations() {
        return {
            username: { required, minLength: minLength(3) },
            password: { required }
        }
    },
    emits: ['getUsername']
}
</script>
<template>
    <form>
        <div class="container-sm shadow p-5">
            <label for="username" class="mb-2">Username </label>
            <div v-for="(error, index) of v$.username.$errors" :key="index">
                <div class="text-danger mb-2"><span>{{ error.$message }}</span></div>
            </div>
            <input type="text" id="username" v-model.trim="username" class="form-control mb-2"
                :class="{ 'is-invalid': v$.username.$error }" />
            <label for="password" class="mb-2">Password </label>
            <div v-for="(error, index) of v$.password.$errors" :key="index">
                <div class="text-danger mb-2"><span>{{ error.$message }}</span></div>
            </div>
            <input type="password" id="password" v-model.trim="password" class="form-control mb-2"
                :class="{ 'is-invalid': v$.password.$error }" />
            <button @click.prevent="sendFormData" type="submit" class="btn btn-outline-info">Login</button>
        </div>

    </form>
</template>