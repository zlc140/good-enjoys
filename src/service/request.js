import axios from 'axios';
import Vue from 'vue';
import { Toast } from 'vant';
import configs from './conf';

Vue.use(Toast);
// 创建axios实例
const service = axios.create({
    // baseURL: 'http://mxynb.natapp1.cc',
    baseURL: configs.API_SRC,
    timeout: 5000, // 请求超时时间
    // withCredentials: true, // default
});


// request拦截器
service.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        // Do something with request error
        Promise.reject(error);
    });
// response 拦截器
service.interceptors.response.use(
    (response) => {
        /**
         *  code业务逻辑可以自定义
         */
        console.log(response)
        const res = response.data;
        if (res.success) {
            return res;
        } else {
            Toast.fail(res.message);
            return res;
        }
    },
    (error) => {
        console.log(error)
        Toast.fail(error.message);
        return Promise.reject(error);
    });

export default service;
