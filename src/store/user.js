import { defineStore, createPinia } from 'pinia';
import { watch } from 'vue';
// console.log(localStorage.getItem('user'))
const username = localStorage.getItem('username');
const initialState = username ? username : null;
export const useUserStore = defineStore('user', {
    state: () => {
        return {
            username: initialState
        }
    },
    // getters: {
    //     isLogged: (state) => state.username === '',
    // },
    actions: {
        loginUser(username) {
            this.username = username;
            localStorage.setItem('username', this.username);
        },
        logoutUser() {
            this.username = null;
            localStorage.removeItem('username');
        }
    }
});
const store = createPinia();
export default store