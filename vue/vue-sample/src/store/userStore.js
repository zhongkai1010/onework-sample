import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            isLogin: false,
            username: '123'
        }
    },
    mutations: {
        setUserName(state, payload) {
            state.username = payload.username;
        }
    },
    actions: {
        login(context) {
            setTimeout(() => {
                context.commit('setUserName', { username: 'zhongkai' })

            }, 1000);

        }
    }
})