import { defineStore, createPinia } from 'pinia';
import { watch } from 'vue';
const username = localStorage.getItem('username');
const initialState = username ? username : null;
export const useUserStore = defineStore('user', {
    state: () => {
        return {
            username: initialState
        }
    },
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