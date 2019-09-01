import request from '@/service/request.js';
const userLogins = {};

userLogins.getOpenIdAndToken = (params) => request({
    // url: `/app/user/getOpenIdAndToken`,
    url: `app/user/getLoginByGet`,
    method: 'GET',
    params: params,
    // headers: { 'Content-Type': 'multipart/form-data' },
});

userLogins.bindMobile = (props) => request({
    url: `/app/user/getZhuceByGet`,
    method: 'GET',
    params: props
})

userLogins.getMobileCode = (props) => request({
    url: `/app/user/getVCode`,
    method: 'GET',
    params: props,
    // headers: { 'Content-Type': 'multipart/form-data' },
})
export default userLogins;
