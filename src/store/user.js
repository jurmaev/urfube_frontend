import { defineStore, createPinia } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => { return { username: null } },
    actions: {
        loginUser(username) {
            this.username = username;
        },
        logoutUser() {
            this.username = null;
        }
    }
});
const store = createPinia();
export default store