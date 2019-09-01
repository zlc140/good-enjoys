import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLogin: false,
        userInfo: undefined
    },
    getters: {
        loginState: (state) => {
            return state.isLogin
        }
    },
    mutations: {
// 设置用户全部信息
        setUserInfo: (state, userInfo) => {
            state.isLogin = true;
            localStorage.setItem('__user_userInfo', JSON.stringify(userInfo));
            state.userInfo = userInfo;
        },
        loginOut: (state) => {
            state.userInfo = undefined;
            state.isLogin = false;
            localStorage.removeItem('__user_token');
            localStorage.removeItem('__user_userInfo');
            localStorage.removeItem('__sys__wx__openId__');
        }
    },
    actions: {

    },
});
