<script>
import useValidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { useFetch } from '../assets/fetch';
import { saveTokens } from '../assets/tokens';
import { mapStores } from 'pinia';
import { useUserStore } from '../store/user';

export default {
    data() {
        return {
            v$: useValidate(),
            username: '',
            password: '',
            errorMessage: ''
        }
    },
    methods: {
        async sendFormData() {
            this.v$.$validate();
            console.log(this.username)
            if (!this.v$.$error) {
                const response = await useFetch('login', {
                    "user": {
                        "username": this.username,
                        "password": this.password
                    },
                    "scopes": []
                });
                if ('result' in response) {
                    saveTokens(response['result']['access_token'], response['result']['refresh_token']);
                    this.userStore.loginUser(this.username);
                    const next = this.$router.currentRoute.value.query['next'];
                    if (next) { this.$router.push({ name: next }) }
                    else { this.$router.push({ name: 'account', params: { channel: this.username } }); }
                }
                else {
                    if (response['error']['code'] === 1001)
                        this.errorMessage = response['error']['message'];
                    else
                        console.log(response['error']);
                }
            }

        }
    },
    validations() {
        return {
            username: { required, minLength: minLength(3) },
            password: { required },
        }
    },
    computed: {
        ...mapStores(useUserStore)
    }
}
</script>
<template>
    <div class="form-signin mx-auto">
        <form>
            <div class="container-sm shadow p-5" data-bs-theme="dark">
                <h1 class="h3 mb-3 fw-normal  text-center text-secondary">Please sign in</h1>
                <div v-for="(error, index) of v$.username.$errors" :key="index">
                    <div class="text-danger mb-2"><span>{{ error.$message }}</span></div>
                </div>
                <div class="form-floating">
                    <input type="text" id="username" v-model.trim="username" class="form-control  mb-2"
                        :class="{ 'is-invalid': v$.username.$error }" placeholder="username" />
                    <label for="username">Username</label>
                </div>
                <div class="form-floating">
                    <input type="password" id="password" v-model.trim="password" class="form-control  mb-2"
                        :class="{ 'is-invalid': v$.password.$error }" placeholder="password" />
                    <label for="password">Password</label>
                </div>
                <div v-for="(error, index) of v$.password.$errors" :key="index">
                    <div class="text-danger mb-2"><span>{{ error.$message }}</span></div>
                </div>
                <div v-if="this.errorMessage" class="text-danger mb-2"><span>{{ this.errorMessage }}</span></div>
                <button @click.prevent="sendFormData" type="submit" class="btn w-100 btn-lg btn-outline-info">Login</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.form-signin {
    max-width: 440px;
    padding: 15px;
}

label {
    color: #adb5bd;
}

/* .form-floating > label { z-index: 3; } */
</style>