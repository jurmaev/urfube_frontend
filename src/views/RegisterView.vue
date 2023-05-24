<script>
import useValidate from '@vuelidate/core'
import { required, minLength, email, sameAs } from '@vuelidate/validators'
import { useFetch } from '../assets/fetch.js'
export default {
    data() {
        return {
            v$: useValidate(),
            username: '',
            // email: '',
            password: {
                password: '',
                confirm: ''
            },
            errorMessage: ''
        }
    },
    methods: {
        async sendFormData() {
            this.v$.$validate();
            if (!this.v$.$error) {
                const response = await useFetch('signup', {
                    'user': {
                        'username': this.username, 
                        'password': this.password.password
                    }
                });
                if ('error' in response) {
                    if (response.error.code === 1000)
                        this.errorMessage = response.error.message;
                    else
                        console.log(response.error);
                }
                else this.$router.push({ name: 'login' });
            }
        }
    },
    validations() {
        return {
            username: { required, minLength: minLength(3) },
            // email: { required, email },
            password: {
                password: { required, minLength: minLength(6) },
                confirm: { required, minLength: minLength(6), sameAs: sameAs(this.password.password) }
            }
        }
    }
}
</script>

<template>
    <div class="form-register mx-auto">
        <form>
            <div class="container-sm shadow p-5" data-bs-theme="dark">
                <div v-for="(error, index) of v$.username.$errors" :key="index">
                    <div class="text-danger mb-2"><span>{{ error.$message }}</span></div>
                </div>
                <div class="form-floating">
                    <input type="text" id="username" v-model.trim="username" class="form-control mb-2"
                        :class="{ 'is-invalid': v$.username.$error }" placeholder="username" />
                    <label for="username" class="mb-2">Username </label>
                </div>
                <!-- <div v-for="(error, index) of v$.email.$errors" :key="index">
                    <div class="text-danger mb-2"><span>{{ error.$message }}</span></div>
                </div>
                <div class="form-floating">
                    <input type="text" id="email" v-model.trim="email" class="form-control mb-2"
                        :class="{ 'is-invalid': v$.email.$error }" placeholder="email" />
                    <label for="email" class="mb-2">Email </label>
                </div> -->
                <div v-for="(error, index) of v$.password.password.$errors" :key="index">
                    <div class="text-danger mb-2"><span>{{ error.$message }}</span></div>
                </div>
                <div class="form-floating">
                    <input type="password" id="password" v-model.trim="password.password" class="form-control mb-2"
                        :class="{ 'is-invalid': v$.password.password.$error }" placeholder="password" />
                    <label for="password" class="mb-2">Password </label>
                </div>
                <div v-for="(error, index) of v$.password.confirm.$errors" :key="index">
                    <div class="text-danger mb-2"><span>{{ error.$message }}</span></div>
                </div>
                <div class="form-floating">
                    <input type="password" id="confirm-password" v-model.trim="password.confirm" class="form-control mb-3"
                        :class="{ 'is-invalid': v$.password.confirm.$error }" placeholder="password2" />
                    <label for="confirm-password" class="mb-2">Confirm password </label>
                </div>
                <div v-if="this.errorMessage" class="text-danger mb-2"><span>{{ this.errorMessage }}</span></div>
                <button @click.prevent="sendFormData" type="submit" class="btn btn-outline-info">Register</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
.form-register {
    max-width: 550px;
    padding: 15px;
}

label {
    color: #adb5bd;
}
</style>